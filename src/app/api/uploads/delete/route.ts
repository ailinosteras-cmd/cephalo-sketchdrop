
import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/db'
import { requireUser } from '@/src/lib/access'

export async function POST(req: Request) {
  const user = requireUser()
  const { id } = await req.json()
  const up = await prisma.upload.findUnique({ where: { id }})
  if (!up) return NextResponse.json({ ok:false, error:'Not found' }, { status: 404 })
  if (user.role !== 'ADMIN' && up.ownerId !== user.userId) {
    return NextResponse.json({ ok:false, error:'Forbidden' }, { status: 403 })
  }
  await prisma.upload.delete({ where: { id }})
  return NextResponse.json({ ok:true })
}
