"use server";

import { cookies } from "next/headers";

export async function getUserProfile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

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

    const profileData = await res.json();

    if (profileData.success) {
      return profileData?.data;
    } else {
      console.error("Failed to fetch profile:", profileData.message);
      cookieStore.delete("accessToken");
      const refreshtokenRes = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const accesTokenResponse = await refreshtokenRes.json();

      if (!!accesTokenResponse.accessToken) {
        cookieStore.set({
          name: "accessToken",
          value: accesTokenResponse.accessToken,
          httpOnly: true,
          secure: true,
          maxAge: 60 * 15, // 15 minutes
        });
        return getUserProfile(); // Retry fetching profile with new token
      } else {
        cookieStore.delete("refreshToken");
      }
    }
  } catch (err) {
    console.error("Network error:", err);
  }
}

export const logOutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

export const getHomePageProperties = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/property`);
  const data = await res.json();
  return data;
};
