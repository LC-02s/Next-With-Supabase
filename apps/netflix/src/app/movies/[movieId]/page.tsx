import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MovieDetail } from '@/widgets/ui'
import { getMovie, prefetchMovieQuery } from '@/entities/api'

interface MovieDetailPageParams {
  params: Promise<{ movieId: string }>
}

export const generateMetadata = async ({ params }: MovieDetailPageParams): Promise<Metadata> => {
  const { movieId } = await params
  const targetId = Number(movieId)

  if (Number.isNaN(targetId)) {
    return {}
  }

  try {
    const movie = await getMovie({ id: targetId })

    return {
      title: movie.title,
      description: movie.overview,
    }
  } catch {
    return {}
  }
}

const MovieDetailPage: React.FC<MovieDetailPageParams> = async ({ params }) => {
  const { movieId } = await params
  const targetId = Number(movieId)

  if (Number.isNaN(targetId)) {
    notFound()
  }

  const queryClient = await prefetchMovieQuery({ id: targetId })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieDetail id={targetId} />
    </HydrationBoundary>
  )
}

export default MovieDetailPage
