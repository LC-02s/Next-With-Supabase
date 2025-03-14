import { create } from 'zustand'

export interface ImagePreviewStore {
  images: File[]
  addImage: (file: File, onException?: () => void) => void
  removeImage: (target: Pick<File, 'name'>) => void
  reset: () => void
}

export const useImagePreview = create<ImagePreviewStore>((set) => ({
  images: [],
  addImage: (file: File, onException) =>
    set((prev) => {
      if (prev.images.some(({ name }) => name === file.name)) {
        onException?.()

        return prev
      }

      return { images: [...prev.images, file] }
    }),
  removeImage: (target: Pick<File, 'name'>) =>
    set((prev) => ({ images: prev.images.filter((file) => file.name !== target.name) })),
  reset: () => set({ images: [] }),
}))
