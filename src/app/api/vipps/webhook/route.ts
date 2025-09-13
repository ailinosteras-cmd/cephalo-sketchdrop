
import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/db'

export async function POST(req: Request) {
  const payload = await req.json()
  const orderId = payload?.orderId || payload?.transaction?.orderId
  const status = payload?.transactionInfo?.status || payload?.status
  if (!orderId) return NextResponse.json({ ok:false }, { status: 400 })
  await prisma.vippsPayment.update({ where: { orderId }, data: { status }})
  if (status === 'CAPTURED') {
    const pay = await prisma.vippsPayment.findUnique({ where: { orderId }})
    if (pay?.userEmail) {
      await prisma.user.upsert({
        where: { email: pay.userEmail },
        update: { isPaid: true },
        create: { email: pay.userEmail, isPaid: true, role: 'USER' }
      })
    }
  }
  return NextResponse.json({ ok:true })
}
