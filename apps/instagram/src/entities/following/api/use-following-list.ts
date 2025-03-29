'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getFollowingList } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseFollowingListInfiniteQueryParams {
  userId?: string
}

export const useFollowingListInfiniteQuery = ({
  userId = '',
}: UseFollowingListInfiniteQueryParams) =>
  useInfiniteQuery({
    queryKey: followingQueryKeys.followingList({ userId }),
    queryFn: ({ pageParam }) => getFollowingList({ userId, cursor: pageParam }),
    select: ({ pages }) => pages.flatMap((response) => response.data),
    initialPageParam: null as number | null,
    getNextPageParam: ({ nextCursor }) => nextCursor,
    enabled: !!userId,
  })
