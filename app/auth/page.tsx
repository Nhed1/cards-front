"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInTab } from "./sign-in-tab";
import { SignUpTab } from "./sign-up-tab";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AuthInputs } from "./types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./providers/AuthContext";
import { useState } from "react";

export default function Auth() {
  const methods = useForm<AuthInputs>();
  const [isLogin, setIsLogin] = useState(true);
  const { handleRegister, handleLogin } = useAuth();

  const { toast } = useToast();

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      (await isLogin)
        ? handleLogin(data.email, data.password)
        : handleRegister(data.email, data.password);

      toast({
        title: "success",
        variant: "default",
      });

      methods.reset({ email: "", password: "" });
    } catch {
      toast({
        title: "error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center pt-32 h-screen">
      <FormProvider {...methods}>
        <Tabs defaultValue="sign-in" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in" onClick={() => setIsLogin(true)}>
              Entrar
            </TabsTrigger>
            <TabsTrigger value="sign-up" onClick={() => setIsLogin(false)}>
              Registrar
            </TabsTrigger>
          </TabsList>
          <SignInTab onSubmit={onSubmit} />
          <SignUpTab onSubmit={onSubmit} />
        </Tabs>
      </FormProvider>
    </div>
  );
}
