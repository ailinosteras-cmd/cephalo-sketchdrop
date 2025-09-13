
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export type Session = { userId:string; email:string; role:'USER'|'ADMIN' }
const AUTH_SECRET = process.env.AUTH_SECRET!

export function setSessionCookie(session: Session){
  const token = jwt.sign(session, AUTH_SECRET, { expiresIn: '30d' })
  cookies().set('sd_session', token, { httpOnly:true, sameSite:'lax', secure:true, path:'/' })
}
export function clearSessionCookie(){ cookies().delete('sd_session') }
export function getSession(): Session | null {
  const token = cookies().get('sd_session')?.value
  if (!token) return null
  try { return jwt.verify(token, AUTH_SECRET) as Session } catch { return null }
}
export function requireUser(){ const s = getSession(); if(!s) throw new Error('Unauthorized'); return s }
export function requireAdmin(){ const s=requireUser(); if(s.role!=='ADMIN') throw new Error('Forbidden'); return s }
