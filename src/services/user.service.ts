import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    const goApiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!goApiRes.ok) {
      const errorBody = await goApiRes.text();
      console.error("❌ Go API error:", goApiRes.status, errorBody);
      return res.status(goApiRes.status).json({ error: "Failed to fetch user from Go backend" });
    }

    const user = await goApiRes.json();
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error in /api/me route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
