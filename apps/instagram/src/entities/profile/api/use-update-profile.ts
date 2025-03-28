import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { updateProfile, UpdateProfileParams } from './profile.action'
import { profileQueryKeys } from './query-keys'

export interface UseUpdateProfileParams extends Pick<UpdateProfileParams, 'userId'> {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useUpdateProfile = ({
  userId,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseUpdateProfileParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: profileQueryKeys.all,
    mutationFn: (params: Pick<UpdateProfileParams, 'displayId' | 'name'>) =>
      updateProfile({ userId, ...params }).catch((error) => {
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
