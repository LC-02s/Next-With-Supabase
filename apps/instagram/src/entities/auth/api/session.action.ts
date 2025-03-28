'use server'

import { createServerSupabaseClient, SupabaseServerClient } from '@/shared/api'

export type Session = NonNullable<
  Awaited<ReturnType<SupabaseServerClient['auth']['getUser']>>['data']['user']
>

export const getSession = async (): Promise<Session | null> => {
  const client = await createServerSupabaseClient()
  const {
    data: { user },
    error,
  } = await client.auth.getUser()

  if (error) {
    return null
  }

  return user
}
