'use client'

import { ActionIcon } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import { LikeMovieParams, useLikeMovie, useResetSearchMoviesInfiniteQuery } from '@/entities/api'

import { useMovieListParams } from '../lib'

export type LikeButton = LikeMovieParams

export const LikeButton: React.FC<LikeButton> = ({ id, isLike }) => {
  const params = useMovieListParams()
  const reset = useResetSearchMoviesInfiniteQuery()

  const label = isLike ? '찜 해제' : '찜하기'
  const { mutate: like } = useLikeMovie({
    id,
    onSuccess: () => {
      if (params.like) {
        reset()
      }

      toast.success(isLike ? '찜리스트에 추가되었어요!' : '찜리스트에서 제외되었어요!')
    },
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error(`예기치 못한 이유로 ${label}에 실패했어요`)
    },
  })

  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      radius="lg"
      size="lg"
      className="pointer-events-auto p-1 pt-1.5"
      title={label}
      onClick={() => like({ isLike: !isLike })}
    >
      {isLike ? (
        <IconHeartFilled color="var(--mantine-color-red-filled)" />
      ) : (
        <IconHeart color="var(--mantine-color-placeholder)" />
      )}
    </ActionIcon>
  )
}
