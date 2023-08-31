import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { hash } from "@/server/auth/hash";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

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
    if (!user || !user.password) {
      await prisma.user.create({ data: { phone: phone } });
      const token = jwt.sign(
        { type: "wt", phone },
        process.env.SECRET as string,
        { expiresIn: "10m" }
      );

      return NextResponse.json(
        { newUser: true },
        { headers: { "Set-Cookie": `wt=${token}` } }
      );
    }
    return NextResponse.json({ newUser: false });
  } catch (err) {}
}

type LoginPayload = { phone: string; password: string };
export async function POST(request: Request) {
  try {
    const { phone, password }: LoginPayload = await request.json();
    if (!phone || !password) {
      return NextResponse.json({ message: "invalid patload" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json(
        { message: "password not set" },
        { status: 400 }
      );
    }

    if (!hash.verify(password, user.password)) {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 400 }
      );
    }

    const rid = randomUUID();
    await prisma.user.update({
      where: { phone },
      data: { tokenId: rid },
    });

    const tokens = {
      accessToken: jwt.sign({ uid: user.id }, process.env.SECRET as string, {
        expiresIn: "12h",
      }),
      refreshToken: jwt.sign(
        { uid: user.id, rid },
        process.env.SECRET as string,
        {
          expiresIn: "12w",
        }
      ),
    };

    cookies().set("accessToken", tokens.accessToken);
    cookies().set("refreshToken", tokens.refreshToken);
    return NextResponse.json({ ...tokens });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
