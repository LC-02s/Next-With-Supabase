import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { PreviewConfirm, ImageDropzone, SearchFileInput, ImageList } from '@/widgets/ui'
import { dropboxQueryKeys, getImages } from '@/entities/api'
import { Exception } from '@/shared/api'
interface MainPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const MainPage: React.FC<MainPageProps> = async ({ searchParams }) => {
  const { q = '' } = await searchParams
  const validQuery = Array.isArray(q) ? (q[q.length - 1] ?? '') : q

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: dropboxQueryKeys.list({ query: validQuery }),
    queryFn: () =>
      getImages({ query: validQuery }).catch((error) => {
        throw new Exception(error.message)
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-12 space-y-8">
        <ImageDropzone />
        <PreviewConfirm />
      </div>
      <div className="space-y-6">
        <SearchFileInput defaultQuery={validQuery} />
        <ImageList query={validQuery} />
      </div>
    </HydrationBoundary>
  )
}

export default MainPage
