import { IconFolderQuestion } from '@tabler/icons-react'
import { BottomNavigation } from '@/widgets/bottom-navigation'
import { Header } from '@/widgets/header'

const NotFoundPage: React.FC = () => (
  <main
    id="main"
    className="relative mx-auto h-dvh w-full max-w-screen-sm flex-1 pb-16 pt-14"
    style={{ backgroundColor: 'var(--mantine-color-body)' }}
  >
    <Header />
    <div className="h-full overflow-y-auto">
      <div className="m-4 flex flex-col items-center justify-center rounded-xl bg-gray-50 px-4 py-12 dark:bg-dark-600">
        <div className="mx-auto mb-9 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
          <IconFolderQuestion color="var(--mantine-color-gray-light-color)" className="size-7" />
        </div>
        <h2 className="mb-4 break-keep text-xl font-bold">페이지를 찾을 수 없어요</h2>
        <p className="mb-8 break-keep text-center">
          찾으시고자 하는 페이지가 삭제되었거나 이동되었을 수 있어요.&nbsp;
          <br className="hidden sm:block" />
          주소를 한 번 더 확인해 주시고, 동일한 증상이 지속적으로 나타나는 경우 관리자에게 문의해
          주세요.
        </p>
      </div>
    </div>
    <BottomNavigation />
  </main>
)

export default NotFoundPage
