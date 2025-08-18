import { type NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const apiResponse = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const responseData = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: responseData.message || "Login failed" },
        { status: apiResponse.status }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: "accessToken",
      value: responseData.accessToken,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    cookieStore.set({
      name: "refreshToken",
      value: responseData.refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 120, // 7 days
    });

    return NextResponse.json(responseData, { status: apiResponse.status });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
