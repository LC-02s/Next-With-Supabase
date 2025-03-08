'use server'

import { Exception } from '@/shared/api'

import { createServerSupabaseClient } from '../lib'
import { Todo } from '../model'

export interface GetTodoListParams {
  query?: string
}

export interface GetTodoList {
  (params: GetTodoListParams): Promise<Todo[]>
}

export const getTodoList: GetTodoList = async ({ query = '' }) => {
  const client = await createServerSupabaseClient()
  const { data, error } = await client
    .from('todo')
    .select('*')
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Exception('요청하신 할 일을 불러오는데 실패했어요')
  }

  return data.map<Todo>((raw) => ({
    id: raw.id,
    title: raw.title,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    completed: raw.completed,
    completedAt: raw.completed_at,
  }))
}

export type CreateTodoParams = Pick<Todo, 'title'>

export interface CreateTodo {
  (params: CreateTodoParams): Promise<void>
}

export const createTodo: CreateTodo = async ({ title }) => {
  const client = await createServerSupabaseClient()
  const { error } = await client.from('todo').insert({ title }).single()

  if (error) {
    throw new Exception('요청하신 할 일 생성에 실패했어요')
  }
}

export type UpdateTodoParams = Pick<Todo, 'id' | 'title' | 'completed'>

export interface UpdateTodo {
  (params: UpdateTodoParams): Promise<void>
}

export const updateTodo: UpdateTodo = async ({ id, title, completed }) => {
  const client = await createServerSupabaseClient()
  const prev = await client.from('todo').select('*').eq('id', id).single()

  if (!prev.data || prev.error) {
    throw new Exception('요청하신 할 일을 찾을 수 없어요')
  }

  const prevTodo = prev.data
  const isTitleChanged = prevTodo.title !== title
  const isCompletedChanged = prevTodo.completed !== completed

  if (!isTitleChanged && !isCompletedChanged) {
    return
  }

  const { error } = await client
    .from('todo')
    .update({
      title,
      completed,
      updated_at: new Date().toISOString(),
      completed_at: isCompletedChanged
        ? completed
          ? new Date().toISOString()
          : null
        : prevTodo.completed_at,
    })
    .eq('id', id)

  if (error) {
    throw new Exception('할 일 변경사항 저장에 실패했어요')
  }
}

export type DeleteTodoParams = Pick<Todo, 'id'>

export interface DeleteTodo {
  (params: DeleteTodoParams): Promise<void>
}

export const deleteTodo: DeleteTodo = async ({ id }) => {
  const client = await createServerSupabaseClient()
  const { error } = await client.from('todo').delete().eq('id', id)

  if (error) {
    throw new Exception('요청하신 할 일 삭제에 실패했어요')
  }
}
