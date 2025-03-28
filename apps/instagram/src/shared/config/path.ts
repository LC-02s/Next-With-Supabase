import { createSearchParamsToURL } from '../lib'

export const PATH = {
  ROOT: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REGISTER_CALLBACK: '/auth/register/callback',
  LOGOUT: '/auth/logout',
  EMAIL_CONFIRMATION: '/auth/register/email-confirmation',
  INITIAL_SETTING: '/auth/register/initial-setting',
  SEARCH: '/search',
  FOLLOWING: '/my/following',
  FOLLOWER: createSearchParamsToURL('/my/following')(['tab', 'follower']),
  PROFILE: (displayId: string) => `/profile/${displayId}` as const,
  MY_PROFILE: '/my/profile',
  PROFILE_SETTING: '/my/profile/setting',
} as const
