
'use client'
import { useState } from 'react'
export default function Signup() {
  const [stage, setStage] = useState<'pay'|'password'>('pay')
  const [email, setEmail] = useState('')
  const startVipps = async () => {
    const r = await fetch('/api/vipps/create-payment', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email })})
    const d = await r.json()
    if (!d.ok) return alert('Vipps error')
    window.location.href = d.redirectUrl
  }
  const finish = async (e:any) => {
    e.preventDefault()
    const r = await fetch('/api/auth/signup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password: e.currentTarget.password.value })})
    if (r.ok) window.location.href='/' ; else alert('Failed')
  }
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <img src="/logo.svg" alt="Logo" className="h-10 mb-4" />
        {stage==='pay' ? (
          <>
            <h1 className="auth-title">Annual access — 100 NOK</h1>
            <form onSubmit={(e)=>{e.preventDefault(); setStage('password'); startVipps()}} className="space-y-3">
              <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
              <button className="btn" type="submit">Pay with Vipps</button>
            </form>
          </>
        ):(
          <>
            <h1 className="auth-title">Create password</h1>
            <form className="space-y-3" onSubmit={finish}>
              <input className="input" type="password" name="password" placeholder="Password" required />
              <button className="btn" type="submit">Finish signup</button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
