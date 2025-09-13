
import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/db'
import { getSession } from '@/src/lib/access'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')?.trim() || ''
  const tag = url.searchParams.get('tag')?.trim() || ''
  const owner = url.searchParams.get('owner')?.trim() || ''
  const where:any = {}
  if (q) where.OR = [{ name: { contains: q, mode:'insensitive' }}, { tags: { has: q }}]
  if (tag) where.tags = { has: tag }
  if (owner === 'me') {
    const s = getSession(); if (!s) return NextResponse.json({ uploads: [] })
    where.ownerId = s.userId
  }
  const uploads = await prisma.upload.findMany({ where, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ uploads })
}
