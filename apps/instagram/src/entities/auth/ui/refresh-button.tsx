'use client'

import { Button } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'

export const RefreshButton: React.FC = () => {
  return (
    <Button
      variant="default"
      leftSection={<IconRefresh className="size-5" />}
      onClick={() => window.location.reload()}
    >
      새로고침
    </Button>
  )
}
