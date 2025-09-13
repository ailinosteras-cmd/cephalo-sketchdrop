
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import crypto from "crypto";
import { sendEmail } from "@/src/lib/email";
export async function POST(req: Request) {
  const { email } = await req.json();
  const code = crypto.randomBytes(8).toString("hex");
  await prisma.passwordReset.create({ data: { email, code } });
  await sendEmail({
    to: email,
    subject: "Reset your password",
    text: `Reset link: ${process.env.APP_URL}/reset?code=${code}`
  });
  return NextResponse.json({ ok:true });
}
