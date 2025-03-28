'use server'

import { createServerSupabaseClient, Exception } from '@/shared/api'

import { UserProfile } from '../model'

export interface SearchProfilesParams {
  keyword?: string
  cursor?: number | null
  size?: number
}

export const searchProfiles = async ({
  keyword = '',
  cursor = null,
  size = 12,
}: SearchProfilesParams): Promise<{
  data: Omit<UserProfile, 'userId'>[]
  nextCursor: number | null
  first: boolean
  last: boolean
}> => {
  const client = await createServerSupabaseClient()
  const first = !cursor

  let query = client.from('profile').select('*').order('id', { ascending: true })

  if (keyword) {
    query = query.ilike(keyword.startsWith('@') ? 'display_id' : 'name', `%${keyword}%`)
  }

  if (!first) {
    query = query.gt('id', cursor)
  }

  const { data, error } = await query.limit(size + 1)

  if (error) {
    return { data: [], nextCursor: null, first, last: true }
  }

  const hasNextPage = data.length > size
  const nextCursor = hasNextPage ? (data[size - 1]?.id ?? null) : null

  return {
    data: data
      .map((profile) => ({
        id: profile.id,
        displayId: profile.display_id,
        name: profile.name,
        imageURL: profile.image_url,
      }))
      .slice(0, size),
    nextCursor,
    first,
    last: !hasNextPage,
  }
}

export type GetUserProfileParams = Pick<UserProfile, 'userId'>

export const getUserProfile = async ({
  userId,
}: GetUserProfileParams): Promise<UserProfile | null> => {
  const client = await createServerSupabaseClient()
  const { data, error } = await client.from('profile').select('*').eq('user_id', userId).single()

  if (error?.code === 'PGRST116') {
    return null
  }

  if (error) {
    throw new Exception('프로필 조회에 실패했어요')
  }

  if (!data) {
    return null
  }

  return {
    id: data.id,
    userId: data.user_id,
    displayId: data.display_id,
    name: data.name,
    imageURL: data.image_url,
  }
}

export interface CreateProfileParams extends Pick<UserProfile, 'userId' | 'displayId' | 'name'> {
  imageFile: File
}

export const createProfile = async ({
  userId,
  displayId,
  name,
  imageFile,
}: CreateProfileParams) => {
  const client = await createServerSupabaseClient()
  const imagePath = `${userId}.${imageFile.type.split('/')[1]}`

  const storageResponse = await client.storage
    .from(process.env.SUPABASE_BUCKET_NAME!)
    .upload(imagePath, imageFile, { upsert: true })

  if (storageResponse.error) {
    throw new Exception('프로필 생성에 실패했어요')
  }

  const queryResponse = await client.from('profile').insert({
    display_id: `@${displayId.trim()}`,
    name: name.trim(),
    image_url: `/images/${process.env.SUPABASE_BUCKET_NAME!}/${imagePath}`,
  })

  if (queryResponse.error?.code === '23505') {
    throw new Exception('중복되는 아이디에요')
  }

  if (queryResponse.error) {
    throw new Exception('프로필 생성에 실패했어요')
  }
}

export type UpdateProfileParams = Pick<UserProfile, 'userId'> &
  Partial<Pick<UserProfile, 'displayId' | 'name'>>

export const updateProfile = async ({ userId, displayId, name }: UpdateProfileParams) => {
  const client = await createServerSupabaseClient()
  const { error } = await client
    .from('profile')
    .update({
      display_id: displayId?.trim(),
      name: name?.trim(),
    })
    .eq('user_id', userId)

  if (error) {
    throw new Exception('프로필 업데이트에 실패했어요')
  }
}

export type DeleteProfileParams = Pick<UserProfile, 'userId'>

export const deleteProfile = async ({ userId }: DeleteProfileParams) => {
  const client = await createServerSupabaseClient()
  const { error } = await client.from('profile').delete().eq('user_id', userId)

  if (error) {
    throw new Exception('프로필 삭제에 실패했어요')
  }
}
