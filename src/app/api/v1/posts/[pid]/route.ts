import { NextResponse } from "next/server";
import { PostRepository } from "@/server/posts/repositories/psotRepository.redis";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("pid");
    if (!postId) {
      return NextResponse.json({ message: "pid is required" }, { status: 400 });
    }
    const postRepository = new PostRepository();
    const post = await postRepository.fetch(postId);
    return NextResponse.json({ data: post });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
