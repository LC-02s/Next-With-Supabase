'use client'

import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { useResetSearchMoviesInfiniteQuery } from '@/entities/api'
import { ROOT_PATH } from '@/shared/config'
import { PropsWithClassName } from '@/shared/lib'

export const RootLink: React.FC<PropsWithChildren<PropsWithClassName>> = ({
  className,
  children,
}) => {
  const reset = useResetSearchMoviesInfiniteQuery()

  return (
    <Link href={ROOT_PATH} className={className} onClick={reset}>
      {children}
    </Link>
  )
}
