'use client'

import { Button, Loader } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'
import { IconAlertTriangle, IconReload, IconUsers } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSession } from '@/entities/auth'
import { useFollowingListInfiniteQuery, useResetFollowingQuery } from '@/entities/following'
import { ProfileCard } from '@/entities/profile'
import { PATH } from '@/shared/config'

const ErrorFallback: React.FC = () => {
  const reset = useResetFollowingQuery()

  return (
    <div className="mx-4 flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
      <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
        <IconAlertTriangle color="var(--mantine-color-gray-light-color)" />
      </div>
      <p className="mb-8 break-keep font-semibold">팔로잉 목록을 불러오는데 실패했어요</p>
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

export const FollowingList: React.FC = () => {
  const { data: session } = useSession()
  const {
    isLoading,
    isError,
    data = [],
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFollowingListInfiniteQuery({ userId: session?.id })

  if (isError) {
    return <ErrorFallback />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center px-5 py-24">
        <Loader color="var(--mantine-color-placeholder)" />
      </div>
    )
  }

  if (data.length <= 0) {
    return (
      <div className="mx-4 flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
        <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
          <IconUsers color="var(--mantine-color-gray-light-color)" />
        </div>
        <p className="mb-8 break-keep font-semibold">팔로잉 목록이 비었어요</p>
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
