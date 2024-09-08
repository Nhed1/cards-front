import { redirect } from "next/navigation";
import { getUser } from "../db";
import { SignOutButton } from "../components/sign-out-button";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div>
      <SignOutButton>sair</SignOutButton>
      <h1>private page</h1>
      <p>user logged in: {user.name}</p>
    </div>
  );
}
