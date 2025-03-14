'use server'

import { Exception } from '@/shared/api'
import { STORAGE_PATH } from '@/shared/config'
import { extractExtension } from '@/shared/lib'

import { createServerSupabaseClient } from '../lib'
import { DroppedImageFile } from '../model'

export interface UploadImagesParams {
  files: File[]
}

export const uploadImages = async ({
  files,
}: UploadImagesParams): Promise<{ data: { id: string; path: string } | null }[]> => {
  const client = await createServerSupabaseClient()

  const databaseQueries = files.flatMap((file) => {
    return client
      .from('minibox')
      .upsert({ name: file.name })
      .select()
      .then((result) => result.data?.[0] ?? null)
  })
  const targetFiles = await Promise.all(databaseQueries)

  const storageQueries = targetFiles.map((data) => {
    if (!data) {
      return { data: null }
    }

    // NOTE - 경로에 한글 및 기타 특수문자 포함 시 에러 발생
    const extension = extractExtension(data.name)
    const path = `/${data.id}.${extension}`
    const file = files.find((file) => file.name === data.name)!

    return client.storage
      .from(process.env.SUPABASE_BUCKET_NAME!)
      .upload(path, file, { upsert: false })
  })

  return await Promise.all(storageQueries)
}

export interface GetImagesParams {
  query?: string
}

export const getImages = async ({ query = '' }: GetImagesParams): Promise<DroppedImageFile[]> => {
  const client = await createServerSupabaseClient()
  const imagesDataAll = await client.from('minibox').select('*')
  const storageAll = await client.storage.from(process.env.SUPABASE_BUCKET_NAME!).list()

  if (imagesDataAll.error || storageAll.error) {
    throw new Exception('이미지 조회에 실패했어요')
  }

  const targetData = new Set(
    imagesDataAll.data
      .filter(({ name }) => name.normalize('NFC').includes(query))
      .map(({ id, name }) => `${id}.${extractExtension(name)}`),
  )

  return storageAll.data
    .filter((file) => file.name !== '.emptyFolderPlaceholder')
    .filter((file) => targetData.has(file.name))
    .map((file) => {
      const target = imagesDataAll.data.find(({ id }) => file.name.startsWith(id))!

      return {
        id: target.id,
        name: target.name,
        createdAt: target.created_at,
        updatedAt: target.updated_at,
        path: `${STORAGE_PATH}/${file.name}`,
        size: file.metadata.size,
        lastModified: file.metadata.lastModified,
      }
    })
}

// NOTE - 이미지 파일 인터페이스 예시
// {
//   name: 'ZKmyFzZwm6jkWk00F7--S.jpeg',
//   id: '8b932e64-6d27-48b2-80c1-0820ec1653a8',
//   updated_at: '2025-03-13T10:35:26.353Z',
//   created_at: '2025-03-13T10:35:26.353Z',
//   last_accessed_at: '2025-03-13T10:35:26.353Z',
//   metadata: {
//     eTag: '"e5519f99e27319ce220bc45b1696bc96"',
//     size: 272674,
//     mimetype: 'image/jpeg',
//     cacheControl: 'max-age=3600',
//     lastModified: '2025-03-13T10:35:27.000Z',
//     contentLength: 272674,
//     httpStatusCode: 200
//   }
// }

export type UpdateImageParams = Pick<DroppedImageFile, 'id' | 'name'>

export const updateImage = async ({ id, name }: UpdateImageParams) => {
  const client = await createServerSupabaseClient()
  const prev = await client.from('minibox').select('*').eq('id', id).single()

  if (!prev.data || prev.error) {
    throw new Exception('요청하신 이미지를 찾을 수 없어요')
  }

  const prevImage = prev.data
  const isNameChanged = prevImage.name !== name

  if (!isNameChanged) {
    return
  }

  const prevExtension = extractExtension(prevImage.name)
  const isInvalidName = name.trim().endsWith(`.${prevExtension}`)

  if (!isInvalidName) {
    throw new Exception('유효하지 않은 이미지 이름이에요')
  }

  const { error } = await client
    .from('minibox')
    .update({
      name: name.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Exception('이미지 변경사항 저장에 실패했어요')
  }
}

export type DeleteImageParams = Pick<DroppedImageFile, 'id'>

export const deleteImage = async ({ id }: DeleteImageParams) => {
  const client = await createServerSupabaseClient()

  const databaseResponse = await client.from('minibox').select('*').eq('id', id).single()

  if (!databaseResponse.data || databaseResponse.error) {
    throw new Exception('요청하신 이미지를 찾을 수 없어요')
  }

  const { id: targetId, name } = databaseResponse.data
  const extension = extractExtension(name)
  const targetPath = `${targetId}.${extension}`

  const storageDeleteResponse = await client.storage
    .from(process.env.SUPABASE_BUCKET_NAME!)
    .remove([targetPath])

  if (storageDeleteResponse.error) {
    throw new Exception('이미지 삭제에 실패했어요')
  }

  const dataDeleteResponse = await client.from('minibox').delete().eq('id', id)

  if (dataDeleteResponse.error) {
    throw new Exception('이미지 삭제에 실패했어요')
  }
}
