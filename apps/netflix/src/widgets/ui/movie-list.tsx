'use client'

import { Button, Loader } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import {
  IconAlertTriangle,
  IconReload,
  IconVideoOff,
  IconZoomExclamation,
} from '@tabler/icons-react'
import { useEffect } from 'react'
import { useResetSearchMoviesInfiniteQuery, useSearchMoviesInfiniteQuery } from '@/entities/api'

import { useMovieListParams } from '../lib'

import { MovieLink } from './movie-link'

const ErrorFallback: React.FC = () => {
  const reset = useResetSearchMoviesInfiniteQuery()

  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
      <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
        <IconAlertTriangle color="var(--mantine-color-gray-light-color)" />
      </div>
      <p className="mb-8 break-keep font-semibold">영화 목록을 불러오는데 실패했어요</p>
      <Button
        variant="default"
        color="gray"
        radius="md"
        onClick={reset}
        leftSection={<IconReload className="size-4" />}
      >
        다시시도
      </Button>
    </div>
  )
}

interface FetcherProps {
  fetch: () => void
}

const Trigger: React.FC<FetcherProps> = ({ fetch }) => {
  const { ref, inViewport } = useInViewport()

  useEffect(() => {
    if (inViewport) fetch()
  }, [inViewport, fetch])

  return <div ref={ref} className="h-5" />
}

export const MovieList: React.FC = () => {
  const { keyword, like } = useMovieListParams()
  const { isLoading, isError, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSearchMoviesInfiniteQuery({ keyword, like })

  if (isError) {
    return <ErrorFallback />
  }

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center px-5 py-24">
        <Loader color="var(--mantine-color-placeholder)" />
      </div>
    )
  }

  if (data.length <= 0) {
    const Icon = keyword ? IconZoomExclamation : IconVideoOff

    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
        <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
          <Icon color="var(--mantine-color-gray-light-color)" />
        </div>
        <p className="mb-8 break-keep font-semibold">
          {keyword ? '검색된 영화가 없어요' : like ? '찜한 영화가 없어요' : '영화가 없어요'}
        </p>
      </div>
    )
  }

  return (
    <div className="pb-12">
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((movie) => (
          <li key={movie.id}>
            <MovieLink {...movie} />
          </li>
        ))}
      </ul>
      {hasNextPage && !isFetchingNextPage && <Trigger fetch={fetchNextPage} />}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center px-5 py-16">
          <Loader color="var(--mantine-color-placeholder)" />
        </div>
      )}
    </div>
  )
}
