import { GetImagesParams } from './actions'

export const dropboxQueryKeys = {
  all: ['dropbox-all'] as const,
  list: (params: GetImagesParams) => [...dropboxQueryKeys.all, 'dropbox-list', params] as const,
  upload: () => [...dropboxQueryKeys.all, 'dropbox-upload'] as const,
  update: () => [...dropboxQueryKeys.all, 'dropbox-update'] as const,
  delete: () => [...dropboxQueryKeys.all, 'dropbox-delete'] as const,
} as const
