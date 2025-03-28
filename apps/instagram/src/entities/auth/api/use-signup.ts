'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createBrowserSupabaseClient, Exception } from '@/shared/api'
import { PATH } from '@/shared/config'
import { createSearchParamsToURL } from '@/shared/lib'

import { authQueryKeys } from './query-keys'

export interface SignUpWithEmailParams {
  email: string
  password: string
}

export interface UseSignUpParams {
  origin: string
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useSignUp = ({
  origin,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseSignUpParams) => {
  const [client] = useState(() => createBrowserSupabaseClient())
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: authQueryKeys.all,
    mutationFn: async ({ email, password }: SignUpWithEmailParams) => {
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}${PATH.REGISTER_CALLBACK}`,
        },
      })

      if (error) {
        throw new Exception('회원가입에 실패했어요')
      }

      if (Object.keys(data.user?.user_metadata || {}).length <= 0) {
        await client.auth.signInWithPassword({
          email,
          password,
        })

        window.location.replace(createSearchParamsToURL('/')(['status', 'already-register']))
      }
    },
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })

      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}

export const useResendConfirmationEmail = ({
  origin,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseSignUpParams) => {
  const [client] = useState(() => createBrowserSupabaseClient())
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: authQueryKeys.all,
    mutationFn: async ({ email }: Pick<SignUpWithEmailParams, 'email'>) => {
      const { error } = await client.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${origin}${PATH.REGISTER_CALLBACK}`,
        },
      })

      if (error) {
        throw new Exception('메일 재발송에 실패했어요')
      }
    },
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })

      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}
