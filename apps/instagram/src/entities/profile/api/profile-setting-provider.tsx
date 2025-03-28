import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/config'

import { UserProfile } from '../model'

import { getUserProfile } from './profile.action'
import { profileQueryKeys } from './query-keys'

export type ProfileSettingProviderProps = React.PropsWithChildren<
  Partial<Pick<UserProfile, 'userId'>>
>

export const ProfileSettingProvider: React.FC<ProfileSettingProviderProps> = async ({
  userId,
  children,
}) => {
  if (!userId) {
    return <>{children}</>
  }

  const profile = await getUserProfile({ userId }).catch(() => null)

  if (!profile) {
    redirect(PATH.INITIAL_SETTING)
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: profileQueryKeys.profile({ userId }),
    queryFn: () => profile,
  })

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
