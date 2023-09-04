import { redisClient } from "@/server/redis";
import { Schema, Repository, EntityId } from "redis-om";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const postSchema = new Schema(
  "post",
  {
    profileId: { type: "number" },
    content: { type: "string" },
    photos: { type: "string[]" },
    createdAt: { type: "date" },
  },
  { dataStructure: "JSON" }
);

interface PostRepo {
  save(pid: number, data: Prisma.PostCreateInput): Promise<string | null>;
  fetch(rid: string): Promise<Prisma.PostSelect | null>;
  fetchMany(rids: Array<string>): Promise<Array<Prisma.PostSelect>>;
  delete(rid: string): Promise<void>;
  timeline(page: number, perPage: number): Promise<Array<Prisma.PostSelect>>;
}

export class PostRepository implements PostRepo {
  private ttlTime: number = 24 * 60 * 60;
  private repo: Repository;
  constructor() {
    this.repo = new Repository(postSchema, redisClient);
  }

  async timeline(
    page: number = 1,
    perPage: number = 10
  ): Promise<Array<Prisma.PostSelect>> {
    await this.repo.createIndex();
    return (await this.repo
      .search()
      .returnPage((page - 1) * perPage, perPage)) as unknown as Promise<
      Prisma.PostSelect<DefaultArgs>[]
    >;
  }

  async delete(rid: string): Promise<void> {
    try {
      return await this.repo.remove(rid);
    } catch (err) {}
  }
  async fetchMany(rids: string[]): Promise<Prisma.PostSelect<DefaultArgs>[]> {
    try {
      return (await this.repo.fetch(rids)) as Array<Prisma.PostSelect>;
    } catch (err) {
      return [];
    }
  }
  async fetch(rid: string): Promise<Prisma.PostSelect | null> {
    try {
      return (await this.repo.fetch(rid)) as Prisma.PostSelect;
    } catch (err) {
      return null;
    }
  }

  //   async fetchMany(rids: Array<string>)
  async save(
    pid: number,
    data: Prisma.PostCreateInput
  ): Promise<string | null> {
    try {
      const redisData = await this.repo.save({
        profileId: pid,
        content: data.content,
        photos: data.photos,
        createdAt: data.createdAt,
      });
      const rid = redisData[EntityId];

      if (!rid) {
        // error
        return null;
      }

      await this.repo.expire(rid, this.ttlTime);
      return rid;
    } catch (err) {
      return null;
    }
  }
}
