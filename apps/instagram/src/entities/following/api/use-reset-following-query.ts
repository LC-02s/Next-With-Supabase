import { useQueryClient } from '@tanstack/react-query'

import { followingQueryKeys } from './query-keys'

export const useResetFollowingQuery = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: followingQueryKeys.all })
  }
}
