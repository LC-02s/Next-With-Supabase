import { Metadata } from 'next'
import { Header } from '@/widgets/ui'

import { Pretendard } from './assets/font'
import { Provider } from './provider'

import '@next-with-supabase/tailwind-config/reset.css'
import '@mantine/core/styles.css'
import './assets/style/globals.css'

const defaultTitle = 'Next With Supabase: Netflix'

export const metadata: Metadata = {
  title: {
    template: `%s - ${defaultTitle}`,
    default: defaultTitle,
  },
  description: '인프런 워밍업 클럽 3기 풀스택(Next, Supabase) 스터디 미션 프로젝트',
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="ko" className={Pretendard.variable} suppressHydrationWarning>
    <body className="relative min-h-screen w-full min-w-[17.5rem]">
      <Provider>
        <Header />
        <main id="main" className="relative mx-auto max-w-screen-xl p-6 pt-24">
          {children}
        </main>
      </Provider>
    </body>
  </html>
)

export default RootLayout
