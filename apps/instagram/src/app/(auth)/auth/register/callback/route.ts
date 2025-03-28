import { NextRequest, NextResponse } from 'next/server'
import { confirmRegister } from '@/entities/auth'
import { createSearchParamsToURL } from '@/shared/lib'

export const GET = async (request: NextRequest) => {
  const { origin, searchParams } = request.nextUrl
  const code = searchParams.get('code')

  const to = createSearchParamsToURL(origin)

  if (!code) {
    return NextResponse.redirect(to(['status', 'register-invalid-code']))
  }

  const {
    data: { user },
    error,
  } = await confirmRegister(code)

  if (error) {
    return NextResponse.redirect(to(['status', 'register-failed']))
  }

  if (!user) {
    return NextResponse.redirect(to(['status', 'register-invalid-user']))
  }

  return NextResponse.redirect(to(['status', 'register-success']))
}
