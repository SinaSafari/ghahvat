import { verifiedToken } from "@/server/auth/getToken";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    // middleware
    const profile = await prisma.profile.findUnique({
      where: { profileId: params.profileId },
    });
    if (!profile) {
      return NextResponse.json(
        { message: "prfile not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(profile);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const tokenData = verifiedToken(request.headers);
    if (!tokenData) {
      return NextResponse.json({ message: "invalid token" }, { status: 400 });
    }
    const profile = await prisma.profile.findUnique({
      where: { profileId: params.profileId },
      include: { user: { select: { role: true } } },
    });
    if (!profile) {
      return NextResponse.json(
        { message: "profile not foudn" },
        { status: 404 }
      );
    }

    if (!(profile.user.role === "ADMIN" || profile.userId === tokenData.uid)) {
      return NextResponse.json(
        { message: "resource not allowed" },
        { status: 403 }
      );
    }

    const schema = z.object({
      profileId: z.string().optional(),
      avatar: z.string().optional(),
      bio: z.string().optional(),
      contentType: z.string().optional(),
      displayName: z.string().optional(),
    });

    const body = await schema.safeParseAsync(await request.json());
    if (!body.success) {
      return NextResponse.json({ message: "invalid payload" }, { status: 400 });
    }

    await prisma.profile.update({
      where: { profileId: params.profileId },
      data: {
        ...body.data,
      },
    });

    return NextResponse.json({}, { status: 202 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    return NextResponse.json(
      { message: "method not allowed" },
      { status: 405 }
    );
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { profileId: string } }
) {
  try {
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
