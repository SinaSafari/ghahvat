"use client";

import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

async function getPosts(url: string) {
  return fetch(url).then((res) => res.json());
}

export default function AdminProfilesPage() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading } = useSWR(
    `/api/v1/profiles?page=${pageIndex}`,
    getPosts
  );

  if (isLoading) {
    return "صیر...";
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-right">avatar</th>
            <th>Name</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i: any) => {
            return (
              <tr key={i.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={i.avatar}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className="px-3">
                      <div className="font-bold">{i.profileId}</div>
                      <div className="text-sm text-right opacity-50">
                        {i.displayName}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{i.contentType}</td>
                <th>
                  <Link href={`/admin/profiles/${i.profileId}`}>
                    <button className="btn btn-ghost btn-xs">جزئیات</button>
                  </Link>
                </th>
              </tr>
            );
          })}
          {/* row 1 */}
        </tbody>
        {/* foot */}
      </table>

      <div className="flex items-center justify-end">
        <div className="join gap-1">
          <button
            className="join-item btn "
            onClick={() => pageIndex > 1 && setPageIndex(pageIndex - 1)}
          >
            قبلی
          </button>
          <button className="join-item btn">{pageIndex}</button>
          <button
            className="join-item btn"
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}
