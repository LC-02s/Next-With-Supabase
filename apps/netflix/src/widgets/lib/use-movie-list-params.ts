'use client'

import { useSearchParams } from 'next/navigation'

export const MOVIE_LIST_PARAMS = {
  KEYWORD: 'q',
  LIKE: 'like',
} as const

export const useMovieListParams = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get(MOVIE_LIST_PARAMS.KEYWORD) || ''
  const like = searchParams.get(MOVIE_LIST_PARAMS.LIKE) === 'true'

  return { keyword, like }
}
