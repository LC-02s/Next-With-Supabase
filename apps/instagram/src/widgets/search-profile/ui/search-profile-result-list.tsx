'use client'

import { Button, Loader } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import { IconAlertTriangle, IconReload, IconSearch, IconZoomExclamation } from '@tabler/icons-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  ProfileCard,
  useResetSearchProfilesQuery,
  useSearchProfilesQuery,
} from '@/entities/profile'
import { PATH } from '@/shared/config'

interface ErrorFallbackProps {
  keyword: string
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ keyword }) => {
  const reset = useResetSearchProfilesQuery()

  return (
    <div className="mx-4 flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
      <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
        <IconAlertTriangle color="var(--mantine-color-gray-light-color)" />
      </div>
      <p className="mb-8 break-keep font-semibold">프로필 목록을 불러오는데 실패했어요</p>
      <Button
        variant="default"
        color="gray"
        radius="md"
        onClick={() => reset({ keyword })}
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

export const SearchProfileResultList: React.FC = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('q') || ''

  const {
    isLoading,
    isError,
    data = [],
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchProfilesQuery({ keyword })

  if (isError) {
    return <ErrorFallback keyword={keyword} />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center px-5 py-24">
        <Loader color="var(--mantine-color-placeholder)" />
      </div>
    )
  }

  if (!keyword) {
    return (
      <div className="mx-4 flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
        <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
          <IconSearch color="var(--mantine-color-gray-light-color)" />
        </div>
        <p className="mb-8 break-keep font-semibold">찾으시는 프로필이 있으신가요?</p>
      </div>
    )
  }

  if (data.length <= 0) {
    return (
      <div className="mx-4 flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
        <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
          <IconZoomExclamation color="var(--mantine-color-gray-light-color)" />
        </div>
        <p className="mb-8 break-keep font-semibold">검색된 프로필이 없어요</p>
      </div>
    )
  }

  return (
    <div className="pb-12">
      <ul className="space-y-1">
        {data.map((profile) => (
          <li key={profile.id}>
            <Button
              href={PATH.PROFILE(profile.displayId)}
              title={`프로필 보기: ${profile.name}`}
              variant="subtle"
              color="gray"
              className="block size-auto rounded-none px-4 py-3"
              classNames={{ inner: 'justify-start' }}
              component={Link}
            >
              <ProfileCard {...profile} />
            </Button>
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
