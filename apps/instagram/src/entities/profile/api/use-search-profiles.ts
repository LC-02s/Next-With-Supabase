'use client'

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import { searchProfiles } from './profile.action'
import { profileQueryKeys } from './query-keys'

export interface UseSearchProfilesQueryParams {
  keyword: string
}

export const useSearchProfilesQuery = ({ keyword }: UseSearchProfilesQueryParams) =>
  useInfiniteQuery({
    queryKey: profileQueryKeys.search({ keyword }),
    queryFn: ({ pageParam }) => searchProfiles({ keyword, cursor: pageParam }),
    select: ({ pages }) => pages.flatMap((response) => response.data),
    initialPageParam: 1,
    getNextPageParam: ({ first, last, nextCursor }) => (first || last ? null : nextCursor),
    enabled: !!keyword,
  })

export const useResetSearchProfilesQuery = () => {
  const queryClient = useQueryClient()

  return ({ keyword }: UseSearchProfilesQueryParams) => {
    queryClient.invalidateQueries({ queryKey: profileQueryKeys.search({ keyword }) })
  }
}
