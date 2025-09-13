
import { NextResponse } from 'next/server'
import { vipps, vippsAuth } from '@/src/lib/vipps'
import { prisma } from '@/src/lib/db'
import crypto from 'crypto'

export async function POST(req: Request) {
  const { email } = await req.json()
  const { access_token } = await vippsAuth()
  const orderId = `SD-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
  await prisma.vippsPayment.create({ data: { orderId, userEmail: email, status: 'INITIATED', amountNOK: 100 } })
  const body = {
    merchantInfo: {
      merchantSerialNumber: vipps.mSN,
      callbackPrefix: `${process.env.APP_URL}/api/vipps/webhook`,
      returnUrl: `${process.env.APP_URL}/vipps/return?orderId=${orderId}`,
      fallBackUrl: `${process.env.APP_URL}/vipps/return?orderId=${orderId}`
    },
    transaction: {
      orderId,
      amount: 10000,
      transactionText: "Cephalo // SketchDrop annual access"
    }
  }
  const res = await fetch(`${vipps.base}/ecomm/v2/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Ocp-Apim-Subscription-Key': vipps.subKey,
      'Content-Type': 'application/json',
      'merchant-serial-number': vipps.mSN,
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    return NextResponse.json({ ok:false, error:'Vipps create failed' }, { status: 400 })
  }
  const data = await res.json()
  return NextResponse.json({ ok:true, redirectUrl: data.url, orderId })
}
