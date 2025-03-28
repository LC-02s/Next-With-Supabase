'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getFollowingList } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseFollowingListInfiniteQueryParams {
  userId: string
}

export const useFollowingListInfiniteQuery = ({ userId }: UseFollowingListInfiniteQueryParams) =>
  useInfiniteQuery({
    queryKey: followingQueryKeys.followingList({ userId }),
    queryFn: ({ pageParam }) => getFollowingList({ userId, cursor: pageParam }),
    select: ({ pages }) => pages.flatMap((response) => response.data),
    initialPageParam: 1,
    getNextPageParam: ({ first, last, nextCursor }) => (first || last ? null : nextCursor),
  })
