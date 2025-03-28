import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { ProfileOverview } from '@/widgets/user-profile'
import { getSession } from '@/entities/auth'
import { getUserProfileByDisplayId } from '@/entities/profile'
import { PATH } from '@/shared/config'

interface ProfilePageProps {
  params: Promise<{ displayId: string }>
}

export const generateMetadata = async ({ params }: ProfilePageProps): Promise<Metadata> => {
  const { displayId } = await params
  const profile = await getUserProfileByDisplayId({ displayId }).catch(() => null)

  if (!profile) {
    return { title: 'Profile' }
  }

  return { title: profile.name }
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  const { displayId } = await params
  const [session, profile] = await Promise.all([
    getSession(),
    getUserProfileByDisplayId({ displayId }).catch(() => notFound()),
  ])

  if (!profile) {
    notFound()
  }

  if (session && session.id === profile.userId) {
    redirect(PATH.MY_PROFILE)
  }

  return <ProfileOverview {...profile} />
}

export default ProfilePage
