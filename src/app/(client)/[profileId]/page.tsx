import { prisma } from "@/server/prisma";

export default async function ProfilePublicPage({
  params,
}: {
  params: { profileId: string };
}) {
  const data = await prisma.profile.findFirst({
    where: { profileId: params.profileId },
  });
  return (
    <>
      <p>صفحه پروفایل، با این ایدی:</p>
      <p>{params.profileId}</p>

      <div>
        دیتا:
        <p>{data?.displayName}</p>
      </div>
    </>
  );
}
