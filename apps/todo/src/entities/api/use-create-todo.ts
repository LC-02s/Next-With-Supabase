'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { createTodo, CreateTodoParams } from './actions'
import { todoQueryKeys } from './query-keys'

export interface UseCreateTodoParams extends CreateTodoParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useCreateTodo = ({
  title,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseCreateTodoParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: todoQueryKeys.create({ title }),
    mutationFn: () =>
      createTodo({ title }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all })
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
