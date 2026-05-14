'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        router.replace(error ? '/' : '/advisor')
      })
    } else {
      router.replace('/')
    }
  }, [router, searchParams])

  return null
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500 text-sm">Signing you in…</p>
      <Suspense>
        <CallbackHandler />
      </Suspense>
    </div>
  )
}
