'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface PreviewImageProps {
  image: File
}

export const PreviewImage: React.FC<PreviewImageProps> = ({ image }) => {
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

  if (isLoading || !previewURL || isError) {
    return null
  }

  return <Image src={previewURL} alt={image.name} fill />
}
