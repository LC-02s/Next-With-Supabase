'use client'

import { useQuery } from '@tanstack/react-query'
import { Exception } from '@/shared/api'

import { getImages, GetImagesParams } from './actions'
import { dropboxQueryKeys } from './query-keys'

export const useImagesQuery = ({ query }: GetImagesParams) =>
  useQuery({
    queryKey: dropboxQueryKeys.list({ query }),
    queryFn: () =>
      getImages({ query }).catch((error) => {
        throw new Exception(error.message)
      }),
  })
