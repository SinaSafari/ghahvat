import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

type RefreshTokenPayload = { refreshToken: string };
export async function POST(request: Request) {
  try {
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
    const user = await prisma.user.findUnique({
      where: { id: verifiedToken.uid },
      select: { id: true, tokenId: true },
    });
    if (!user) {
      return NextResponse.json({ message: "invalid token" }, { status: 404 });
    }

    if (user.tokenId !== verifiedToken.rid) {
      return NextResponse.json({ message: "invalid token" }, { status: 403 });
    }

    const newRid = randomUUID();

    await prisma.user.update({
      where: { id: verifiedToken.uid },
      data: { tokenId: newRid },
    });

    const tokens = {
      accessToken: jwt.sign({ uid: user.id }, process.env.SECRET as string, {
        expiresIn: "12h",
      }),
      refreshToke: jwt.sign(
        { uid: user.id, rid: newRid },
        process.env.SECRET as string,
        {
          expiresIn: "12w",
        }
      ),
    };
    return NextResponse.json({ ...tokens });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
