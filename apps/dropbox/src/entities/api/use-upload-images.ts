'use client'

import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Exception } from '@/shared/api'

import { uploadImages, UploadImagesParams } from './actions'
import { dropboxQueryKeys } from './query-keys'

export interface UseUploadImagesParams extends UploadImagesParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useUploadImages = ({
  files,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseUploadImagesParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: dropboxQueryKeys.upload(),
    mutationFn: () => uploadImages({ files }),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: (response) => {
      response.forEach(({ data }) => {
        if (!data) toast.error('중복된 이미지는 제외되었어요')
      })

      queryClient.invalidateQueries({ queryKey: dropboxQueryKeys.all })
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

export const useIsUploadPending = () =>
  useIsMutating({ mutationKey: dropboxQueryKeys.upload() }) > 0
