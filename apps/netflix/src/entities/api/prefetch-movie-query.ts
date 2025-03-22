import { QueryClient } from '@tanstack/react-query'

import { getMovie, GetMovieParams } from './actions'
import { movieQueryKeys } from './query-keys'

export const prefetchMovieQuery = async ({ id }: GetMovieParams) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: movieQueryKeys.detail({ id }),
    queryFn: () => getMovie({ id }),
  })

  return queryClient
}
