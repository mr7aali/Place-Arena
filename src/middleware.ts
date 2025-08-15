import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function verifyJWT(token: string, secret: string) {
  const encoder = new TextEncoder();
  return await jwtVerify(token, encoder.encode(secret));
}
export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    await verifyJWT(accessToken, process.env.JWT_ACCESS_SECRET!);
    return NextResponse.next();
  } catch (err) {
    console.log("Access token expired or invalid, trying refresh...", err);

    try {
      const refreshRes = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!refreshRes.ok) throw new Error("Refresh failed");
      const data = await refreshRes.json();
      const response = NextResponse.next();
      response.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 15,
      });

      return response;
    } catch (refreshErr) {
      console.log("Refresh token failed:", refreshErr);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/add-property"],
};
