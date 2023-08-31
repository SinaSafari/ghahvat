import { verifiedToken } from "@/server/auth/getToken";
import { prisma } from "@/server/prisma";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const tokenData = verifiedToken(request.headers);
    if (!tokenData) {
      return NextResponse.json({ message: "invalid token" }, { status: 400 });
    }

    // const data = await request.formData();
    // const file: File | null = data.get("file") as unknown as File;

    // if (!file) {
    //   return NextResponse.json({ success: false });
    // }

    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // // With the file data in the buffer, you can do whatever you want with it.
    // // For this, we'll just write it to the filesystem in a new location

    // const filepath = path.join(process.cwd(), "public", "profiles", file.name);
    // await writeFile(filepath, buffer);

    // const userWithProfile = await prisma.user.findUnique({
    //     where: {id: tokenData.uid},
    //     include: {profiles: {select: {id: true}}}
    // })

    // await prisma.profile.update({
    //     where: {id: userWithProfile?.profiles.}
    // })
    // console.log(`open ${path} to see the uploaded file`);

    return NextResponse.json({ success: true, data: tokenData });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
