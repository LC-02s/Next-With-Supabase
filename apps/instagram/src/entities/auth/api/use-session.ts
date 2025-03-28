import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { authQueryKeys } from './query-keys'
import { getSession, Session } from './session.action'

export const useSession = (): UseQueryResult<Session | null, Error> =>
  useQuery<Session | null, Error>({
    queryKey: authQueryKeys.session(),
    queryFn: getSession,
  })
