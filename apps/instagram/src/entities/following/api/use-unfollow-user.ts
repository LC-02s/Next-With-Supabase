'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { unfollowUser, UnfollowUserParams } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseUnfollowUserParams extends UnfollowUserParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useUnfollowUser = ({
  userId,
  following,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseUnfollowUserParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: followingQueryKeys.all,
    mutationFn: async () =>
      unfollowUser({ userId, following }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followingQueryKeys.all })
      onSuccess?.()
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: followingQueryKeys.all })
      console.error(error)

      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}
