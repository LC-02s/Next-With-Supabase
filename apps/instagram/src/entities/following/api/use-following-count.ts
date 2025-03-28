import { useQuery } from '@tanstack/react-query'

import { getFollowingCount } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseFollowingCountParams {
  userId: string
}

export const useFollowingCount = ({ userId }: UseFollowingCountParams) =>
  useQuery({
    queryKey: followingQueryKeys.followingCount({ userId }),
    queryFn: () => getFollowingCount({ userId }),
  })
