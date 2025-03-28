'use client'

import { Button, InputLabel, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useSession } from '@/entities/auth'
import {
  isValidDisplayId,
  isValidName,
  useProfileQuery,
  UserProfile,
  useUpdateProfile,
} from '@/entities/profile'
import { PATH } from '@/shared/config'

interface ModifyProfileFormInnerProps extends Pick<UserProfile, 'userId'> {
  initialValues: { displayId: string; name: string }
}

const ModifyProfileFormInner: React.FC<ModifyProfileFormInnerProps> = ({
  userId,
  initialValues,
}) => {
  const form = useForm({
    mode: 'controlled',
    initialValues,
    validate: { displayId: isValidDisplayId, name: isValidName },
  })

  const isIdle =
    initialValues.displayId === form.values.displayId && initialValues.name === form.values.name

  const { push } = useRouter()

  const { mutate: update, isPending } = useUpdateProfile({
    userId,
    onSuccess: () => {
      form.setValues({ displayId: '', name: '' })
      toast.success('프로필이 수정되었어요!')
      push(PATH.MY_PROFILE)
    },
    onException: (exception) => toast.error(exception.message),
    onError: () => toast.error('예기치 못한 이유로 프로필 수정에 실패했어요'),
  })

  return (
    <div className="w-full px-5 py-8">
      <div className="mb-7">
        <h1 className="mb-2 text-lg font-bold">프로필 편집</h1>
      </div>
      <form
        onSubmit={form.onSubmit(({ displayId, name }) => {
          update({ displayId, name })
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
        </div>
        <Button
          type="submit"
          className="w-full"
          loaderProps={{ type: 'dots' }}
          variant={isPending ? 'light' : undefined}
          color={isPending ? 'gray' : undefined}
          loading={isPending}
          disabled={isIdle || isPending}
        >
          저장하기
        </Button>
      </form>
    </div>
  )
}

export const ModifyProfileForm: React.FC = () => {
  const { data: session } = useSession()
  const { data: profile } = useProfileQuery({ userId: session?.id })

  if (!profile) {
    return null
  }

  return (
    <ModifyProfileFormInner
      userId={profile.userId}
      initialValues={{ displayId: profile.displayId, name: profile.name }}
    />
  )
}
