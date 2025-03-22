'use server'

import { Exception } from '@/shared/api'

import { createServerSupabaseClient } from '../lib'
import { Movie } from '../model'

export interface SearchMoviesParams {
  keyword?: string
  cursor?: number | null
  size?: number
  like?: boolean
}

export interface SearchMovies {
  (params: SearchMoviesParams): Promise<{
    data: Movie[]
    nextCursor: number | null
    first: boolean
    last: boolean
  }>
}

export const searchMovies: SearchMovies = async ({
  cursor = null,
  keyword = '',
  like = false,
  size = 12,
}: SearchMoviesParams) => {
  const client = await createServerSupabaseClient()
  const first = !cursor

  let query = client.from('movie').select('*').order('id', { ascending: true })

  if (keyword) {
    query = query.ilike('title', `%${keyword}%`)
  }

  if (like === true) {
    query = query.eq('is_like', true)
  }

  if (cursor) {
    query = query.gt('id', cursor)
  }

  const { data, error } = await query.limit(size + 1)

  if (error) {
    console.log(error)
    return { data: [], nextCursor: null, first, last: true, error }
  }

  const hasNextPage = data.length > size
  const nextCursor = hasNextPage ? (data[size - 1]?.id ?? null) : null

  return {
    data: (
      data?.map((movie) => ({
        id: movie.id,
        title: movie.title,
        imageURL: movie.image_url,
        overview: movie.overview,
        popularity: movie.popularity,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        isLike: movie.is_like,
      })) ?? []
    ).slice(0, size),
    nextCursor,
    first,
    last: !hasNextPage,
  }
}

export type GetMovieParams = Pick<Movie, 'id'>

export interface GetMovie {
  (params: GetMovieParams): Promise<Movie>
}

export const getMovie: GetMovie = async ({ id }) => {
  const client = await createServerSupabaseClient()

  const { data, error } = await client.from('movie').select('*').eq('id', id).maybeSingle()

  if (error || !data) {
    throw new Exception('요청하신 영화 조회에 실패했어요')
  }

  return {
    id: data.id,
    title: data.title,
    imageURL: data.image_url,
    overview: data.overview,
    popularity: data.popularity,
    releaseDate: data.release_date,
    voteAverage: data.vote_average,
    isLike: data.is_like,
  }
}

export type LikeMovieParams = Pick<Movie, 'id' | 'isLike'>

export interface LikeMovie {
  (params: LikeMovieParams): Promise<void>
}

export const likeMovie: LikeMovie = async ({ id, isLike }) => {
  const client = await createServerSupabaseClient()

  const { data, error: queryError } = await client.from('movie').select('*').eq('id', id).single()

  if (queryError || !data) {
    throw new Exception('요청하신 영화를 찾을 수 없어요')
  }

  if (data.is_like === isLike) {
    return
  }

  const { error } = await client.from('movie').update({ is_like: isLike }).eq('id', id)

  if (error) {
    throw new Exception(isLike ? '영화 찜하기에 실패했어요' : '영화 찜해제에 실패했어요')
  }
}
