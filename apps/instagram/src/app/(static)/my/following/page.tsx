import { Metadata } from 'next'
import { FollowingTabs } from '@/widgets/following-list'
import { WithAuth } from '@/entities/auth'

export const metadata: Metadata = {
  title: 'Following',
}

const FollowingPage: React.FC = () => (
  <WithAuth>
    <FollowingTabs />
  </WithAuth>
)

export default FollowingPage
