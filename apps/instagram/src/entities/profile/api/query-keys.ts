import { GetUserProfileParams } from './profile.action'

export const profileQueryKeys = {
  all: ['profile-all'] as const,
  profile: (params: GetUserProfileParams) => [...profileQueryKeys.all, 'profile', params] as const,
}
