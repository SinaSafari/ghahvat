import { verifiedToken } from "@/server/auth/getToken";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const tokenData = verifiedToken(request.headers);
    if (!tokenData) {
      return NextResponse.json({ message: "invalid token" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: tokenData.uid },
      select: { phone: true, email: true, role: true },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
