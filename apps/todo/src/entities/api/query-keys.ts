import { CreateTodoParams, DeleteTodoParams, GetTodoListParams, UpdateTodoParams } from './actions'

export const todoQueryKeys = {
  all: ['todo-all'] as const,
  list: (params: GetTodoListParams) => [...todoQueryKeys.all, 'todo-list', params] as const,
  create: (params: CreateTodoParams) => [...todoQueryKeys.all, 'create-todo', params] as const,
  update: (params: UpdateTodoParams) => [...todoQueryKeys.all, 'update-todo', params] as const,
  delete: (params: DeleteTodoParams) => [...todoQueryKeys.all, 'delete-todo', params] as const,
} as const
