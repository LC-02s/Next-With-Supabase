'use client'

import { Button, Group, InputLabel, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  useUpdateProfileImage,
  UpdateProfileImageParams,
  isValidProfileImage,
  UserProfile,
  PreviewImage,
} from '@/entities/profile'

type ModifyProfileImageFormProps = Pick<UpdateProfileImageParams, 'userId'> &
  Pick<UserProfile, 'imageURL'>

const ModifyProfileImageForm: React.FC<ModifyProfileImageFormProps> = ({ userId, imageURL }) => {
  const [file, setFile] = useState<File | null>(null)

  const { mutate: update, isPending } = useUpdateProfileImage({
    userId,
    onSuccess: () => {
      toast.success('프로필 이미지가 변경되었어요!')
      modals.closeAll()
      setTimeout(() => window.location.reload(), 200)
    },
    onException: (error) => toast.error(error.message),
    onError: () => toast.error('예기치 못한 이유로 프로필 이미지 변경에 실패했어요'),
  })

  return (
    <>
      <div className="mb-3">
        <InputLabel className="mb-1" required>
          프로필 이미지
        </InputLabel>
        <TextInput
          autoComplete="off"
          type="file"
          classNames={{
            input:
              'file:mr-2 file:cursor-pointer pl-1.5 file:rounded file:border-none file:bg-[var(--mantine-color-gray-light)] file:px-3 file:py-0.5 file:text-sm file:font-normal file:text-[var(--mantine-color-gray-text)] file:outline-none',
          }}
          onChange={(e) => {
            const target = e.target as HTMLInputElement
            const file = target.files?.[0]

            const result = isValidProfileImage(file)

            if (typeof result === 'string') {
              toast.error(result)
              setFile(null)
              target.value = ''
              return
            }

            setFile(result)
          }}
        />
      </div>
      <div className="relative w-full overflow-hidden rounded-md bg-gray-200 pb-[100%] dark:bg-dark-600">
        {!file ? (
          <Image src={imageURL} alt="미리보기" className="object-cover" fill />
        ) : (
          <PreviewImage image={file} />
        )}
      </div>
      <Group justify="end" mt="lg">
        <Button variant="light" color="gray" onClick={() => modals.closeAll()}>
          취소
        </Button>
        <Button
          onClick={() => {
            if (file) update({ imageFile: file })
          }}
          disabled={!file || isPending}
        >
          변경하기
        </Button>
      </Group>
    </>
  )
}

export interface ModifyProfileImageDialogProps extends ModifyProfileImageFormProps {
  children: (props: { open: () => void }) => React.ReactNode
}

export const ModifyProfileImageDialog: React.FC<ModifyProfileImageDialogProps> = ({
  children: Trigger,
  ...props
}) => {
  const open = () =>
    modals.open({
      title: <span className="break-keep font-bold">프로필 이미지 변경</span>,
      size: 'sm',
      radius: 'md',
      centered: true,
      withCloseButton: false,
      closeOnClickOutside: false,
      children: <ModifyProfileImageForm {...props} />,
    })

  return <Trigger open={open} />
}
