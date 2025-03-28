'use client'

import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock, IconMail } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { isValidEmail, isValidPassword, useSignUp } from '@/entities/auth'
import { PATH } from '@/shared/config'

export interface RegisterFormProps {
  origin: string
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ origin }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '' },
    validate: { email: isValidEmail, password: isValidPassword },
  })

  const { push } = useRouter()

  const { mutate: register, isPending } = useSignUp({
    origin,
    onSuccess: () => {
      form.setFieldValue('email', '')
      form.setFieldValue('password', '')
      push(PATH.EMAIL_CONFIRMATION)
    },
    onException: (exception) => toast.error(exception.message),
  })

  return (
    <div className="w-full py-12">
      <div className="mb-7 flex items-center justify-center">
        <Link href="/">
          <Image
            src="/images/inflearngram.png"
            alt="infleangram"
            width={520}
            height={121}
            className="h-9 w-auto dark:invert"
            priority
          />
        </Link>
      </div>
      <form
        onSubmit={form.onSubmit(({ email, password }) => {
          register({ email: email.trim(), password: password.trim() })
        })}
      >
        <div className="mb-16 space-y-2">
          <TextInput
            key={form.key('email')}
            autoComplete="off"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...form.getInputProps('email')}
            leftSection={<IconMail className="size-4" />}
          />
          <TextInput
            key={form.key('password')}
            autoComplete="off"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...form.getInputProps('password')}
            leftSection={<IconLock className="size-4" />}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          loaderProps={{ type: 'dots' }}
          variant={isPending ? 'light' : undefined}
          color={isPending ? 'gray' : undefined}
          loading={isPending}
          disabled={isPending}
        >
          회원가입하기
        </Button>
      </form>
      <p className="mt-9 break-keep text-center text-gray-600 dark:text-gray-300">
        이미 회원이신가요?&nbsp;&nbsp;
        <Link href={PATH.LOGIN} className="text-blue-700 underline dark:text-blue-300">
          로그인 하러가기
        </Link>
      </p>
    </div>
  )
}
