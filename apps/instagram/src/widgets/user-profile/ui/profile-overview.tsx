'use client'

import { Button, Skeleton } from '@mantine/core'
import { IconSend, IconUserMinus, IconUserPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { FollowButton, useFollowerCount, useFollowingCount } from '@/entities/following'
import { UserProfile } from '@/entities/profile'

type ProfileOverviewInnerProps = React.PropsWithChildren<
  Pick<UserProfile, 'userId' | 'displayId' | 'name' | 'imageURL'>
>

const ProfileOverviewInner: React.FC<ProfileOverviewInnerProps> = ({
  userId,
  displayId,
  name,
  imageURL,
  children,
}) => {
  const followerCount = useFollowerCount({ userId })
  const followingCount = useFollowingCount({ userId })

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-6 pb-9 xs:flex-row">
        <div className="flex size-20 items-center justify-center overflow-hidden rounded-full border border-solid border-gray-300 bg-gray-200 dark:border-dark-600 dark:bg-dark-600">
          <Image
            src={imageURL}
            alt={`${name} 프로필`}
            width={160}
            height={160}
            className="size-full object-cover"
            priority
          />
        </div>
        <div className="w-full flex-1">
          <p className="mb-1 whitespace-nowrap px-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            @{displayId}
          </p>
          <h1 className="mb-3 break-keep px-2 font-semibold">{name}</h1>
          <ul className="flex items-start justify-between">
            <li className="flex flex-1 flex-col items-start justify-start p-2">
              <strong className="whitespace-nowrap">0</strong>
              <span className="whitespace-nowrap">게시물</span>
            </li>
            <li className="flex flex-1 flex-col items-start justify-start p-2">
              <Skeleton visible={followerCount.isLoading} width={36}>
                <strong className="whitespace-nowrap">
                  {followerCount.isError ? '오류' : (followerCount.data ?? 0)}
                </strong>
              </Skeleton>
              <span className="whitespace-nowrap">팔로워</span>
            </li>
            <li className="flex flex-1 flex-col items-start justify-start p-2">
              <Skeleton visible={followingCount.isLoading} width={36}>
                <strong className="whitespace-nowrap">
                  {followingCount.isError ? '오류' : (followingCount.data ?? 0)}
                </strong>
              </Skeleton>
              <span className="whitespace-nowrap">팔로잉</span>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  )
}

export type ProfileOverviewProps = ProfileOverviewInnerProps

export const ProfileOverview: React.FC<ProfileOverviewProps> = (props) => {
  return (
    <ProfileOverviewInner {...props}>
      <div className="flex flex-col items-center justify-center gap-2 xs:flex-row">
        <FollowButton targetId={props.userId}>
          {({ onClick, isFollowing, disabled, pending }) => (
            <Button
              variant="default"
              className="w-full flex-1"
              leftSection={
                isFollowing ? (
                  <IconUserMinus className="size-4" />
                ) : (
                  <IconUserPlus className="size-4" />
                )
              }
              onClick={onClick}
              disabled={disabled}
              loading={pending}
              loaderProps={{ type: 'dots' }}
            >
              {isFollowing ? '팔로우 취소' : '팔로우'}
            </Button>
          )}
        </FollowButton>
        <Button
          variant="default"
          className="w-full flex-1"
          leftSection={<IconSend className="size-4" />}
        >
          메시지
        </Button>
      </div>
    </ProfileOverviewInner>
  )
}
