import { NextResponse } from "next/server";
import { registerSchema } from "@/dto/register.dto";
import { prisma } from "@/server/prisma";
import { hash } from "@/server/auth/hash";
import { randomUUID } from "crypto";
import * as jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("profileId");
    if (!profileId) {
      return NextResponse.json(
        { message: "profileId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.profile.findFirst({
      where: { profileId },
      select: { profileId: true },
    });

    return NextResponse.json({ alreadyUsed: !!user });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await registerSchema.safeParseAsync(await req.json());
    if (!body.success) {
      return NextResponse.json(body.error, { status: 400 });
    }

    const { phone, password, displayName, profileId } = body.data;
    const tokenId = randomUUID();
    const user = await prisma.user.create({
      data: {
        phone,
        password: await hash.make(password),
        tokenId: tokenId,
        profile: {
          create: {
            profileId,
            displayName,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const tokens = {
      accessToken: jwt.sign({ uid: user.id }, process.env.SECRET as string, {
        expiresIn: "12h",
      }),
      refreshToken: jwt.sign(
        { uid: user.id, rid: tokenId },
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
