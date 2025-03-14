'use client'

import { Menu, ActionIcon } from '@mantine/core'
import { IconDots, IconPencil, IconTrash, IconDownload } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import { DroppedImageFile } from '@/entities/model'
import { Exception } from '@/shared/api'
import { downloadImage } from '@/shared/lib'

import { DeleteImageDialog } from './delete-image-dialog'
import { UpdateNameDialog } from './update-name-dialog'

export interface ImageMenuProps extends Pick<DroppedImageFile, 'id' | 'name' | 'path'> {
  disabled: boolean
}

export const ImageMenu: React.FC<ImageMenuProps> = ({ disabled: isDisabled, ...props }) => (
  <Menu radius="md" shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 200 }}>
    <Menu.Target>
      <ActionIcon variant="subtle" color="gray" radius="md" disabled={isDisabled}>
        <IconDots />
      </ActionIcon>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Item
        classNames={{ itemLabel: 'font-medium' }}
        leftSection={<IconDownload className="size-4" />}
        onClick={() => {
          downloadImage(props.path, props.name).catch((error) => {
            if (error instanceof Exception) toast.error(error.message)
          })
        }}
        disabled={isDisabled}
      >
        다운로드
      </Menu.Item>

      <UpdateNameDialog {...props}>
        {({ open }) => (
          <Menu.Item
            classNames={{ itemLabel: 'font-medium' }}
            leftSection={<IconPencil className="size-4" />}
            onClick={open}
            disabled={isDisabled}
          >
            이름 바꾸기
          </Menu.Item>
        )}
      </UpdateNameDialog>

      <Menu.Divider />

      <DeleteImageDialog {...props}>
        {({ open }) => (
          <Menu.Item
            color="red"
            classNames={{ itemLabel: 'font-medium' }}
            leftSection={<IconTrash className="size-4" />}
            onClick={open}
            disabled={isDisabled}
          >
            삭제
          </Menu.Item>
        )}
      </DeleteImageDialog>
    </Menu.Dropdown>
  </Menu>
)
