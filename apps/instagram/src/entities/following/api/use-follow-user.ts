'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { followUser, FollowUserParams } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseFollowUserParams extends FollowUserParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useFollowUser = ({
  following,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseFollowUserParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: followingQueryKeys.all,
    mutationFn: async () =>
      followUser({ following }).catch((error) => {
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
