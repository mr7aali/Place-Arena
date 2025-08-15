"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function getUserProfile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      return data?.data;
    } else {
      // cookieStore.delete("accessToken");
      const refreshtokenRes = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
        { credentials: "include" }
      );

      const accesTokenResponse = await refreshtokenRes.json();
      console.log(accesTokenResponse);
      if (accesTokenResponse.success) {
        cookieStore.set({
          name: "accessToken",
          value: accesTokenResponse.accessToken,
          httpOnly: true,
          secure: true,
          maxAge: 60 * 15, // 15 minutes
        });
        return getUserProfile(); // Retry fetching profile with new token
      } else {
        //i want o redirect to login page
        // return NextResponse.redirect(
        //   new URL("/login", "http://localhost:3000/")
        // );
      }
    }
  } catch (err) {
    console.error("Network error:", err);
    // cookieStore.delete("accessToken");
    // return NextResponse.redirect(new URL("/login", "http://localhost:3000/"));
  }
}
