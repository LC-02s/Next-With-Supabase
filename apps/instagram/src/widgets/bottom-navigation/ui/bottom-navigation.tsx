'use client'

import { Button } from '@mantine/core'
import {
  IconHome,
  IconHomeFilled,
  IconSearch,
  IconUser,
  IconUserFilled,
  IconUsers,
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from '@/entities/auth'
import { ProfileAvatar } from '@/entities/profile'
import { PATH } from '@/shared/config'

const DEFAULT_STROKE_WIDTH = 1.5
const ACTIVE_STROKE_WIDTH = 2.5

export const BottomNavigation: React.FC = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <nav className="absolute inset-x-0 bottom-0 z-30">
      <ul className="mx-auto flex size-full h-16 max-w-screen-sm items-center justify-between space-x-2 border-x-0 border-b-0 border-t border-solid border-gray-300 bg-white px-3 py-2 dark:border-dark-400 dark:bg-dark-600">
        <li className="flex h-full flex-1 items-center justify-center">
          <Button
            href={PATH.ROOT}
            title="홈"
            className="flex size-full items-center justify-center"
            component={Link}
            variant="subtle"
            color="gray"
          >
            {pathname === '/' ? (
              <IconHomeFilled />
            ) : (
              <IconHome strokeWidth={DEFAULT_STROKE_WIDTH} />
            )}
          </Button>
        </li>
        <li className="flex h-full flex-1 items-center justify-center">
          <Button
            href={PATH.SEARCH}
            title="검색"
            className="flex size-full items-center justify-center"
            component={Link}
            variant="subtle"
            color="gray"
          >
            <IconSearch
              strokeWidth={pathname === PATH.SEARCH ? ACTIVE_STROKE_WIDTH : DEFAULT_STROKE_WIDTH}
            />
          </Button>
        </li>
        <li className="flex h-full flex-1 items-center justify-center">
          <Button
            href={PATH.FOLLOWING}
            title="팔로잉"
            className="flex size-full items-center justify-center"
            component={Link}
            variant="subtle"
            color="gray"
          >
            <IconUsers
              strokeWidth={pathname === PATH.FOLLOWING ? ACTIVE_STROKE_WIDTH : DEFAULT_STROKE_WIDTH}
            />
          </Button>
        </li>
        <li className="flex h-full flex-1 items-center justify-center">
          <Button
            href={PATH.MY_PROFILE}
            title="프로필"
            className="flex size-full items-center justify-center"
            component={Link}
            variant="subtle"
            color="gray"
          >
            {!session ? (
              pathname.startsWith(PATH.MY_PROFILE) ? (
                <IconUserFilled />
              ) : (
                <IconUser strokeWidth={DEFAULT_STROKE_WIDTH} />
              )
            ) : (
              <ProfileAvatar
                userId={session.id}
                className={
                  pathname.startsWith(PATH.MY_PROFILE)
                    ? 'border-2 !border-blue-700 dark:!border-white'
                    : undefined
                }
              />
            )}
          </Button>
        </li>
      </ul>
    </nav>
  )
}
