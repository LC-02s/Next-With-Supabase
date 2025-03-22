'use client'

import { TextInput, Kbd, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { ROOT_PATH } from '@/shared/config'
import { cn, createSearchParamsToURL, PropsWithClassName } from '@/shared/lib'

import { MOVIE_LIST_PARAMS, useMovieListParams } from '../lib'

export const SearchBar: React.FC<PropsWithClassName> = ({ className }) => {
  const { keyword, like } = useMovieListParams()
  const defaultPath = createSearchParamsToURL(ROOT_PATH)([MOVIE_LIST_PARAMS.LIKE, like && 'true'])

  const { push } = useRouter()
  const form = useForm({
    mode: 'controlled',
    initialValues: { query: keyword },
  })

  return (
    <form
      className={cn('relative block', className)}
      onSubmit={form.onSubmit(({ query }) => {
        const targetQuery = query.trim()

        push(
          targetQuery
            ? createSearchParamsToURL(defaultPath)([
                MOVIE_LIST_PARAMS.KEYWORD,
                encodeURI(targetQuery),
              ])
            : defaultPath,
        )
        form.setValues({ query: targetQuery })
      })}
    >
      <TextInput
        key={form.key('query')}
        placeholder="Search Movies"
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
            if (keyword) {
              push(defaultPath)
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
