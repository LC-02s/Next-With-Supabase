import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { createProfile, CreateProfileParams } from './profile.action'
import { profileQueryKeys } from './query-keys'

export interface UseCreateProfileParams extends Pick<CreateProfileParams, 'userId'> {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useCreateProfile = ({
  userId,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseCreateProfileParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: profileQueryKeys.all,
    mutationFn: (params: Pick<CreateProfileParams, 'displayId' | 'name' | 'imageFile'>) =>
      createProfile({ userId, ...params }).catch((error) => {
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
