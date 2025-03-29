'use server'

import { UserProfile } from '@/entities/profile/@x/following'
import { createServerSupabaseClient, Exception } from '@/shared/api'

export interface GetFollowingListParams {
  userId: string
  cursor?: number | null
  size?: number
}

export const getFollowingList = async ({
  userId,
  cursor = null,
  size = 20,
}: GetFollowingListParams): Promise<{
  data: UserProfile[]
  nextCursor: number | null
  first: boolean
  last: boolean
}> => {
  const client = await createServerSupabaseClient()
  const first = !cursor

  let query = client
    .from('following')
    .select('*')
    .eq('follower', userId)
    .is('is_banned', false)
    .order('id', { ascending: true })

  if (!first) {
    query = query.gt('id', cursor)
  }

  const followingQuery = await query.limit(size + 1)

  if (followingQuery.error) {
    return { data: [], nextCursor: null, first, last: true }
  }

  const hasNextPage = followingQuery.data.length > size
  const nextCursor = hasNextPage ? (followingQuery.data[size - 1]?.id ?? null) : null

  const profileQuery = await client
    .from('profile')
    .select('*')
    .in(
      'user_id',
      followingQuery.data.slice(0, size).map((item) => item.following),
    )

  if (profileQuery.error) {
    return { data: [], nextCursor: null, first, last: true }
  }

  return {
    data: profileQuery.data.map((profile) => ({
      id: profile.id,
      userId: profile.user_id,
      displayId: profile.display_id,
      name: profile.name,
      imageURL: profile.image_url,
    })),
    nextCursor,
    first,
    last: !hasNextPage,
  }
}

export interface GetFollowerListParams {
  userId: string
  cursor?: number | null
  size?: number
}

export const getFollowerList = async ({
  userId,
  cursor = null,
  size = 20,
}: GetFollowerListParams): Promise<{
  data: UserProfile[]
  nextCursor: number | null
  first: boolean
  last: boolean
}> => {
  const client = await createServerSupabaseClient()
  const first = !cursor

  let query = client
    .from('following')
    .select('*')
    .eq('following', userId)
    .is('is_banned', false)
    .order('id', { ascending: true })

  if (!first) {
    query = query.gt('id', cursor)
  }

  const followerQuery = await query.limit(size + 1)

  if (followerQuery.error) {
    return { data: [], nextCursor: null, first, last: true }
  }

  const hasNextPage = followerQuery.data.length > size
  const nextCursor = hasNextPage ? (followerQuery.data[size - 1]?.id ?? null) : null

  const profileQuery = await client
    .from('profile')
    .select('*')
    .in(
      'user_id',
      followerQuery.data.slice(0, size).map((item) => item.follower),
    )

  if (profileQuery.error) {
    return { data: [], nextCursor: null, first, last: true }
  }

  return {
    data: profileQuery.data.map((profile) => ({
      id: profile.id,
      userId: profile.user_id,
      displayId: profile.display_id,
      name: profile.name,
      imageURL: profile.image_url,
    })),
    nextCursor,
    first,
    last: !hasNextPage,
  }
}

export interface FollowUserParams {
  following: string
}

export const followUser = async ({ following }: FollowUserParams): Promise<void> => {
  const client = await createServerSupabaseClient()

  const { error } = await client.from('following').insert({
    following,
  })

  if (error) {
    throw new Exception('팔로우에 실패했어요')
  }
}

export interface UnfollowUserParams {
  userId: string
  following: string
}

export const unfollowUser = async ({ userId, following }: UnfollowUserParams): Promise<void> => {
  const client = await createServerSupabaseClient()

  const { error } = await client
    .from('following')
    .delete()
    .eq('follower', userId)
    .eq('following', following)
    .is('is_banned', false)

  if (error) {
    throw new Exception('팔로우 취소에 실패했어요')
  }
}

export interface IsFollowingParams {
  userId: string
  following: string
}

export const isFollowing = async ({ userId, following }: IsFollowingParams): Promise<boolean> => {
  const client = await createServerSupabaseClient()

  const { data, error } = await client
    .from('following')
    .select('*')
    .eq('follower', userId)
    .eq('following', following)
    .single()

  if (error?.code === 'PGRST116') {
    return false
  }

  if (error) {
    throw new Exception('팔로우 여부 조회에 실패했어요')
  }

  return !!data
}

export interface GetFollowingCountParams {
  userId: string
}

export const getFollowingCount = async ({ userId }: GetFollowingCountParams): Promise<number> => {
  const client = await createServerSupabaseClient()

  const { data, error } = await client
    .from('following')
    .select('*')
    .eq('follower', userId)
    .is('is_banned', false)

  if (error || !data) {
    throw new Exception('팔로우 수 조회에 실패했어요')
  }

  return data.length
}

export interface GetFollowerCountParams {
  userId: string
}

export const getFollowerCount = async ({ userId }: GetFollowerCountParams): Promise<number> => {
  const client = await createServerSupabaseClient()

  const { data, error } = await client
    .from('following')
    .select('*')
    .eq('following', userId)
    .is('is_banned', false)

  if (error || !data) {
    throw new Exception('팔로워 수 조회에 실패했어요')
  }

  return data.length
}
