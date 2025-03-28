import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/shared/api'
import { createSearchParamsToURL } from '@/shared/lib'

export const GET = async (request: NextRequest) => {
  const { origin } = request.nextUrl

  const client = await createServerSupabaseClient()
  const { error } = await client.auth.signOut()

  if (error) {
    return NextResponse.redirect(createSearchParamsToURL(origin)(['status', 'logout-failed']))
  }

  const cookieStore = await cookies()
  const allCookie = cookieStore.getAll()

  allCookie.forEach(({ name }) => {
    cookieStore.delete(name)
  })

  return NextResponse.redirect(createSearchParamsToURL(origin)(['status', 'logout-success']))
}
