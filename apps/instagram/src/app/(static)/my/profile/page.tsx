import { Metadata } from 'next'
import { WithAuth } from '@/entities/auth'

export const metadata: Metadata = {
  title: 'Profile',
}

const ProfilePage: React.FC = () => (
  <div>
    <WithAuth />
  </div>
)

export default ProfilePage
