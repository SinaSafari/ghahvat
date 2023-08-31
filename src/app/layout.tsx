import { ErrorBoundaryProvider } from "@/providers/errorBoundry.provider";
import "./globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppSessionProvider } from "@/providers/appSession.provider";

const yekanBakhFont = localFont({
  src: [
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/yekanBakh/woff2/YekanBakh-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  // display: "swap",
  // preload: true,
  variable: "--font-yekan-bakh",
});
export const metadata: Metadata = {
  title: "قهوه‌ت با من",
  description: "قهوه‌ت با من!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={yekanBakhFont.variable}
      data-theme="bumblebee"
    >
      <ErrorBoundaryProvider>
        {/* <AppSessionProvider> */}
        <body>{children}</body>
        {/* </AppSessionProvider> */}
      </ErrorBoundaryProvider>
    </html>
  );
}
