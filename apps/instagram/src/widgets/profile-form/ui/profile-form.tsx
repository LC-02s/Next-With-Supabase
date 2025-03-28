'use client'

import { Button, InputLabel, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  isValidDisplayId,
  isValidName,
  isValidProfileImage,
  useCreateProfile,
  UserProfile,
  PreviewImage,
} from '@/entities/profile'
import { createSearchParamsToURL } from '@/shared/lib'

export type ProfileFormProps = Pick<UserProfile, 'userId'>

export const ProfileForm: React.FC<ProfileFormProps> = ({ userId }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { displayId: '', name: '' },
    validate: { displayId: isValidDisplayId, name: isValidName },
  })

  const [file, setFile] = useState<File | null>(null)

  const { mutate: create, isPending } = useCreateProfile({
    userId,
    onSuccess: () => {
      form.setValues({ displayId: '', name: '' })
      setFile(null)
      window.location.replace(createSearchParamsToURL('/')(['status', 'register-success']))
    },
    onException: (exception) => toast.error(exception.message),
  })

  return (
    <div className="w-full py-12">
      <div className="mb-7">
        <h1 className="mb-2 text-lg font-bold">프로필 설정</h1>
        <p className="break-keep">서비스에서 사용할 프로필을 설정해주세요</p>
      </div>
      <form
        onSubmit={form.onSubmit(({ displayId, name }) => {
          if (file) create({ displayId, name, imageFile: file })
        })}
      >
        <div className="mb-16 space-y-4">
          <div>
            <InputLabel className="mb-1" htmlFor={form.key('displayId')} required>
              아이디
            </InputLabel>
            <TextInput
              key={form.key('displayId')}
              autoComplete="off"
              type="text"
              placeholder="사용할 아이디를 입력해주세요"
              leftSection="@"
              {...form.getInputProps('displayId')}
            />
          </div>
          <div>
            <InputLabel className="mb-1" htmlFor={form.key('name')} required>
              이름
            </InputLabel>
            <TextInput
              key={form.key('name')}
              autoComplete="off"
              type="text"
              placeholder="이름을 입력해주세요"
              {...form.getInputProps('name')}
            />
          </div>
          <div>
            <InputLabel className="mb-1" htmlFor={form.key('name')} required>
              프로필 이미지
            </InputLabel>
            <TextInput
              key={form.key('file')}
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
          {file && (
            <div className="relative w-full overflow-hidden rounded-md bg-gray-200 pb-[100%] dark:bg-dark-600">
              <PreviewImage image={file} />
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          loaderProps={{ type: 'dots' }}
          variant={isPending ? 'light' : undefined}
          color={isPending ? 'gray' : undefined}
          loading={isPending}
          disabled={isPending || !file}
        >
          시작하기
        </Button>
      </form>
    </div>
  )
}
