import { Metadata } from 'next'
import { UserProfile } from '@/widgets/user-profile'
import { WithAuth } from '@/entities/auth'

export const metadata: Metadata = {
  title: 'My Profile',
}

const ProfilePage: React.FC = () => (
  <div>
    <WithAuth>
      <UserProfile />
    </WithAuth>
  </div>
)

export default ProfilePage
