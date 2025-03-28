import { BottomNavigation } from '@/widgets/bottom-navigation'
import { Header } from '@/widgets/header'
import { AuthProvider } from '@/entities/auth'

const StaticLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <main
        id="main"
        className="relative mx-auto h-dvh w-full max-w-screen-sm flex-1 pb-16 pt-14"
        style={{ backgroundColor: 'var(--mantine-color-body)' }}
      >
        <Header />
        <div className="h-full overflow-y-auto p-6">{children}</div>
        <BottomNavigation />
      </main>
    </AuthProvider>
  )
}

export default StaticLayout
