
'use client'
import { useState } from 'react'
export default function Forgot() {
  const [email,setEmail] = useState('')
  const [msg,setMsg] = useState('')
  const send = async ()=>{
    const r = await fetch('/api/auth/forgot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
    if(r.ok) setMsg("Check your email!") 
  }
  return <main className="auth-shell">
    <div className="auth-card">
      <h1 className="auth-title">Forgot Password</h1>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <button className="btn mt-2" onClick={send}>Send reset link</button>
      {msg && <p>{msg}</p>}
    </div>
  </main>
}
