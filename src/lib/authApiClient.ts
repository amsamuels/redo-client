// lib/authApiClient.ts
import axios from "axios";
import { getAccessToken } from "@auth0/nextjs-auth0";

const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});


authApiClient.interceptors.request.use(
    async (config) => {
      const res = await fetch("/api/auth/access-token");
      const data = await res.json();
      
      if (!res.ok || !data.accessToken) {
        throw new Error(data.error || "Token fetch failed");
      }
      
      const accessToken = data.accessToken;
      
      console.log("🔐 Injecting token:", accessToken?.slice(0, 20));
      if (accessToken && config.headers) {
        config.headers.set
          ? config.headers.set("Authorization", `Bearer ${accessToken}`)
          : (config.headers["Authorization"] = `Bearer ${accessToken}`);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  



export default authApiClient;
