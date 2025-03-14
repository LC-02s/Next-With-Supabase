'use client'

import { Button, Group, Loader, Title } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import { useIsDeletePending, useIsUpdatePending, useUploadImages } from '@/entities/api'

import { useImagePreview } from '../lib'

import { MAX_MB } from './image-dropzone'
import { PreviewImage } from './preview-image'

export const PreviewConfirm: React.FC = () => {
  const images = useImagePreview((store) => store.images)
  const totalSize = images.reduce((total, image) => total + image.size, 0)
  const overload = totalSize > MAX_MB

  const reset = useImagePreview((store) => store.reset)

  const { mutate: upload, isPending } = useUploadImages({
    files: images,
    onSuccess: () => {
      toast.success('이미지 업로드에 성공했어요!')
      reset()
    },
    onError: () => {
      toast.error('이미지 업로드에 실패했어요')
    },
  })

  const isUpdatePending = useIsUpdatePending()
  const isDeletePending = useIsDeletePending()
  const isDisabled = isPending || isUpdatePending || isDeletePending

  if (images.length <= 0) {
    return null
  }

  return (
    <div>
      <Group mb="md" justify="space-between">
        <Title size={18} order={1} pl="xs">
          이미지 미리보기
        </Title>
        <Button
          color="indigo"
          radius="md"
          onClick={() => {
            if (overload) {
              toast.error('한 번에 최대 5MB까지 업로드할 수 있어요')
              return
            }

            upload()
          }}
          disabled={isDisabled}
          leftSection={
            isPending ? (
              <Loader size="xs" color="gray" />
            ) : (
              <IconUpload className="size-[1.125rem]" />
            )
          }
        >
          업로드
        </Button>
      </Group>
      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {images.map((image) => (
          <li key={image.name}>
            <PreviewImage image={image} />
          </li>
        ))}
      </ul>
    </div>
  )
}
