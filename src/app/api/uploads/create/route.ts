
import { NextResponse } from 'next/server'
import { requireUser } from '@/src/lib/access'
import { prisma } from '@/src/lib/db'
import { putFile } from '@/src/lib/storage'
import { randomUUID } from 'crypto'
import sharp from 'sharp'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const user = requireUser()
  const form = await req.formData()
  const file = form.get('file') as File
  const name = (form.get('name') as string)?.trim()
  const tags = ((form.get('tags') as string) || '').split(',').map(t=>t.trim()).filter(Boolean)
  const legal = (form.get('legal') as string) === 'true'
  if (!file || !name || !legal) return NextResponse.json({ ok:false, error:'Missing fields' }, { status: 400 })

  const buf = Buffer.from(await file.arrayBuffer())
  const extGuess = file.name.split('.').pop()?.toLowerCase() || 'bin'
  const key = `${user.userId}/${randomUUID()}.${extGuess}`
  const fileUrl = await putFile(key, buf, file.type || 'application/octet-stream')

  let thumbUrl: string | undefined
  try {
    if ((file.type || '').startsWith('image/')) {
      const thumb = await sharp(buf).resize(600).jpeg({ quality: 80 }).toBuffer()
      const tkey = `${user.userId}/thumbs/${randomUUID()}.jpg`
      thumbUrl = await putFile(tkey, thumb, 'image/jpeg')
    }
  } catch {}

  const up = await prisma.upload.create({
    data: { ownerId: user.userId, name, tags, fileUrl, thumbUrl, mimeType: file.type || 'application/octet-stream', sizeBytes: buf.length, legalAck: legal }
  })
  return NextResponse.json({ ok: true, upload: up })
}
