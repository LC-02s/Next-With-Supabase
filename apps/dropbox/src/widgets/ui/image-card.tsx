'use client'

import { Badge, Group } from '@mantine/core'
import { IconCalendarRepeat, IconPhoto } from '@tabler/icons-react'
import Image from 'next/image'
import { formatDateFromNow, formatSizeToMB } from '@/shared/lib'

export interface ImageCardProps {
  src: string
  alt: string
  name: string
  lastModified?: string | number
  size?: number
  menu?: React.ReactNode
}

export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  name,
  lastModified,
  size,
  menu,
}) => {
  return (
    <div className="rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
      <Group mb="xs" justify="space-between" align="center" wrap="nowrap">
        <Group gap={8} wrap="nowrap" w="calc(100% - 2.5rem)">
          <IconPhoto className="size-4" />
          <strong className="block w-full flex-1 truncate font-medium">{name}</strong>
        </Group>
        {menu}
      </Group>
      <div
        className="relative overflow-hidden rounded bg-gray-200 dark:bg-dark-400"
        style={{ paddingBottom: '56.25%' }}
      >
        <Image src={src} alt={alt} className="object-cover" fill />
      </div>
      <Group mt="sm" gap={8}>
        {!!lastModified && (
          <Badge
            variant="light"
            color="gray"
            radius="sm"
            size="lg"
            leftSection={<IconCalendarRepeat className="size-4" />}
          >
            {formatDateFromNow(lastModified)}
          </Badge>
        )}
        {!!size && (
          <Badge variant="light" color="gray" radius="sm" size="lg">
            {formatSizeToMB(size).toFixed(2)}MB
          </Badge>
        )}
      </Group>
    </div>
  )
}
