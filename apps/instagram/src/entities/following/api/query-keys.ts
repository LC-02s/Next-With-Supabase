import { UseFollowerCountParams } from './use-follower-count'
import { UseFollowerListInfiniteQueryParams } from './use-follower-list'
import { UseFollowingCountParams } from './use-following-count'
import { UseFollowingListInfiniteQueryParams } from './use-following-list'

export const followingQueryKeys = {
  all: ['following-all'] as const,
  followingList: (params: UseFollowingListInfiniteQueryParams) =>
    [...followingQueryKeys.all, 'following-list', params] as const,
  followingCount: (params: UseFollowingCountParams) =>
    [...followingQueryKeys.all, 'following-count', params] as const,
  followerList: (params: UseFollowerListInfiniteQueryParams) =>
    [...followingQueryKeys.all, 'follower-list', params] as const,
  followerCount: (params: UseFollowerCountParams) =>
    [...followingQueryKeys.all, 'follower-count', params] as const,
} as const
