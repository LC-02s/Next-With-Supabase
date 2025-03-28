import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/widgets/auth-form'
import { getSession } from '@/entities/auth'
import { createSearchParamsToURL } from '@/shared/lib'

export const metadata: Metadata = {
  title: 'Login',
}

const LoginPage: React.FC = async () => {
  const [session, header] = await Promise.all([getSession(), headers()])

  const referer = header.get('referer')
  const origin = referer ? new URL(referer).pathname : '/'

  if (session) {
    redirect(createSearchParamsToURL(origin)(['status', 'already-login']))
  }

  return <LoginForm to={origin} />
}

export default LoginPage
