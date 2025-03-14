'use client'

import { TextInput, Kbd, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { ROOT_PATH } from '@/shared/config'
import { cn, PropsWithClassName } from '@/shared/lib'

export interface SearchFileInputProps extends PropsWithClassName {
  defaultQuery?: string
}

export const SearchFileInput: React.FC<SearchFileInputProps> = ({
  defaultQuery = '',
  className,
}) => {
  const { push } = useRouter()
  const form = useForm({
    mode: 'controlled',
    initialValues: { query: defaultQuery },
  })

  return (
    <form
      className={cn('relative block', className)}
      onSubmit={form.onSubmit(({ query }) => {
        const targetQuery = query.trim()

        push(targetQuery ? `${ROOT_PATH}?q=${encodeURI(targetQuery)}` : ROOT_PATH)
        form.setValues({ query: targetQuery })
      })}
    >
      <TextInput
        key={form.key('query')}
        placeholder="찾으시는 파일이 있으신가요?"
        type="search"
        autoComplete="off"
        size="md"
        radius="md"
        classNames={{ input: 'pr-24', error: 'text-base px-0.5 mt-2' }}
        leftSection={<IconSearch className="size-5" />}
        {...form.getInputProps('query')}
      />
      {form.values.query && (
        <ActionIcon
          variant="subtle"
          color="gray"
          className="absolute inset-y-0 right-16 my-auto h-fit"
          onClick={() => {
            if (defaultQuery) {
              push('/')
            }

            form.setValues({ query: '' })
          }}
        >
          <IconX className="size-4" />
        </ActionIcon>
      )}
      <Kbd className="absolute inset-y-0 right-2 my-auto h-fit">Enter</Kbd>
    </form>
  )
}
