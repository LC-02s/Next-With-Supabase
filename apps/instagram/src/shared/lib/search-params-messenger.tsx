'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const MESSAGES: Record<string, { status: 'success' | 'error'; message: string }> = {
  'register-success': {
    status: 'success',
    message: '회원가입에 성공했어요!',
  },
  'register-failed': {
    status: 'error',
    message: '회원가입에 실패했어요',
  },
  'register-invalid-code': {
    status: 'error',
    message: '올바르지 않은 접근이에요',
  },
  'register-invalid-user': {
    status: 'error',
    message: '알 수 없는 유저에요',
  },
  'already-register': {
    status: 'error',
    message: '이미 회원가입 하셨어요',
  },
  'login-success': {
    status: 'success',
    message: '환영합니다!',
  },
  'already-login': {
    status: 'error',
    message: '이미 로그인 하셨어요',
  },
  'logout-success': {
    status: 'success',
    message: '로그아웃 되었어요!',
  },
  'logout-failed': {
    status: 'error',
    message: '로그아웃에 실패했어요',
  },
  'already-verified-email': {
    status: 'success',
    message: '인증된 이메일이에요',
  },
  'no-session': {
    status: 'error',
    message: '잘못된 접근이에요',
  },
}

export const SearchParamsMessengerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { replace } = useRouter()

  useEffect(() => {
    const messageKey = searchParams.get('status')

    if (!messageKey) {
      return
    }

    const target = MESSAGES[messageKey]

    if (!target) {
      return
    }

    toast[target.status](target.message)
    replace(pathname)
  }, [searchParams, pathname, replace])

  return <>{children}</>
}
