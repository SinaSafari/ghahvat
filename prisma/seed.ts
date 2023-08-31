import { PrismaClient } from "@prisma/client";
import { hash } from "../src/server/auth/hash";
import { UserProfileSeeder } from "./seeders/userProfile.seeder";

const prisma = new PrismaClient();

async function main() {
  await UserProfileSeeder(prisma);
  // const admin = await prisma.user.upsert({
  //   where: { phone: "989935894289" },
  //   update: {},
  //   create: {
  //     phone: "989935894289",
  //     password: await hash.make("password"),
  //   },
  // });

  // const user = await prisma.user.upsert({
  //   where: { phone: "989380260839" },
  //   update: {},
  //   create: {
  //     phone: "989380260839",
  //     password: await hash.make("password"),
  //     profile: {
  //       create: { profileId: "sina" },
  //     },
  //   },
  // });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
