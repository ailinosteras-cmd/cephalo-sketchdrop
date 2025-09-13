
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  useEffect(()=>{ fetch('/api/auth/me').then(r=>r.json()).then(d=>setUser(d.user)) },[])
  return (
    <header className="border-b bg-white">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Cephalo // SketchDrop" width={36} height={36}/>
          <span className="font-semibold">Cephalo // SketchDrop</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/">Library</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/my-uploads">My uploads</Link>
          {user?.role === 'ADMIN' && <Link href="/admin">Admin</Link>}
          {!user && <Link href="/login">Login</Link>}
        </nav>
      </div>
    </header>
  )
}
