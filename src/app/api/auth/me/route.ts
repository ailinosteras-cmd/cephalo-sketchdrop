
import { NextResponse } from 'next/server'
import { getSession } from '@/src/lib/access'
import { prisma } from '@/src/lib/db'
export async function GET() {
  const s = getSession()
  if (!s) return NextResponse.json({ user: null })
  const user = await prisma.user.findUnique({ where: { id: s.userId }})
  return NextResponse.json({ user })
}
