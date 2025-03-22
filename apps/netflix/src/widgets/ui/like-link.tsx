'use client'

import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { ROOT_PATH } from '@/shared/config'
import { createSearchParamsToURL, PropsWithClassName } from '@/shared/lib'

import { MOVIE_LIST_PARAMS, useMovieListParams } from '../lib'

export const LikeLink: React.FC<PropsWithChildren<PropsWithClassName>> = ({
  className,
  children,
}) => {
  const { keyword, like } = useMovieListParams()
  const defaultPath = createSearchParamsToURL(ROOT_PATH)([
    MOVIE_LIST_PARAMS.KEYWORD,
    encodeURI(keyword),
  ])

  return (
    <Link
      href={
        like ? defaultPath : createSearchParamsToURL(defaultPath)([MOVIE_LIST_PARAMS.LIKE, 'true'])
      }
      className={className}
    >
      {children}
    </Link>
  )
}
