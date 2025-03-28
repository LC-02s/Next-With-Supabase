'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createBrowserSupabaseClient, Exception } from '@/shared/api'

import { authQueryKeys } from './query-keys'

export interface UseLogoutParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useLogout = ({ onMutate, onSuccess, onException, onError }: UseLogoutParams) => {
  const [client] = useState(() => createBrowserSupabaseClient())
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: authQueryKeys.all,
    mutationFn: async () => {
      const { error } = await client.auth.signOut()

      if (error) {
        throw new Exception('로그아웃에 실패했어요')
      }
    },
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })
      onSuccess?.()
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })
      console.error(error)

      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}
