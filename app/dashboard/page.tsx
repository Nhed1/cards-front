"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../auth/providers/AuthContext";

export default function Dashboard() {
  const { handleLogout, userEmail } = useAuth();

  return (
    <div className="flex-col flex">
      <div className="flex justify-end p-4 items-center gap-6 bg-gray-500">
        <Button onClick={handleLogout}>Logout</Button>

        <p>{userEmail}</p>
      </div>
      <h1>Private page</h1>
    </div>
  );
}
