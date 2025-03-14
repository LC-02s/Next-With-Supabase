'use client'

import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { DroppedImageFile } from '../model'

import { updateImage, UpdateImageParams } from './actions'
import { dropboxQueryKeys } from './query-keys'

export interface UseUpdateImageParams extends UpdateImageParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useUpdateImage = ({
  id,
  name,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseUpdateImageParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: dropboxQueryKeys.update(),
    mutationFn: () =>
      updateImage({ id, name }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: () => {
      onMutate?.()
      try {
        queryClient.setQueriesData<DroppedImageFile[]>(
          { queryKey: dropboxQueryKeys.all },
          (prev) => {
            return prev?.map((image) => {
              if (image.id === id) {
                return {
                  ...image,
                  name,
                  updatedAt: new Date().toISOString(),
                }
              }

              return image
            })
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

export const useIsUpdatePending = () =>
  useIsMutating({ mutationKey: dropboxQueryKeys.update() }) > 0
