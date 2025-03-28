'use client'

import { modals } from '@mantine/modals'
import { PATH } from '@/shared/config'

export interface LogoutButtonProps {
  children: (props: { logout: () => void }) => React.ReactNode
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ children: Trigger }) => {
  const open = () =>
    modals.openConfirmModal({
      title: <span className="break-keep font-bold">정말 로그아웃 하시겠어요?</span>,
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      onConfirm: () => (window.location.href = PATH.LOGOUT),
    })

  return <Trigger logout={open} />
}
