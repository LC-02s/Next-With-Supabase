import { GetUserProfileParams } from './profile.action'
import { UseSearchProfilesQueryParams } from './use-search-profiles'

export const profileQueryKeys = {
  all: ['profile-all'] as const,
  profile: (params: GetUserProfileParams) => [...profileQueryKeys.all, 'profile', params] as const,
  search: (params: UseSearchProfilesQueryParams) =>
    [...profileQueryKeys.all, 'search-profile', params] as const,
}
