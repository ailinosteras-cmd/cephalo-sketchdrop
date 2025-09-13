
'use client'
import { useEffect, useState } from 'react'
export default function VippsReturn() {
  const [state, setState] = useState<'checking'|'ok'|'fail'>('checking')
  useEffect(()=>{ setState('ok') },[])
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1 className="text-2xl font-semibold mb-2">Vipps payment</h1>
        <p>{state==='ok' ? 'Success! Create your password to finish signup.' : 'Payment status unknown.'}</p>
        <a href="/signup" className="btn mt-4">Continue</a>
      </div>
    </main>
  )
}
