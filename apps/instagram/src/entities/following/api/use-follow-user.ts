'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { followUser } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseFollowUserParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useFollowUser = ({
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseFollowUserParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: followingQueryKeys.all,
    mutationFn: async (...params: Parameters<typeof followUser>) =>
      followUser(...params).catch((error) => {
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
