'use client'

import { Button, Divider, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import toast from 'react-hot-toast'
import { useUpdateTodo } from '@/entities/api'
import { Todo } from '@/entities/model'

import { isValidTitle } from './create-todo-input'

type UpdateTitleFormProps = Pick<Todo, 'id' | 'title' | 'completed'>

const UpdateTitleForm: React.FC<UpdateTitleFormProps> = ({ id, title, completed }) => {
  const form = useForm({
    mode: 'controlled',
    initialValues: { title },
    validate: { title: isValidTitle },
  })

  const { mutate: update } = useUpdateTodo({
    id,
    title: form.values.title,
    completed,
    onSuccess: () => toast.success('할 일 제목 변경에 성공했어요!'),
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 할 일 제목 변경에 실패했어요')
    },
  })

  return (
    <form
      onSubmit={form.onSubmit(() => {
        update()
        modals.closeAll()
      })}
    >
      <TextInput
        key={form.key('title')}
        placeholder="수정할 제목을 입력해주세요"
        type="text"
        autoComplete="off"
        classNames={{ error: 'text-base px-0.5 mt-2' }}
        data-autofocus
        {...form.getInputProps('title')}
      />
      <Divider my="lg" />
      <Group justify="flex-end" gap={8}>
        <Button variant="light" color="gray" onClick={() => modals.closeAll()}>
          취소
        </Button>
        <Button type="submit">저장하기</Button>
      </Group>
    </form>
  )
}

export interface UpdateTitleDialogProps extends UpdateTitleFormProps {
  children: (props: { open: () => void }) => React.ReactNode
}

export const UpdateTitleDialog: React.FC<UpdateTitleDialogProps> = ({
  children: Trigger,
  ...props
}) => {
  const open = () =>
    modals.open({
      title: <span className="font-bold">할 일 수정</span>,
      children: <UpdateTitleForm {...props} />,
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
