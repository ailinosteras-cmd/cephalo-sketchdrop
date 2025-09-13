
import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/db'
import { setPassword } from '@/src/lib/auth'
import { setSessionCookie } from '@/src/lib/access'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await prisma.user.upsert({
    where: { email },
    update: { isPaid: true },
    create: { email, isPaid: true, role: 'USER' }
  })
  await setPassword(email, password)
  setSessionCookie({ userId: user.id, email, role: user.role })
  return NextResponse.json({ ok: true })
}
