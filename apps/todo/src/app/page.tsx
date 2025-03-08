import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { TodoList, CreateTodoInput } from '@/widgets/ui'
import { getTodoList, todoQueryKeys } from '@/entities/api'
import { Exception } from '@/shared/api'

interface MainPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const MainPage: React.FC<MainPageProps> = async ({ searchParams }) => {
  const { q = '' } = await searchParams
  const validQuery = Array.isArray(q) ? (q[q.length - 1] ?? '') : q

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: todoQueryKeys.list({ query: validQuery }),
    queryFn: () =>
      getTodoList({ query: validQuery }).catch((error) => {
        throw new Exception(error.message)
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateTodoInput />
      <TodoList query={validQuery} />
    </HydrationBoundary>
  )
}

export default MainPage
