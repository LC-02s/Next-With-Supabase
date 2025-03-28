'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getFollowerList } from './following.action'
import { followingQueryKeys } from './query-keys'

export interface UseFollowerListInfiniteQueryParams {
  userId: string
}

export const useFollowerListInfiniteQuery = ({ userId }: UseFollowerListInfiniteQueryParams) =>
  useInfiniteQuery({
    queryKey: followingQueryKeys.followerList({ userId }),
    queryFn: ({ pageParam }) => getFollowerList({ userId, cursor: pageParam }),
    select: ({ pages }) => pages.flatMap((response) => response.data),
    initialPageParam: 1,
    getNextPageParam: ({ first, last, nextCursor }) => (first || last ? null : nextCursor),
  })
