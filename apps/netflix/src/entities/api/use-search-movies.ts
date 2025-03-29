import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import { searchMovies, SearchMoviesParams } from './actions'
import { movieQueryKeys } from './query-keys'

export type UseSearchMoviesParams = Omit<SearchMoviesParams, 'cursor' | 'size'>

export const useSearchMoviesInfiniteQuery = ({ keyword, like }: UseSearchMoviesParams) =>
  useInfiniteQuery({
    queryKey: movieQueryKeys.list({ keyword, like }),
    queryFn: ({ pageParam }) => searchMovies({ keyword, cursor: pageParam, like }),
    select: ({ pages }) => pages.flatMap((response) => response.data),
    initialPageParam: null as number | null,
    getNextPageParam: ({ nextCursor }) => nextCursor,
  })

export const useResetSearchMoviesInfiniteQuery = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: movieQueryKeys.listAll() })
  }
}
