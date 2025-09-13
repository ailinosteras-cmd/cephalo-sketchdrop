
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const sp = useSearchParams()
  const [q, setQ] = useState(sp.get('q') || '')
  useEffect(()=> setQ(sp.get('q') || ''), [sp])
  return (
    <form className="flex gap-2" onSubmit={e=>{e.preventDefault(); router.push(`/?q=${encodeURIComponent(q)}`)}}>
      <input className="input" placeholder="Search by keyword or tag…" value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn" type="submit">Search</button>
    </form>
  )
}
