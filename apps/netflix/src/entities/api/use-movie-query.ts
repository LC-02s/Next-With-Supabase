'use client'

import { useQuery } from '@tanstack/react-query'

import { getMovie, GetMovieParams } from './actions'
import { movieQueryKeys } from './query-keys'

export type UseMovieQueryParams = GetMovieParams

export const useMovieQuery = ({ id }: UseMovieQueryParams) =>
  useQuery({
    queryKey: movieQueryKeys.detail({ id }),
    queryFn: () => getMovie({ id }),
  })
