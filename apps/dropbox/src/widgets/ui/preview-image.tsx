import { ActionIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useIsUploadPending } from '@/entities/api'

import { useImagePreview } from '../lib'

import { ImageCard } from './image-card'

export interface PreviewImageProps {
  image: File
}

export const PreviewImage: React.FC<PreviewImageProps> = ({ image }) => {
  const removeImage = useImagePreview((store) => store.removeImage)

  const isPending = useIsUploadPending()
  const isDisabled = isPending

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [previewURL, setPreviewURL] = useState('')

  useEffect(() => {
    const reader = new FileReader()

    reader.readAsDataURL(image)
    reader.addEventListener('loadend', (e) => {
      setIsLoading(false)
      setPreviewURL((e.currentTarget as { result: string } | null)?.result || '')
    })
    reader.addEventListener('error', () => {
      setIsLoading(false)
      setIsError(true)
      toast.error('이미지를 읽어오는데 실패했어요')
    })
  }, [image])

  if (isError) {
    return null
  }

  if (isLoading || !previewURL) {
    return null
  }

  return (
    <ImageCard
      src={previewURL}
      alt={image.name}
      name={image.name}
      lastModified={image.lastModified}
      size={image.size}
      menu={
        <ActionIcon
          variant="light"
          color="red"
          disabled={isDisabled}
          onClick={() => removeImage(image)}
        >
          <IconTrash className="size-4" />
        </ActionIcon>
      }
    />
  )
}
