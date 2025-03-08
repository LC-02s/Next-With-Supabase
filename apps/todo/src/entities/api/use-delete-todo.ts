'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { Todo } from '../model'

import { deleteTodo, DeleteTodoParams } from './actions'
import { todoQueryKeys } from './query-keys'

export interface UseDeleteTodoParams extends DeleteTodoParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useDeleteTodo = ({
  id,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseDeleteTodoParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: todoQueryKeys.delete({ id }),
    mutationFn: () =>
      deleteTodo({ id }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: () => {
      onMutate?.()
      try {
        queryClient.setQueriesData<Todo[]>({ queryKey: todoQueryKeys.all }, (prev) => {
          return prev?.filter((todo) => todo.id !== id)
        })

        return { status: true }
      } catch {
        return { status: false }
      }
    },
    onSuccess: (_, __, context) => {
      if (!context?.status) {
        queryClient.invalidateQueries({ queryKey: todoQueryKeys.all })
      }

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
