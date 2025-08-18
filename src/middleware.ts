import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserProfile } from "./app/actions";

export async function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get("accessToken")?.value;
  // const refreshToken = request.cookies.get("refreshToken")?.value;
  const result = await getUserProfile();

  // If either token is missing, redirect to login
  if (!!result) {
    // Optional: delete cookies here (server-side)
    return NextResponse.next();
  } else {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // If both tokens exist, continue to the requested page
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
