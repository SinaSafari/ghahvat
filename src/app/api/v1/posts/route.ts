import { redisClient, redisConnect } from "@/server/auth/redis";
import { NextResponse } from "next/server";
import { Schema, Repository, EntityId } from "redis-om";

const postSchema = new Schema(
  "post",
  {
    title: { type: "string" },
    content: { type: "text" },
  },
  { dataStructure: "JSON" }
);

const postRepository = new Repository(postSchema, redisClient);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("pid");
    if (!postId) {
      return NextResponse.json({ message: "pid is required" }, { status: 400 });
    }
    const post = await postRepository.fetch(postId);
    return NextResponse.json({ data: post });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST() {
  try {
    await redisConnect();

    const newpost = await postRepository.save({
      title: "title one",
      content: "content one",
    });

    return NextResponse.json(
      { message: "ok", id: newpost[EntityId] },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
