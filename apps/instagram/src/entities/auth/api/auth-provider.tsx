import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { ProfileSettingProvider } from '@/entities/profile/@x/auth'

import { authQueryKeys } from './query-keys'
import { getSession } from './session.action'

export const AuthProvider: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const queryClient = new QueryClient()
  const session = await getSession()

  await queryClient.prefetchQuery({
    queryKey: authQueryKeys.session(),
    queryFn: () => session,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSettingProvider userId={session?.id}>{children}</ProfileSettingProvider>
    </HydrationBoundary>
  )
}
