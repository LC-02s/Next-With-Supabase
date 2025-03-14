'use client'

import { Button, Loader } from '@mantine/core'
import { IconAlertTriangle, IconPhotoSearch, IconReload } from '@tabler/icons-react'
import {
  useImagesQuery,
  useIsDeletePending,
  useIsUpdatePending,
  useIsUploadPending,
} from '@/entities/api'

import { ImageCard } from './image-card'
import { ImageMenu } from './image-menu'

export interface ImageListProps {
  query?: string
}

export const ImageList: React.FC<ImageListProps> = ({ query = '' }) => {
  const { isLoading, isError, data } = useImagesQuery({ query })
  const isEmpty = data && data.length <= 0
  const hasQuery = !!query

  const isUploadPending = useIsUploadPending()
  const isUpdatePending = useIsUpdatePending()
  const isDeletePending = useIsDeletePending()
  const isDisabled = isUploadPending || isUpdatePending || isDeletePending

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
        <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-red-light)] p-4">
          <IconAlertTriangle color="var(--mantine-color-red-light-color)" />
        </div>
        <p className="mb-8 break-keep font-semibold">이미지를 불러오는데 실패했어요</p>
        <Button
          variant="default"
          color="gray"
          radius="md"
          onClick={() => window.location.reload()}
          leftSection={<IconReload className="size-4" />}
        >
          다시시도
        </Button>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-xl bg-gray-50 p-3 dark:bg-dark-600">
        <div className="mx-auto mb-4 rounded-full bg-[var(--mantine-color-gray-light)] p-4">
          <IconPhotoSearch color="var(--mantine-color-gray-light-color)" />
        </div>
        <p className="mb-8 break-keep font-semibold">
          {hasQuery ? `"${query}"로 검색한 결과가 없어요` : '업로드한 이미지가 없어요'}
        </p>
      </div>
    )
  }

  return (
    <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {data?.map((image) => (
        <li key={image.id}>
          <ImageCard
            src={image.path}
            alt={image.name}
            name={image.name}
            lastModified={image.lastModified}
            size={image.size}
            menu={<ImageMenu {...image} disabled={isDisabled} />}
          />
        </li>
      ))}
    </ul>
  )
}
