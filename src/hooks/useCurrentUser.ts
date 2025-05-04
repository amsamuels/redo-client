import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserStore } from "@/store/user";

export const useCurrentUser = () => {
  const { user, isLoading: auth0Loading } = useUser();
  const { backendUser, setBackendUser } = useUserStore();

  useEffect(() => {
    if (!user || backendUser) return;

    const fetchBackendUser = async () => {
      try {
        const res = await fetch("/api/me"); // Calls the API route below
        if (!res.ok) throw new Error("Failed to fetch backend user");
        const data = await res.json();
        setBackendUser(data);
      } catch (err) {
        console.error("❌ Failed to load backend user:", err);
      }
    };

    fetchBackendUser();
  }, [user, auth0Loading, backendUser]);

  return { user, backendUser, loading: auth0Loading };
};
