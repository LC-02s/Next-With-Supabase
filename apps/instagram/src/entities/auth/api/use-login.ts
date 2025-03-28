'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createBrowserSupabaseClient, Exception } from '@/shared/api'

import { authQueryKeys } from './query-keys'

export interface LoginWithEmailParams {
  email: string
  password: string
}

export interface UseLoginParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useLogin = ({ onMutate, onSuccess, onException, onError }: UseLoginParams) => {
  const [client] = useState(() => createBrowserSupabaseClient())
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: authQueryKeys.all,
    mutationFn: async ({ email, password }: LoginWithEmailParams) => {
      const { error } = await client.auth.signInWithPassword({ email, password })

      if (error) {
        throw new Exception('이메일 또는 비밀번호를 확인해 주세요')
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
