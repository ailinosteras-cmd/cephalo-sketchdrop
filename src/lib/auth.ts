
import { prisma } from './db'
import { verify, hash } from 'argon2'

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.passwordHash) throw new Error('Invalid credentials')
  const ok = await verify(user.passwordHash, password)
  if (!ok) throw new Error('Invalid credentials')
  return user
}
export async function setPassword(email: string, password: string) {
  const passwordHash = await hash(password)
  return prisma.user.upsert({
    where:{ email },
    update:{ passwordHash },
    create:{ email, passwordHash, role:'USER' }
  })
}
