'use client'

import { ActionIcon, Button, Loader, Skeleton } from '@mantine/core'
import { IconCamera, IconEdit } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from '@/entities/auth'
import { useFollowerCount, useFollowingCount } from '@/entities/following'
import { useProfileQuery, UserProfile as IUserProfile } from '@/entities/profile'
import { PATH } from '@/shared/config'

import { ModifyProfileImageDialog } from './modify-profile-image-dialog'

type UserProfileInnerProps = React.PropsWithChildren<
  Pick<IUserProfile, 'userId' | 'displayId' | 'name' | 'imageURL'>
>

const UserProfileInner: React.FC<UserProfileInnerProps> = ({
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
        <div className="relative size-20">
          <div className="flex size-full items-center justify-center overflow-hidden rounded-full border border-solid border-gray-300 bg-gray-200 dark:border-dark-600 dark:bg-dark-600">
            <Image
              src={imageURL}
              alt={`${name} 프로필`}
              width={160}
              height={160}
              className="size-full object-cover"
            />
          </div>
          <ModifyProfileImageDialog userId={userId} imageURL={imageURL}>
            {({ open }) => (
              <ActionIcon
                variant="default"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={open}
              >
                <IconCamera className="size-4" />
              </ActionIcon>
            )}
          </ModifyProfileImageDialog>
        </div>
        <div className="w-full flex-1">
          <p className="mb-1 whitespace-nowrap px-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            @{displayId}
          </p>
          <h1 className="mb-3 break-keep px-2 font-semibold">{name}</h1>
          <ul className="flex items-start justify-between">
            <li className="flex flex-1 flex-col items-start justify-start">
              <strong className="whitespace-nowrap px-2 pt-2">0</strong>
              <span className="whitespace-nowrap px-2 pb-2">게시물</span>
            </li>
            <li className="flex-1">
              <Link
                href={PATH.FOLLOWER}
                className="flex flex-col items-start justify-start rounded p-2 hover:bg-[--mantine-color-gray-light-hover]"
              >
                <Skeleton visible={followerCount.isLoading} width={36}>
                  <strong className="whitespace-nowrap">
                    {followerCount.isError ? '오류' : (followerCount.data ?? 0)}
                  </strong>
                </Skeleton>
                <span className="whitespace-nowrap">팔로워</span>
              </Link>
            </li>
            <li className="flex-1">
              <Link
                href={PATH.FOLLOWING}
                className="flex flex-col items-start justify-start rounded p-2 hover:bg-[--mantine-color-gray-light-hover]"
              >
                <Skeleton visible={followingCount.isLoading} width={36}>
                  <strong className="whitespace-nowrap">
                    {followingCount.isError ? '오류' : (followingCount.data ?? 0)}
                  </strong>
                </Skeleton>
                <span className="whitespace-nowrap">팔로잉</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  )
}

export const UserProfile: React.FC = () => {
  const { data: session } = useSession()
  const { isLoading, isError, data: profile } = useProfileQuery({ userId: session?.id })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center px-5 py-24">
        <Loader color="var(--mantine-color-placeholder)" />
      </div>
    )
  }

  if (isError || !profile) {
    return null
  }

  return (
    <UserProfileInner {...profile}>
      <Button
        href={PATH.PROFILE_SETTING}
        variant="default"
        className="w-full"
        leftSection={<IconEdit className="size-4" />}
        component={Link}
      >
        프로필 편집
      </Button>
    </UserProfileInner>
  )
}
