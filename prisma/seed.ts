
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
const prisma = new PrismaClient()
async function main(){
  const email = process.env.ADMIN_EMAIL!
  const pass  = process.env.ADMIN_PASSWORD!
  const passwordHash = await hash(pass)
  await prisma.user.upsert({
    where:{ email },
    update:{ role:'ADMIN', passwordHash },
    create:{ email, role:'ADMIN', passwordHash }
  })
  console.log('Seeded admin', email)
}
main().finally(()=>prisma.$disconnect())
