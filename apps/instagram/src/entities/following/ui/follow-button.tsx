'use client'

import { modals } from '@mantine/modals'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useSession } from '@/entities/auth/@x/following'
import { PATH } from '@/shared/config'

import { useFollowUser, useIsFollowing, useUnfollowUser } from '../api'

export interface FollowButtonProps {
  targetId: string
  children: (props: {
    disabled: boolean
    pending: boolean
    isFollowing: boolean
    onClick: () => void
  }) => React.ReactNode
}

export const FollowButton: React.FC<FollowButtonProps> = ({ targetId, children: Trigger }) => {
  const { data: session, isLoading: isSessionLoading } = useSession()

  const follow = useFollowUser({
    following: targetId,
    onSuccess: () => toast.success('팔로잉 목록에 추가되었어요!'),
    onException: (error) => toast.error(error.message),
    onError: () => toast.error('예기치 못한 이유로 팔로우에 실패했어요'),
  })
  const unfollow = useUnfollowUser({
    userId: session?.id ?? '',
    following: targetId,
    onSuccess: () => toast.success('팔로잉 목록에서 제외되었어요'),
    onException: (error) => toast.error(error.message),
    onError: () => toast.error('예기치 못한 이유로 팔로우 취소에 실패했어요'),
  })

  const { data: isFollowing = false, isLoading: isFollowingLoading } = useIsFollowing({
    userId: session?.id,
    following: targetId,
  })

  const isDisabled = isSessionLoading || follow.isPending || unfollow.isPending
  const isPending = isSessionLoading || isFollowingLoading || follow.isPending || unfollow.isPending

  const { push } = useRouter()

  const handleClick = () => {
    if (!session) {
      return modals.openConfirmModal({
        title: <span className="break-keep font-bold">로그인이 필요한 기능이에요</span>,
        size: 'sm',
        radius: 'md',
        withCloseButton: false,
        onConfirm: () => push(PATH.LOGIN),
        confirmProps: { children: '로그인 하러가기' },
      })
    }

    if (isFollowing) {
      unfollow.mutate()
      return
    }

    follow.mutate()
  }

  return (
    <Trigger
      onClick={handleClick}
      disabled={isDisabled}
      pending={isPending}
      isFollowing={isFollowing}
    />
  )
}
