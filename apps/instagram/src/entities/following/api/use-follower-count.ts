import { useQuery } from '@tanstack/react-query'

import { getFollowingCount } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseFollowerCountParams {
  userId: string
}

export const useFollowerCount = ({ userId }: UseFollowerCountParams) =>
  useQuery({
    queryKey: followingQueryKeys.followerCount({ userId }),
    queryFn: () => getFollowingCount({ userId }),
  })
