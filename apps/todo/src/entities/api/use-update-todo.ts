'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { Todo } from '../model'

import { updateTodo, UpdateTodoParams } from './actions'
import { todoQueryKeys } from './query-keys'

export interface UseUpdateTodoParams extends UpdateTodoParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useUpdateTodo = ({
  id,
  title,
  completed,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseUpdateTodoParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: todoQueryKeys.update({ id, title, completed }),
    mutationFn: () =>
      updateTodo({ id, title, completed }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: () => {
      onMutate?.()
      try {
        queryClient.setQueriesData<Todo[]>({ queryKey: todoQueryKeys.all }, (prev) => {
          return prev?.map((todo) => {
            if (todo.id === id) {
              const isCompletedChanged = todo.completed !== completed
              const updatedAt = new Date().toISOString()

              return {
                ...todo,
                title,
                completed,
                updatedAt,
                completedAt: isCompletedChanged ? (completed ? updatedAt : null) : todo.completedAt,
              }
            }

            return todo
          })
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
