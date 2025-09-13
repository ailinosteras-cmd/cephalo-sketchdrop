
'use client'
import { useState, useEffect } from 'react'
import FileCard from '@/src/components/file-card'

function InviteForm() {
  const [email,setEmail]=useState('')
  const [msg,setMsg]=useState('')
  const send=async()=>{
    const r=await fetch('/api/admin/send-invite',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
    const d=await r.json()
    if(d.ok){setMsg("Invite sent!");setEmail('')} else setMsg(d.error)
  }
  return <div className="mb-6 p-4 border rounded-lg">
    <h2 className="font-semibold mb-2">Send Invite</h2>
    <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
    <button className="btn mt-2" onClick={send}>Send Invite</button>
    {msg && <p className="text-sm mt-1">{msg}</p>}
  </div>
}
export default function Admin() {
  const [uploads,setUploads]=useState<any[]>([])
  useEffect(()=>{fetch('/api/uploads/list').then(r=>r.json()).then(d=>setUploads(d.uploads))},[])
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin — All uploads</h1>
      <InviteForm/>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {uploads?.map((u:any)=> <FileCard key={u.id} file={u} canDelete />)}
      </div>
    </main>
  )
}
