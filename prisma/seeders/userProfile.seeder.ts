import { PrismaClient, Prisma, Role } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/fa";
import { hash } from "../../src/server/auth/hash";

async function userFactory(): Promise<Prisma.UserCreateArgs["data"]> {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullname = `${firstName} ${lastName}`;
  return {
    phone: faker.phone.number("989#########"),
    address: faker.location.streetAddress(true),
    email: faker.internet.email({ firstName, lastName }),
    fullName: fullname,
    nationalId: faker.string.numeric(10),
    role: Role.BASEUSER,
    password: await hash.make("password"),
    postalCode: faker.location.zipCode("##########"),
    nationalCard: faker.internet.avatar(),
    bankInfo: [
      {
        cardOwnerFullname: fullname,
        sheba: faker.finance.iban(),
        status: "accepted",
      },
    ],
    profile: {
      create: {
        profileId: faker.internet.userName({
          firstName,
          lastName,
        }),
        bio: faker.person.bio(),
        displayName: faker.internet.displayName({
          firstName,
          lastName,
        }),
        contentType: "podcaster",
        socialLinks: [{ type: "youtube", url: faker.internet.url() }],
        avatar: faker.internet.avatar(),
        posts: {
          create: Array.from({ length: Math.floor(Math.random() * 6) }).map(
            (_) => {
              return {
                content: faker.lorem.words({ min: 3, max: 20 }),
                photos: Array.from({
                  length: Math.floor(Math.random() * 5),
                }).map((_) => {
                  return faker.image.urlPicsumPhotos({ width: 128 });
                }),
              };
            }
          ),
        },
      },
    },
  };
}

const data: Array<Prisma.UserCreateArgs["data"]> = [];
export async function UserProfileSeeder(prisma: PrismaClient) {
  try {
    await prisma.user.deleteMany();
    await prisma.user.upsert({
      where: { phone: "989935894289" },
      update: {},
      create: {
        phone: "989935894289",
        password: await hash.make("password"),
        role: "ADMIN",
      },
    });
    for (const _ of Array.from({ length: 20 })) {
      const user = await userFactory();
      data.push(user);
    }

    for (const userData of data) {
      await prisma.user.create({ data: userData });
    }
  } catch (err) {
    console.log(err);
  }
}
