import { prisma } from "../prisma";

export async function AdminGuard(uid: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id: uid } });
    if (!user || user.role !== "ADMIN") {
      return null;
    }
    return user;
  } catch (err) {
    console.log(err);
  }
}
