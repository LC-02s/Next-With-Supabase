'use client'

import { Button } from '@mantine/core'
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react'
import { BottomNavigation } from '@/widgets/bottom-navigation'
import { Header } from '@/widgets/header'

const CommonErrorPage: React.FC = () => (
  <main
    id="main"
    className="relative mx-auto h-dvh w-full max-w-screen-sm flex-1 pb-16 pt-14"
    style={{ backgroundColor: 'var(--mantine-color-body)' }}
  >
    <Header />
    <div className="h-full overflow-y-auto">
      <div className="m-4 flex flex-col items-center justify-center rounded-xl bg-gray-50 px-4 py-12 dark:bg-dark-600">
        <div className="mx-auto mb-9 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
          <IconAlertTriangle color="var(--mantine-color-gray-light-color)" className="size-7" />
        </div>
        <h2 className="mb-4 break-keep text-lg font-bold">이용에 불편을 드려 죄송해요</h2>
        <p className="mb-8 break-keep text-center">
          다시시도해도 동일한 증상이 발생한다면
          <br className="hidden sm:block" /> 관리자에게 문의해주세요.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="default" onClick={() => window.history.back()}>
            뒤로가기
          </Button>
          <Button
            variant="default"
            leftSection={<IconRefresh className="size-4" />}
            onClick={() => window.location.reload()}
          >
            다시시도
          </Button>
        </div>
      </div>
    </div>
    <BottomNavigation />
  </main>
)

export default CommonErrorPage
