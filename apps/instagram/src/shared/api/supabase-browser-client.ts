'use client'

import { createBrowserClient } from '@supabase/ssr'

import { Database } from './supabase-table'

export type SupabaseBrowserClient = ReturnType<typeof createBrowserClient<Database>>

export const createBrowserSupabaseClient = (): SupabaseBrowserClient =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
