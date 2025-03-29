"use client";
import { useSession, signOut } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

export default function Home() {
  const { data: session, status } = useSession();

  return (
<div>
  HomePage
</div>
  );
}
