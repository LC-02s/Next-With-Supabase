'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { UserProfile } from '../model'

import { getUserProfile, GetUserProfileParams } from './profile.action'
import { profileQueryKeys } from './query-keys'

export type UseProfileQueryParams = Partial<GetUserProfileParams>

export const useProfileQuery = ({ userId = '' }: UseProfileQueryParams) =>
  useQuery({
    queryKey: profileQueryKeys.profile({ userId }),
    queryFn: () => getUserProfile({ userId }),
    enabled: !!userId,
  })

export type UseSetProfileQueryParams = GetUserProfileParams

export const useSetProfileQuery = ({ userId }: UseSetProfileQueryParams) => {
  const queryClient = useQueryClient()

  return (profile: UserProfile | null) => {
    queryClient.setQueryData(profileQueryKeys.profile({ userId }), profile)
  }
}
