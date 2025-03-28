'use client'

import { TextInput, Kbd, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/config'
import { cn, createSearchParamsToURL, PropsWithClassName } from '@/shared/lib'

export const SearchBar: React.FC<PropsWithClassName> = ({ className }) => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('q') || ''

  const form = useForm({
    mode: 'controlled',
    initialValues: { keyword },
  })

  const { push } = useRouter()

  return (
    <form
      className={cn('relative block', className)}
      onSubmit={form.onSubmit(({ keyword }) => {
        const targetQuery = keyword.trim()

        push(createSearchParamsToURL(PATH.SEARCH)(['q', encodeURI(targetQuery)]))
        form.setValues({ keyword: targetQuery })
      })}
    >
      <TextInput
        key={form.key('keyword')}
        placeholder="Search Profile"
        type="search"
        autoComplete="off"
        size="md"
        radius="md"
        classNames={{ input: 'pr-24', error: 'text-base px-0.5 mt-2' }}
        leftSection={<IconSearch className="size-5" />}
        {...form.getInputProps('keyword')}
      />
      {form.values.keyword && (
        <ActionIcon
          variant="subtle"
          color="gray"
          className="absolute inset-y-0 right-16 my-auto h-fit"
          onClick={() => {
            if (form.values.keyword) {
              push(PATH.SEARCH)
            }

            form.setValues({ keyword: '' })
          }}
        >
          <IconX className="size-4" />
        </ActionIcon>
      )}
      <Kbd className="absolute inset-y-0 right-2 my-auto h-fit">Enter</Kbd>
    </form>
  )
}
