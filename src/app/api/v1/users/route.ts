import { prisma } from "@/server/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";
    const perPage = searchParams.get("per_page") ?? "10";
    const users = await prisma.user.findMany({
      take: +perPage,
      skip: (+page - 1) * +perPage,
    });
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
