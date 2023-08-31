"use client";
import { AuthStat } from "@/components/authStat";

import Image from "next/image";
import { useAuth } from "@/modules/auth/useAuth";
export default function Home() {
  const { accessToken } = useAuth();
  return (
    <>
      <p>اپ کلاینت</p>
      <p>acc: {accessToken}</p>
    </>
  );
}
