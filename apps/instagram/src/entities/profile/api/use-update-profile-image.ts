import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { updateProfileImage, UpdateProfileImageParams } from './profile.action'
import { profileQueryKeys } from './query-keys'

export interface UseUpdateProfileImageParams extends Pick<UpdateProfileImageParams, 'userId'> {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useUpdateProfileImage = ({
  userId,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseUpdateProfileImageParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: profileQueryKeys.all,
    mutationFn: (params: Pick<UpdateProfileImageParams, 'imageFile'>) =>
      updateProfileImage({ userId, ...params }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.profile({ userId }) })
      onSuccess?.()
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.profile({ userId }) })
      console.error(error)

      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}
