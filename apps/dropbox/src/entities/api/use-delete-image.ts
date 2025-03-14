'use client'

import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { DroppedImageFile } from '../model'

import { deleteImage, DeleteImageParams } from './actions'
import { dropboxQueryKeys } from './query-keys'

export interface UseDeleteImageParams extends DeleteImageParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useDeleteImage = ({
  id,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseDeleteImageParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: dropboxQueryKeys.delete(),
    mutationFn: () =>
      deleteImage({ id }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: () => {
      onMutate?.()
      try {
        queryClient.setQueriesData<DroppedImageFile[]>(
          { queryKey: dropboxQueryKeys.all },
          (prev) => {
            return prev?.filter((image) => image.id !== id)
          },
        )

        return { status: true }
      } catch {
        return { status: false }
      }
    },
    onSuccess: (_, __, context) => {
      if (!context?.status) {
        queryClient.invalidateQueries({ queryKey: dropboxQueryKeys.all })
      }

      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}

export const useIsDeletePending = () =>
  useIsMutating({ mutationKey: dropboxQueryKeys.delete() }) > 0
