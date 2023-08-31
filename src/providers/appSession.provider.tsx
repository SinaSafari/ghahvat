"use client";
import type { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export const AppSessionProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
