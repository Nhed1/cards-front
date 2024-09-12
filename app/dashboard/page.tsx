"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../auth/providers/AuthContext";

export default function Dashboard() {
  const { handleLogout } = useAuth();

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <h1>Private page</h1>
    </div>
  );
}
