import { Button } from '@mantine/core'
import { IconMailCheck } from '@tabler/icons-react'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/entities/auth'
import { PATH } from '@/shared/config'
import { createSearchParamsToURL } from '@/shared/lib'

export const metadata: Metadata = {
  title: 'Email Confirmation',
}

const EmailConfirmationPage: React.FC = async () => {
  const [session, header] = await Promise.all([getSession(), headers()])

  const referer = header.get('referer')
  const origin = referer ? new URL(referer).pathname : '/'

  if (session && session.user_metadata.email_verified) {
    redirect(createSearchParamsToURL(origin)(['status', 'already-verified-email']))
  }

  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
      <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
        <IconMailCheck color="var(--mantine-color-gray-light-color)" />
      </div>
      <h1 className="mb-4 break-keep text-center font-semibold">인증 메일을 발송해 드렸어요</h1>
      <p className="mb-9 break-keep text-center">
        이메일에 포함된 인증 버튼을 클릭하여&nbsp;
        <br className="hidden xs:block" />
        인증을 완료해 주세요
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button href={PATH.ROOT} variant="default" component={Link}>
          메인으로
        </Button>
        <Button href={PATH.INITIAL_SETTING} variant="default" component={Link}>
          다음 단계로
        </Button>
      </div>
    </div>
  )
}

export default EmailConfirmationPage
