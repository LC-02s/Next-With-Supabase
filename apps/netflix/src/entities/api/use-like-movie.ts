'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { Movie } from '../model'

import { likeMovie, LikeMovieParams } from './actions'
import { movieQueryKeys } from './query-keys'

export interface UseLikeMovieParams extends Pick<LikeMovieParams, 'id'> {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useLikeMovie = ({
  id,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseLikeMovieParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: movieQueryKeys.all,
    mutationFn: ({ isLike }: Pick<LikeMovieParams, 'isLike'>) =>
      likeMovie({ id, isLike }).catch((error) => {
        throw new Exception(error.message)
      }),
    onMutate: ({ isLike }) => {
      onMutate?.()
      try {
        queryClient.setQueriesData<{ pages: { data: Movie[] }[] }>(
          { queryKey: movieQueryKeys.listAll() },
          (prev) => {
            return {
              ...prev,
              pages:
                prev?.pages.map((page) => ({
                  ...page,
                  data: page.data.map((movie) => {
                    if (movie.id === id) {
                      return { ...movie, isLike }
                    }

                    return movie
                  }),
                })) ?? [],
            }
          },
        )
        queryClient.setQueryData<Movie>(movieQueryKeys.detail({ id }), (movie) =>
          movie
            ? {
                ...movie,
                isLike,
              }
            : undefined,
        )

        return { status: true }
      } catch {
        return { status: false }
      }
    },
    onSuccess: (_, __, context) => {
      if (!context?.status) {
        queryClient.invalidateQueries({ queryKey: movieQueryKeys.all })
      }

      onSuccess?.()
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: movieQueryKeys.all })

      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}
