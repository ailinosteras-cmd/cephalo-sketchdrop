
'use client'
import { useState } from 'react'

export default function Login() {
  const [mode, setMode] = useState<'password'|'invite'>('password')
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <img src="/logo.svg" alt="Logo" className="h-10 mb-4" />
        <div className="tabs">
          <button className={mode==='password'?'tab active':'tab'} onClick={()=>setMode('password')}>Password</button>
          <button className={mode==='invite'?'tab active':'tab'} onClick={()=>setMode('invite')}>Use access code</button>
        </div>
        {mode==='password' ? <PasswordLogin/> : <InviteLogin/>}
        <div className="mt-6 text-sm flex gap-4">
          <a className="link" href="/signup">Pay with Vipps</a>
          <a className="link" href="/forgot">Forgot password?</a>
        </div>
      </div>
    </main>
  )
}
function PasswordLogin() {
  return (
    <form className="space-y-3" onSubmit={async (e:any)=>{e.preventDefault();
      const body = JSON.stringify({ email:e.currentTarget.email.value, password:e.currentTarget.password.value })
      const res = await fetch('/api/auth/login',{method:'POST', headers:{'Content-Type':'application/json'}, body})
      if (res.ok) window.location.href='/'; else alert('Invalid credentials')
    }}>
      <input name="email" type="email" className="input" placeholder="Email" required />
      <input name="password" type="password" className="input" placeholder="Password" required />
      <button className="btn" type="submit">Log in</button>
    </form>
  )
}
function InviteLogin() {
  return (
    <form className="space-y-3" onSubmit={async (e:any)=>{e.preventDefault();
      const body = JSON.stringify({ email:e.currentTarget.email.value, code:e.currentTarget.code.value, password:e.currentTarget.password.value })
      const res = await fetch('/api/auth/invite/consume',{method:'POST', headers:{'Content-Type':'application/json'}, body})
      if (res.ok) window.location.href='/'; else alert('Invalid code')
    }}>
      <input name="email" type="email" className="input" placeholder="Your email" required />
      <input name="code" className="input" placeholder="Access code" required />
      <input name="password" type="password" className="input" placeholder="Create password" required />
      <button className="btn" type="submit">Activate & log in</button>
    </form>
  )
}
