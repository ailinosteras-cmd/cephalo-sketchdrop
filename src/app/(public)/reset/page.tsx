
'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
export default function Reset() {
  const sp=useSearchParams()
  const code=sp.get('code')
  const [pw,setPw]=useState('')
  const [msg,setMsg]=useState('')
  const reset=async()=>{
    const r=await fetch('/api/auth/reset',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code,password:pw})})
    if(r.ok) setMsg("Password changed. Go login!") 
  }
  return <main className="auth-shell">
    <div className="auth-card">
      <h1 className="auth-title">Reset Password</h1>
      <input type="password" className="input" value={pw} onChange={e=>setPw(e.target.value)} placeholder="New password" />
      <button className="btn mt-2" onClick={reset}>Reset</button>
      {msg && <p>{msg}</p>}
    </div>
  </main>
}
