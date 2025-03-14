import { saveAs } from 'file-saver'

import { Exception } from '../api'

export const downloadImage = async (src: string, name: string) => {
  const response = await fetch(src)
  const file = await response.blob()

  if (!response.ok) {
    throw new Exception('이미지를 불러오는데 실패했어요')
  }

  saveAs(file, name)
}
