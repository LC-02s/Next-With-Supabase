'use server'

import { createServerSupabaseClient, SupabaseServerClient } from '@/shared/api'

export type AuthTokenResponse = Awaited<
  ReturnType<SupabaseServerClient['auth']['exchangeCodeForSession']>
>

export const confirmRegister = async (code: string): Promise<AuthTokenResponse> => {
  const client = await createServerSupabaseClient()

  return await client.auth.exchangeCodeForSession(code)
}

export const cancelRegister = async (id: string) => {
  const client = await createServerSupabaseClient({ role: 'admin' })
  const { error } = await client.auth.admin.deleteUser(id)

  if (error) {
    throw new Error('회원가입 취소에 실패했어요')
  }
}
