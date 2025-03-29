'use client'

import { Tabs } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/config'

import { FollowerList } from './follower-list'
import { FollowingList } from './following-list'

export const FollowingTabs: React.FC = () => {
  const searchParams = useSearchParams()
  const target = searchParams.get('tab') === 'follower' ? 'follower' : 'following'

  const { push } = useRouter()

  return (
    <Tabs value={target} defaultValue="following" className="py-6">
      <Tabs.List className="mx-4">
        <Tabs.Tab value="following" className="px-8" onClick={() => push(PATH.FOLLOWING)}>
          팔로잉
        </Tabs.Tab>
        <Tabs.Tab value="follower" className="px-8" onClick={() => push(PATH.FOLLOWER)}>
          팔로워
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="following" className="py-4">
        <FollowingList />
      </Tabs.Panel>

      <Tabs.Panel value="follower" className="py-4">
        <FollowerList />
      </Tabs.Panel>
    </Tabs>
  )
}
