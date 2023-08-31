import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    if (!phone) {
      return NextResponse.json(
        { message: "phone is missing in query params" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });
    return NextResponse.json({ newUser: !user });
  } catch (e) {
    NextResponse.json({ message: "something went wrong" });
  }
};
