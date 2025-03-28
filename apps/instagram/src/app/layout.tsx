import { Metadata } from 'next'

import { Pretendard } from './assets/font'
import { Provider } from './provider'

import '@next-with-supabase/tailwind-config/reset.css'
import '@mantine/core/styles.css'
import './assets/style/globals.css'

const defaultTitle = 'Next With Supabase: Instagram'

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s - ${defaultTitle}`,
  },
  description: '인프런 워밍업 클럽 3기 풀스택(Next, Supabase) 스터디 미션 프로젝트',
}

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="ko" className={Pretendard.variable} suppressHydrationWarning>
      <body className="relative min-w-[17.5rem] bg-gray-50 dark:bg-dark-800">
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

export default RootLayout
