'use client'

import { Button, Divider, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import toast from 'react-hot-toast'
import {
  UpdateImageParams as UpdateNameFormProps,
  useUpdateImage,
  useIsUploadPending,
  useIsDeletePending,
} from '@/entities/api'
import { extractExtension } from '@/shared/lib'

const UpdateNameForm: React.FC<UpdateNameFormProps> = ({ id, name }) => {
  const prevExtension = extractExtension(name)
  const form = useForm({
    mode: 'controlled',
    initialValues: { name },
    validate: {
      name: (value) =>
        value.endsWith(`.${prevExtension}`) ? undefined : '유효하지 않은 이름이에요',
    },
  })

  const { mutate: update, isPending } = useUpdateImage({
    id,
    name: form.values.name,
    onSuccess: () => {
      toast.success('이미지 이름 변경에 성공했어요!')
      modals.closeAll()
    },
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 이미지 이름 변경에 실패했어요')
    },
  })

  const isUploadPending = useIsUploadPending()
  const isDeletePending = useIsDeletePending()
  const isDisabled = isUploadPending || isPending || isDeletePending

  return (
    <form
      onSubmit={form.onSubmit(() => {
        update()
      })}
    >
      <TextInput
        key={form.key('name')}
        placeholder="변경할 이름을 입력해주세요"
        type="text"
        autoComplete="off"
        classNames={{ error: 'text-base px-0.5 mt-2' }}
        data-autofocus
        {...form.getInputProps('name')}
      />
      <Divider my="lg" />
      <Group justify="flex-end" gap={8}>
        <Button variant="light" color="gray" onClick={() => modals.closeAll()}>
          취소
        </Button>
        <Button type="submit" disabled={isDisabled}>
          저장하기
        </Button>
      </Group>
    </form>
  )
}

export interface UpdateNameDialogProps extends UpdateNameFormProps {
  children: (props: { open: () => void }) => React.ReactNode
}

export const UpdateNameDialog: React.FC<UpdateNameDialogProps> = ({
  children: Trigger,
  ...props
}) => {
  const open = () =>
    modals.open({
      title: <span className="font-bold">이름 바꾸기</span>,
      children: <UpdateNameForm {...props} />,
      radius: 'md',
      closeOnClickOutside: false,
      centered: true,
    })

  return (
    <>
      <Trigger open={open} />
    </>
  )
}
