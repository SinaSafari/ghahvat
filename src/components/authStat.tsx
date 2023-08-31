"use client";

import type { FC } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { pathToRegexp } from "path-to-regexp";

const singleProfileRegex = pathToRegexp("/:profileId");
const singleProfileSettingRegex = pathToRegexp("/:profileId/setting(.*)");
const adminRoutesRegex = pathToRegexp("/admin/:path*");

export const AuthStat: FC = () => {
  const { data } = useSession();
  return (
    <>
      {JSON.stringify(data)}

      <div>{data?.user?.phone}</div>
      <div>
        <button className="btn btn-primary" onClick={() => signOut()}>
          خروچ
        </button>
      </div>
      <div>profileId: {singleProfileRegex.toString()}</div>
      <div>admin: {adminRoutesRegex.toString()}</div>
      <div>
        singleProfileSettingRegex: {singleProfileSettingRegex.toString()}
      </div>
      <div>
        is passing singleProfileSettingRegex with /abc/setting/as:{" "}
        {singleProfileSettingRegex.test("/abc/setting/as").toString()}
      </div>
      <div>
        <Link href={"/login"}>
          <button className="btn btn-primary">ورود</button>
        </Link>
      </div>
    </>
  );
};
