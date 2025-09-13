
import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/access";
import { prisma } from "@/src/lib/db";
import crypto from "crypto";
import { sendEmail } from "@/src/lib/email";

export async function POST(req: Request) {
  const admin = requireAdmin();
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok:false, error:"Missing email" },{status:400});
  const code = crypto.randomBytes(4).toString("hex").toUpperCase();
  const invite = await prisma.inviteCode.create({ data:{ email, code, createdById: admin.userId }});
  await sendEmail({
    to: email,
    subject: "Cephalo // SketchDrop invite",
    text: `You’ve been invited! Code: ${invite.code}\n\nLogin: ${process.env.APP_URL}/login`
  });
  return NextResponse.json({ ok:true });
}
