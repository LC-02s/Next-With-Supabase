import Image from 'next/image'

import { UserProfile } from '../model'

export type ProfileCardProps = Pick<UserProfile, 'displayId' | 'name' | 'imageURL'>

export const ProfileCard: React.FC<ProfileCardProps> = ({ displayId, name, imageURL }) => (
  <div className="flex items-center space-x-4">
    <div className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-solid border-gray-300 bg-gray-200 dark:border-dark-600 dark:bg-dark-600">
      <Image
        src={imageURL}
        alt={`${name} 프로필`}
        width={160}
        height={160}
        className="size-full object-cover"
      />
    </div>
    <div className="text-left">
      <p className="mb-1.5 text-sm font-medium text-blue-700 dark:text-blue-300">@{displayId}</p>
      <p className="pb-1 font-semibold">{name}</p>
    </div>
  </div>
)
