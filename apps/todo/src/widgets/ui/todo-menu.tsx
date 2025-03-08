'use client'

import { ActionIcon, Menu } from '@mantine/core'
import { IconCheck, IconDots, IconPencil, IconReload, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import { useUpdateTodo } from '@/entities/api'
import { Todo } from '@/entities/model'

import { DeleteTodoDialog } from './delete-todo-dialog'
import { UpdateTitleDialog } from './update-title-dialog'

export type TodoMenuProps = Pick<Todo, 'id' | 'title' | 'completed'>

export const TodoMenu: React.FC<TodoMenuProps> = (props) => {
  const { mutate: updateTodo } = useUpdateTodo({
    ...props,
    completed: !props.completed,
    onSuccess: () =>
      toast.success(props.completed ? '다시 힘내서 해볼까요?' : '축하해요! 할 일을 완료하셨어요!'),
    onException: (exception) => toast.error(exception.message),
    onError: (error) => {
      console.error(error)
      toast.error('예기치 못한 이유로 할 일 상태 변경에 실패했어요')
    },
  })

  return (
    <Menu
      radius="md"
      shadow="md"
      width={200}
      transitionProps={{ transition: 'pop', duration: 200 }}
    >
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" radius="md">
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {props.completed ? (
          <Menu.Item
            classNames={{ itemLabel: 'font-medium' }}
            leftSection={<IconReload className="size-4" />}
            onClick={() => updateTodo()}
          >
            다시하기
          </Menu.Item>
        ) : (
          <Menu.Item
            classNames={{ itemLabel: 'font-medium' }}
            leftSection={<IconCheck className="size-4" />}
            onClick={() => updateTodo()}
          >
            완료
          </Menu.Item>
        )}
        <UpdateTitleDialog {...props}>
          {({ open }) => (
            <Menu.Item
              classNames={{ itemLabel: 'font-medium' }}
              leftSection={<IconPencil className="size-4" />}
              onClick={open}
            >
              제목 수정
            </Menu.Item>
          )}
        </UpdateTitleDialog>

        <Menu.Divider />

        <DeleteTodoDialog id={props.id}>
          {({ open }) => (
            <Menu.Item
              color="red"
              classNames={{ itemLabel: 'font-medium' }}
              leftSection={<IconTrash className="size-4" />}
              onClick={open}
            >
              삭제
            </Menu.Item>
          )}
        </DeleteTodoDialog>
      </Menu.Dropdown>
    </Menu>
  )
}
