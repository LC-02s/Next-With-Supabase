'use client'

import { Group, Text } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  getImages,
  useIsDeletePending,
  useIsUpdatePending,
  useIsUploadPending,
} from '@/entities/api'
import { cn } from '@/shared/lib'

import { useImagePreview } from '../lib'

export const errorMessage: Record<string, string> = {
  'file-too-large': '파일 용량은 최대 5MB를 넘을 수 없어요',
  'file-invalid-type': '올바른 이미지 형식을 업로드 해주세요',
}

export const MAX_MB = 5 * 1024 ** 2

export const ImageDropzone: React.FC = () => {
  const addImage = useImagePreview((store) => store.addImage)

  const isUploadPending = useIsUploadPending()
  const isUpdatePending = useIsUpdatePending()
  const isDeletePending = useIsDeletePending()
  const isDisabled = isUploadPending || isUpdatePending || isDeletePending

  useEffect(() => {
    getImages({})
  }, [])

  return (
    <Dropzone
      onDrop={(files) => {
        files.forEach((file) => {
          addImage(file, () => toast.error('중복되는 이미지는 업로드 할 수 없어요'))
        })
      }}
      onReject={(files) => {
        files.forEach(({ errors }) => {
          errors.forEach(({ code }) => {
            toast.error(errorMessage[code] || '이미지를 가져오는데 실패했어요')
          })
        })
      }}
      maxSize={MAX_MB}
      accept={IMAGE_MIME_TYPE}
      disabled={isDisabled}
      className={cn(
        'rounded-xl border border-solid border-gray-400 dark:border-dark-400',
        !isDisabled && 'cursor-pointer',
      )}
    >
      <Group
        justify="center"
        p="xs"
        gap="sm"
        mih={240}
        style={{ flexDirection: 'column', pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload size={48} color="var(--mantine-color-blue-6)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={48} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={48} color="var(--mantine-color-dimmed)" stroke={1.5} />
        </Dropzone.Idle>

        <div className="break-keep p-2 text-center">
          <Text size="lg" inline className="font-medium leading-tight">
            여기에 이미지를 끌어다 놓거나 클릭해서 업로드해 주세요
          </Text>
          <Text size="sm" c="dimmed" inline mt={8} className="leading-normal">
            한 번에 여러개의 파일을 업로드 할 수 있지만, 파일당 최대 5MB를 넘을 수 없어요
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}
