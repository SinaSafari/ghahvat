import { NextRequest, NextResponse } from "next/server";

// import { pathToRegexp, match } from "path-to-regexp";

// const singleProfileRegex = pathToRegexp("/:profileId");
// const adminRoutesRegex = pathToRegexp("/admin/:path*");

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const res = await fetch(new URL("/api/v1/auth/me", request.nextUrl.origin), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = await res.json();
  if (request.nextUrl.pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
