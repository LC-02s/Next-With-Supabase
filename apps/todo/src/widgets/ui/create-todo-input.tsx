'use client'

import { TextInput, Kbd } from '@mantine/core'
import { useForm } from '@mantine/form'
import toast from 'react-hot-toast'
import { useCreateTodo } from '@/entities/api'
import { cn, PropsWithClassName } from '@/shared/lib'

export const isValidTitle = (value: string) =>
  !value ? '제목을 입력해주세요' : value.length > 100 ? '제목은 100자 이하로 입력해주세요' : null

export const CreateTodoInput: React.FC<PropsWithClassName> = ({ className }) => {
  const form = useForm({
    mode: 'controlled',
    initialValues: { title: '' },
    validate: { title: isValidTitle },
  })

  const { mutate: create, isPending } = useCreateTodo({
    title: form.values.title,
    onSuccess: () => {
      toast.success('할 일이 생성되었어요!')
      form.setValues({ title: '' })
    },
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 할 일 생성에 실패했어요')
    },
  })

  return (
    <form
      className={cn('relative block min-h-20', className)}
      onSubmit={form.onSubmit(() => create())}
    >
      <TextInput
        key={form.key('title')}
        placeholder="해야 할 일을 추가해주세요"
        type="text"
        autoComplete="off"
        size="md"
        radius="md"
        classNames={{ input: 'pr-16', error: 'text-base px-0.5 mt-2' }}
        disabled={isPending}
        {...form.getInputProps('title')}
      />
      <Kbd className="absolute right-2 top-1.5 h-fit">Enter</Kbd>
    </form>
  )
}
