
// src/app/api/auth/access-token/route.ts
import { getAccessToken } from "@auth0/nextjs-auth0";

export const GET = async () => {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Access token missing" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ accessToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to get access token:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
