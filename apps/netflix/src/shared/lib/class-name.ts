import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type PropsWithClassName<P = unknown> = P & { className?: string | undefined }

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
