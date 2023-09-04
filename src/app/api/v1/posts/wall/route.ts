import { PostRepository } from "@/server/posts/repositories/psotRepository.redis";
import { redisConnect } from "@/server/redis";
import { NextResponse } from "next/server";

export async function GET() {
  await redisConnect();
  const postRepo = new PostRepository();
  return NextResponse.json(await postRepo.timeline());
}
