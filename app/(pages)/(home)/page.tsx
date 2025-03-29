"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      {session ? (
        <div>Welcome to HomePage, {session.user?.name}</div>
      ) : (
        <div>Please log in to view content</div>
      )}
    </div>
  );
}
