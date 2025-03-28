import { Metadata } from 'next'
import { WithAuth } from '@/entities/auth'

export const metadata: Metadata = {
  title: 'Following',
}

const FollowingPage: React.FC = () => (
  <div>
    <WithAuth />
  </div>
)

export default FollowingPage
