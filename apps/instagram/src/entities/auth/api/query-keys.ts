export const authQueryKeys = {
  all: ['auth-all'] as const,
  session: () => [...authQueryKeys.all, 'session'],
} as const
