import { Metadata } from 'next'
import { ModifyProfileForm } from '@/widgets/profile-form'
import { WithAuth } from '@/entities/auth'

export const metadata: Metadata = {
  title: 'Profile Setting',
}

const ProfileSettingPage: React.FC = () => (
  <div>
    <WithAuth>
      <ModifyProfileForm />
    </WithAuth>
  </div>
)

export default ProfileSettingPage
