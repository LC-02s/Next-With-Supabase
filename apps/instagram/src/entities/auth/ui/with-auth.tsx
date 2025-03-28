'use client'

import { useSession } from '../api'

import { NeedLogin } from './need-login'

export const WithAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data } = useSession()

  if (!data) {
    return <NeedLogin />
  }

  return <>{children}</>
}
