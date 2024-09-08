import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInTab } from "./sign-in-tab";
import { SignUpTab } from "./sign-up-tab";
import { getUser } from "../db";
import { redirect } from "next/navigation";
import { GoogleButton } from "../components/google-button";

export default async function Auth() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center pt-32 h-screen">
      <GoogleButton className="mb-4" />

      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Registrar</TabsTrigger>
        </TabsList>
        <SignInTab />
        <SignUpTab />
      </Tabs>
    </div>
  );
}
