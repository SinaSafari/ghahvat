"use client";

import useSWR from "swr";

async function getProfile(url: string) {
  return fetch(url).then((res) => res.json());
}

export default function AdminSingleProfile({
  params,
}: {
  params: { profileId: string };
}) {
  const { data, isLoading, error } = useSWR(
    `/api/v1/profiles/${params.profileId}`,
    getProfile
  );

  if (isLoading) {
    return "صبر...";
  }
  if (error) {
    return JSON.stringify(error);
  }
  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  );
}
