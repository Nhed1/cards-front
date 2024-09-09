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
import { useFormContext } from "react-hook-form";
import { AuthInputs, OnSubmit } from "./types";

export const SignInTab = ({ onSubmit }: { onSubmit: OnSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AuthInputs>();

  return (
    <TabsContent value="sign-in">
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Preencha suas credenciais</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                id="email"
                placeholder="pedro.duarte@gmail.com"
                type="email"
                name="email"
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
            <Button type="submit">Entrar</Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};
