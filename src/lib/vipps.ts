
export const vipps = {
  base: process.env.VIPPS_BASE_URL!,
  mSN: process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
  subKey: process.env.VIPPS_SUBSCRIPTION_KEY!,
  clientId: process.env.VIPPS_CLIENT_ID!,
  clientSecret: process.env.VIPPS_CLIENT_SECRET!,
}
export async function vippsAuth() {
  const res = await fetch(`${vipps.base}/accessToken/get`, {
    method: 'POST',
    headers: {
      'client_id': vipps.clientId,
      'client_secret': vipps.clientSecret,
      'Ocp-Apim-Subscription-Key': vipps.subKey,
      'merchant-serial-number': vipps.mSN,
    }
  })
  if (!res.ok) throw new Error('Vipps auth failed')
  return res.json() as Promise<{ token_type: string, expires_in: number, access_token: string }>
}
