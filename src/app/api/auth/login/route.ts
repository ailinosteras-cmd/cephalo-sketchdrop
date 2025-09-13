
import { NextResponse } from 'next/server'
import { login } from '@/src/lib/auth'
import { setSessionCookie } from '@/src/lib/access'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  try {
    const user = await login(email, password)
    setSessionCookie({ userId: user.id, email: user.email, role: user.role })
    return NextResponse.json({ ok: true })
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 401 })
  }
}
