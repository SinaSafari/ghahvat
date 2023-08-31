import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    if (!phone) {
      return NextResponse.json(
        { message: "phone is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });
    return NextResponse.json({ newUser: !user });
  } catch (err) {}
}

export async function POST(request: Request) {
  try {
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
