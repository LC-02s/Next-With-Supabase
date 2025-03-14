'use client'

import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import toast from 'react-hot-toast'
import {
  useDeleteImage,
  DeleteImageParams,
  useIsUploadPending,
  useIsUpdatePending,
} from '@/entities/api'

export interface DeleteImageDialogProps extends DeleteImageParams {
  children: (props: { open: () => void }) => React.ReactNode
}

export const DeleteImageDialog: React.FC<DeleteImageDialogProps> = ({ id, children: Trigger }) => {
  const { mutate: deleteTodo, isPending } = useDeleteImage({
    id,
    onSuccess: () => toast.success('이미지 삭제에 성공했어요!'),
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 이미지 삭제에 실패했어요')
    },
  })

  const isUploadPending = useIsUploadPending()
  const isUpdatePending = useIsUpdatePending()
  const isDisabled = isUploadPending || isUpdatePending || isPending

  const open = () =>
    modals.openConfirmModal({
      title: <span className="font-bold">이미지 삭제</span>,
      children: (
        <Text size="sm">
          정말 삭제하시겠어요? <br />
          삭제하면 다시는 복구할 수 없어요
        </Text>
      ),
      labels: { confirm: '삭제', cancel: '취소' },
      radius: 'md',
      confirmProps: { color: 'red', disabled: isDisabled },
      groupProps: { gap: 8, mt: 'md' },
      onConfirm: deleteTodo,
    })

  return (
    <>
      <Trigger open={open} />
    </>
  )
}
