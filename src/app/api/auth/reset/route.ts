
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { setPassword } from "@/src/lib/auth";
export async function POST(req: Request) {
  const { code, password } = await req.json();
  const pr = await prisma.passwordReset.findUnique({ where: { code }});
  if (!pr || pr.used) return NextResponse.json({ ok:false, error:"Invalid" },{status:400});
  await setPassword(pr.email, password);
  await prisma.passwordReset.update({ where:{ id:pr.id }, data:{ used:true }});
  return NextResponse.json({ ok:true });
}
