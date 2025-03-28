import { Loader } from '@mantine/core'
import { IconExclamationCircle } from '@tabler/icons-react'
import Image from 'next/image'
import { cn, PropsWithClassName } from '@/shared/lib'

import { useProfileQuery } from '../api'
import { UserProfile } from '../model'

export type ProfileAvatarProps = PropsWithClassName<Pick<UserProfile, 'userId'>>

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ userId, className }) => {
  const { data, isLoading, isError } = useProfileQuery({ userId })

  if (isError) {
    return <IconExclamationCircle color="var(--mantine-color-red-text)" />
  }

  if (isLoading || !data) {
    return <Loader size="xs" />
  }

  return (
    <div
      className={cn(
        'size-8 overflow-hidden rounded-full flex justify-center border border-solid border-gray-300 bg-gray-200 dark:bg-dark-600 dark:border-dark-600 items-center',
        className,
      )}
    >
      <Image
        src={data.imageURL}
        alt={`${data.name} 프로필`}
        width={160}
        height={160}
        className="size-full object-cover"
      />
    </div>
  )
}
