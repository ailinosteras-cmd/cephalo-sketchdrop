
import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/db'
import { setPassword } from '@/src/lib/auth'
import { setSessionCookie } from '@/src/lib/access'

export async function POST(req: Request) {
  const { email, code, password } = await req.json()
  const invite = await prisma.inviteCode.findFirst({ where: { email, code, consumed: false }})
  if (!invite) return NextResponse.json({ ok:false, error:'Invalid code' }, { status: 400 })
  const user = await prisma.user.upsert({ where: { email }, update: {}, create: { email, role: 'USER' } })
  await setPassword(email, password)
  await prisma.inviteCode.update({ where: { id: invite.id }, data: { consumed: true, consumedAt: new Date(), inviteeId: user.id }})
  setSessionCookie({ userId: user.id, email, role: user.role })
  return NextResponse.json({ ok: true })
}
