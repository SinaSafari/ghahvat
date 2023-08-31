import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: +params.userId },
      include: { profile: true },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
