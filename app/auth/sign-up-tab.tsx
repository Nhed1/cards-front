"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { AuthInputs } from "./types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./providers/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const SignUpTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();
  const { handleRegister } = useAuth();

  const { toast } = useToast();

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      const value = await handleRegister(data.email, data.password);

      toast({
        title: "success",
        variant: "default",
      });
    } catch {
      toast({
        title: "error",
        variant: "destructive",
      });
    }
  };

  return (
    <TabsContent value="sign-up">
      <Card>
        <CardHeader>
          <CardTitle>Registrar</CardTitle>
          <CardDescription>Preencha suas credenciais</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                name="email"
                id="email"
                placeholder="pedro.duarte@gmail.com"
                type="email"
              />
              {errors.email && (
                <span className="mt-6">This field is required</span>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                {...register("password", {
                  required: {
                    message: "This field is required",
                    value: true,
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                id="password"
                placeholder="123456"
                type="password"
                name="password"
              />
              {errors.password && (
                <span className="mt-6">{errors.password.message}</span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Registrar</Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};
