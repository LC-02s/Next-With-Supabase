import Image from 'next/image'
import Link from 'next/link'
import { PATH } from '@/shared/config'

export const MainLogo: React.FC = () => (
  <Link href={PATH.ROOT}>
    <Image
      src="/images/inflearngram.png"
      alt="infleangram"
      width={520}
      height={121}
      className="h-7 w-auto dark:invert"
      priority
    />
  </Link>
)
