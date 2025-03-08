'use client'

import { useQuery } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { getTodoList, GetTodoListParams } from './actions'
import { todoQueryKeys } from './query-keys'

export const useTodoListQuery = ({ query }: GetTodoListParams) =>
  useQuery({
    queryKey: todoQueryKeys.list({ query }),
    queryFn: () =>
      getTodoList({ query }).catch((error) => {
        throw new Exception(error.message)
      }),
  })
