'use client'

import { Loader, Title } from '@mantine/core'
import { useTodoListQuery } from '@/entities/api'

import { SearchTodoInput } from './search-todo-input'
import { TodoItem } from './todo-item'

export interface TodoListProps {
  query?: string
}

export const TodoList: React.FC<TodoListProps> = ({ query = '' }) => {
  const { data, isLoading } = useTodoListQuery({ query })
  const hasTodoData = data && data.length > 0
  const hasQuery = !!query

  return (
    <div>
      <Title order={1} size={20} mb="lg" className="break-keep">
        {isLoading
          ? !hasQuery
            ? '할 일을 불러오고 있어요...'
            : '요청하신 할 일을 찾고 있어요...'
          : !hasQuery
            ? hasTodoData
              ? '앞으로 해야 할 일 목록이에요'
              : '해야 할 일을 만들어볼까요?'
            : hasTodoData
              ? `"${query}"에 대한 검색 결과에요`
              : '검색 결과가 없어요'}
      </Title>
      {isLoading ? (
        <div className="flex min-h-40 flex-col items-center justify-center">
          <Loader color="gray" />
        </div>
      ) : (
        <>
          {(hasTodoData || hasQuery) && <SearchTodoInput className="mb-4" defaultQuery={query} />}
          {hasTodoData ? (
            <ol className="space-y-3">
              {data
                .filter((todo) => !todo.completed)
                .map((todo) => (
                  <li key={todo.id}>
                    <TodoItem {...todo} />
                  </li>
                ))}
              {data
                .filter((todo) => todo.completed)
                .map((todo) => (
                  <li key={todo.id}>
                    <TodoItem {...todo} />
                  </li>
                ))}
            </ol>
          ) : (
            <div className="flex min-h-40 flex-col items-center justify-center rounded-xl bg-gray-50 p-4 dark:bg-dark-600">
              <p className="break-keep font-medium">
                {!query ? '해야 할 일이 없어요 ㅠ' : '검색어가 올바른지 확인해볼까요?'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
