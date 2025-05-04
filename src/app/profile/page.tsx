"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function ProfilePage() {
  const { user, backendUser, loading } = useCurrentUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You are not logged in.</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Role: <strong>{backendUser?.role}</strong></p>
    </div>
  );
}