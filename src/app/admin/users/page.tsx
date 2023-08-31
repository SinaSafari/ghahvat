"use client";

import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

async function getPosts(url: string) {
  return fetch(url).then((res) => res.json());
}

export default function AdminUsersPage() {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading } = useSWR(
    `/api/v1/users?page=${pageIndex}`,
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
            <th className="text-right">fullname</th>
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
                    <div>{i.fullName}</div>
                    <div className="px-3">
                      <div className="font-bold">{i.phone}</div>
                      <div className="text-sm text-right opacity-50">
                        {i.email || "email not provided"}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{i.contentType}</td>
                <th>
                  <Link href={`/admin/users/${i.id}`}>
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
