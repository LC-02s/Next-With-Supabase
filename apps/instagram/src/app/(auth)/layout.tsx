const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main
      id="main"
      className="relative mx-auto h-dvh w-full max-w-screen-sm flex-1 p-6"
      style={{ backgroundColor: 'var(--mantine-color-body)' }}
    >
      {children}
    </main>
  )
}

export default AuthLayout
