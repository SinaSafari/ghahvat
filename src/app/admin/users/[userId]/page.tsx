"use client";
import useSWR from "swr";

async function getUser(url: string) {
  return fetch(url).then((res) => res.json());
}

export default function AdminSingleUser({
  params,
}: {
  params: { userId: string };
}) {
  const { isLoading, data } = useSWR(`/api/v1/users/${params.userId}`, getUser);

  if (isLoading) {
    return "صیر...";
  }
  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  );
}
