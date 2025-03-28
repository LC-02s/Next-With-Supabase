import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/widgets/profile-form'
import { getSession } from '@/entities/auth'
import { getUserProfile } from '@/entities/profile'
import { createSearchParamsToURL } from '@/shared/lib'

export const metadata: Metadata = {
  title: 'Initial Setting',
}

const InitialSettingPage: React.FC = async () => {
  const [session, header] = await Promise.all([getSession(), headers()])

  const referer = header.get('referer')
  const origin = referer ? new URL(referer).pathname : '/'

  if (!session) {
    redirect(createSearchParamsToURL(origin)(['status', 'no-session']))
  }

  const profile = await getUserProfile({ userId: session.id }).catch(() => null)

  if (profile) {
    redirect(createSearchParamsToURL(origin)(['status', 'no-session']))
  }

  return <ProfileForm userId={session.id} />
}

export default InitialSettingPage
