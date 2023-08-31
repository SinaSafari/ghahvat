import { verifiedToken } from "@/server/auth/getToken";
import { hash } from "@/server/auth/hash";
import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

type CreateProfilePayload = {
  password: string;
  displayName: string;
  bio: string;
  profileId: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";
    const perPage = searchParams.get("per_page") ?? "10";

    const posts = await prisma.profile.findMany({
      take: +perPage,
      skip: (+page - 1) * +perPage,
    });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
