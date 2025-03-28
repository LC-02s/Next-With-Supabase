'use client'

import { ActionIcon } from '@mantine/core'
import { IconLogout, IconUser } from '@tabler/icons-react'
import Link from 'next/link'
import { LogoutButton, useSession } from '@/entities/auth'
import { PATH } from '@/shared/config'

import { MainLogo } from './main-logo'

export const Header: React.FC = () => {
  const { data } = useSession()

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex size-full h-14 max-w-screen-sm items-center justify-between space-x-2 border-x-0 border-b border-t-0 border-solid border-gray-300 bg-white px-5 py-2 dark:border-dark-400 dark:bg-dark-600">
        <h1>
          <MainLogo />
        </h1>
        <div className="flex items-center justify-end gap-2">
          {!data ? (
            <ActionIcon
              href={PATH.LOGIN}
              title="로그인 하러가기"
              variant="subtle"
              color="gray"
              size="lg"
              component={Link}
            >
              <IconUser className="size-5" />
            </ActionIcon>
          ) : (
            <LogoutButton>
              {({ logout }) => (
                <ActionIcon
                  title="로그아웃"
                  variant="subtle"
                  color="gray"
                  size="lg"
                  onClick={logout}
                >
                  <IconLogout className="size-5" />
                </ActionIcon>
              )}
            </LogoutButton>
          )}
        </div>
      </div>
    </header>
  )
}
