import { useQuery } from '@tanstack/react-query'

import { isFollowing, IsFollowingParams } from './following.action'
import { followingQueryKeys } from './query-keys'

export type UseIsFollowingParams = Partial<Pick<IsFollowingParams, 'userId'>> &
  Pick<IsFollowingParams, 'following'>

export const useIsFollowing = ({ userId = '', following }: UseIsFollowingParams) =>
  useQuery({
    queryKey: followingQueryKeys.isFollowing({ userId, following }),
    queryFn: () => isFollowing({ userId, following }),
    enabled: !!userId,
  })
