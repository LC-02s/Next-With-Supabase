import { Metadata } from 'next'
import { headers } from 'next/headers'
import { RegisterForm } from '@/widgets/auth-form'

export const metadata: Metadata = {
  title: 'Register',
}

const RegisterPage: React.FC = async () => {
  const header = await headers()

  const host = header.get('x-forwarded-host')
  const proto = header.get('x-forwarded-proto')

  const origin = host && proto ? [proto, host].join('://') : ''

  return <RegisterForm origin={origin} />
}

export default RegisterPage
