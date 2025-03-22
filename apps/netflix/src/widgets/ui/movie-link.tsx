import { Rating } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '@/entities/model'
import { ROOT_PATH } from '@/shared/config'
import { formatDateFromNow } from '@/shared/lib'

import { LikeButton } from './like-button'

export type MovieLinkProps = Pick<
  Movie,
  'id' | 'imageURL' | 'title' | 'isLike' | 'releaseDate' | 'voteAverage'
>

export const MovieLink: React.FC<MovieLinkProps> = ({
  id,
  imageURL,
  title,
  isLike,
  releaseDate,
  voteAverage,
}) => (
  <div className="group relative h-auto w-full overflow-hidden rounded-lg bg-[var(--mantine-color-gray-light)]">
    <Link href={`${ROOT_PATH}movies/${id}`} title={`상세 정보 보기: ${title}`}>
      <Image src={imageURL} alt={`썸네일: ${title}`} width={500} height={750} />
    </Link>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-1/4 bg-gradient-to-t from-black to-transparent px-3 pb-4 pt-28 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
      <strong className="block break-keep">{title}</strong>
      <span className="text-sm">{formatDateFromNow(releaseDate)} 개봉</span>
      <div className="flex items-end justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <Rating defaultValue={voteAverage / 2} fractions={2} readOnly />
          <span>{(voteAverage / 2).toFixed(1)}</span>
        </div>
        <LikeButton id={id} isLike={isLike} />
      </div>
    </div>
  </div>
)
