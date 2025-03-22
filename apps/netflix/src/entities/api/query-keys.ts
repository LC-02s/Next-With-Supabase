import { UseMovieQueryParams } from './use-movie-query'
import { UseSearchMoviesParams } from './use-search-movies'

export const movieQueryKeys = {
  all: ['movies'] as const,
  listAll: () => [...movieQueryKeys.all, 'search-movies'] as const,
  list: ({ keyword, like }: UseSearchMoviesParams) => [
    ...movieQueryKeys.listAll(),
    { keyword, like },
  ],
  detailAll: () => [...movieQueryKeys.all, 'movie-detail'] as const,
  detail: (params: UseMovieQueryParams) => [...movieQueryKeys.detailAll(), params],
} as const
