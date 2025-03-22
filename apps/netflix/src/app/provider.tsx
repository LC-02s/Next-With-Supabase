'use client'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { defaultThemeSchema } from '@next-with-supabase/tailwind-config/base'
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

let browserQueryClient: QueryClient | undefined = undefined

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 5 },
    },
  })

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <QueryProvider>
    <MantineProvider theme={defaultThemeSchema} defaultColorScheme="auto">
      <ColorSchemeScript defaultColorScheme="auto" />
      <ModalsProvider labels={{ confirm: '확인', cancel: '취소' }}>
        {children}
        <Toaster position="bottom-right" />
      </ModalsProvider>
    </MantineProvider>
  </QueryProvider>
)
