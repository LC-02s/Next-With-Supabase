'use client'

import { Button } from '@mantine/core'
import { IconShieldLock } from '@tabler/icons-react'
import Link from 'next/link'
import { PATH } from '@/shared/config'

export const NeedLogin: React.FC = () => {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
      <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
        <IconShieldLock color="var(--mantine-color-gray-light-color)" />
      </div>
      <p className="mb-9 break-keep text-center font-semibold">로그인이 필요한 기능이에요</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button href={PATH.LOGIN} variant="light" component={Link}>
          로그인
        </Button>
        <Button href={PATH.REGISTER} component={Link}>
          회원가입
        </Button>
      </div>
    </div>
  )
}
