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
import { signIn } from "./actions/auth";

export const SignInTab = () => {
  return (
    <TabsContent value="sign-in">
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Preencha suas credenciais</CardDescription>
        </CardHeader>
        <form action={signIn}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="pedro.duarte@gmail.com"
                type="email"
                name="email"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="123456"
                type="password"
                name="password"
              />
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
