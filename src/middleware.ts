import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserProfile } from "./app/actions";

export async function middleware(request: NextRequest) {
  const result = await getUserProfile();

  if (!!result) {
    return NextResponse.next();
  } else {
    const response = NextResponse.redirect(new URL("/login", request.url));
    // response.cookies.delete("accessToken");
    // response.cookies.delete("refreshToken");
    return response;
  }
}

// Protect specific routes
export const config = {
  matcher: [
    "/profile",
    "/add-property",
    // "/saved",
    // "/properties/:path*", // example of protecting a sub-path
  ],
};
