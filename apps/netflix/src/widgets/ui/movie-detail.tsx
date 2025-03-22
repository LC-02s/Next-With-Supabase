'use client'

import { Rating } from '@mantine/core'
import Image from 'next/image'
import { GetMovieParams, useMovieQuery } from '@/entities/api'

import { LikeButton } from './like-button'

export type MovieDetailProps = GetMovieParams

export const MovieDetail: React.FC<MovieDetailProps> = ({ id }) => {
  const { data: movie, isError } = useMovieQuery({ id })

  if (!movie || isError) {
    return null
  }

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="w-full flex-1 overflow-hidden rounded-lg md:max-w-xs">
        <Image
          src={movie.imageURL}
          alt={`썸네일: ${movie.title}`}
          width={750}
          height={500}
          className="bg-[var(--mantine-color-gray-light)]"
        />
      </div>
      <div className="flex w-full flex-1 flex-col gap-4 pb-8 md:p-6">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="break-keep text-gray-600 dark:text-dark-200">{movie.overview}</p>
        <span>개봉일: {movie.releaseDate}</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Rating defaultValue={movie.voteAverage / 2} fractions={2} readOnly />
            <span>{(movie.voteAverage / 2).toFixed(1)}</span>
          </div>
          <LikeButton id={movie.id} isLike={movie.isLike} />
        </div>
      </div>
    </div>
  )
}
