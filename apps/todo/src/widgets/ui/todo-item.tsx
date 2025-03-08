import { Badge, Group, Title } from '@mantine/core'
import {
  IconCalendarPlus,
  IconCalendarRepeat,
  IconCalendarCheck,
  IconCircleFilled,
} from '@tabler/icons-react'
import { Todo as TodoItemProps } from '@/entities/model'
import { cn, formatDateFromNow } from '@/shared/lib'

import { TodoMenu } from './todo-menu'

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  createdAt,
  updatedAt,
  completed,
  completedAt,
}) => (
  <div className="rounded-xl bg-gray-50 p-4 dark:bg-dark-600">
    <Group mb="md" justify="space-between" align="flex-start" gap={12}>
      <Title order={2} size={16} className={cn('p-1 break-keep', completed && 'line-through')}>
        {title}
      </Title>
      <TodoMenu id={id} title={title} completed={completed} />
    </Group>
    <Group gap={8}>
      {completed ? (
        <>
          <Badge
            variant="light"
            color="green"
            size="lg"
            leftSection={<IconCircleFilled className="size-2" />}
          >
            완료함
          </Badge>
          <Badge
            variant="light"
            color="gray"
            size="lg"
            leftSection={<IconCalendarCheck className="size-4" />}
          >
            {formatDateFromNow(completedAt)}
          </Badge>
        </>
      ) : (
        <>
          <Badge
            variant="light"
            color="gray"
            size="lg"
            leftSection={<IconCalendarPlus className="size-4" />}
          >
            {formatDateFromNow(createdAt)}
          </Badge>
          {createdAt !== updatedAt && (
            <Badge
              variant="light"
              color="gray"
              size="lg"
              leftSection={<IconCalendarRepeat className="size-4" />}
            >
              {formatDateFromNow(updatedAt)}
            </Badge>
          )}
        </>
      )}
    </Group>
  </div>
)
