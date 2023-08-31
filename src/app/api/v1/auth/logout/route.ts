import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/server/prisma";

type RefreshTokenPayload = { refreshToken: string };

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 400 }
      );
    }
    const body: RefreshTokenPayload = await request.json();
    if (!body || !body.refreshToken) {
      return NextResponse.json({ message: "invalid payload" }, { status: 400 });
    }
    const verifiedToken = jwt.verify(
      body.refreshToken,
      process.env.SECRET as string
    ) as { uid: number; rid: string };

    if (!verifiedToken || !verifiedToken.uid || !verifiedToken.rid) {
      return NextResponse.json({ message: "invalid token" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: verifiedToken.uid },
      data: { tokenId: null },
    });

    return NextResponse.json({ message: "logged out" }, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
