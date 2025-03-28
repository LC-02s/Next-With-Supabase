import { Loader } from '@mantine/core'
import { IconExclamationCircle } from '@tabler/icons-react'
import Image from 'next/image'
import { cn, PropsWithClassName } from '@/shared/lib'

import { useProfileQuery } from '../api'
import { UserProfile } from '../model'

export interface ProfileAvatarProps extends PropsWithClassName<Pick<UserProfile, 'userId'>> {
  classNames?: {
    root?: string
    image?: string
    icon?: string
  }
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ userId, className, classNames }) => {
  const { data, isLoading, isError } = useProfileQuery({ userId })

  return (
    <div
      className={cn(
        'size-8 overflow-hidden rounded-full flex justify-center border border-solid border-gray-300 bg-gray-200 dark:bg-dark-600 dark:border-dark-600 items-center',
        className,
        classNames?.root,
      )}
    >
      {isError ? (
        <IconExclamationCircle
          className={cn('size-4', classNames?.icon)}
          color="var(--mantine-color-placeholder)"
        />
      ) : isLoading || !data ? (
        <Loader size="xs" color="var(--mantine-color-placeholder)" />
      ) : (
        <Image
          src={data.imageURL}
          alt={`${data.name} 프로필`}
          width={160}
          height={160}
          className={cn('size-full object-cover', classNames?.image)}
        />
      )}
    </div>
  )
}
