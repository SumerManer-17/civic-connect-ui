import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import Header from "@/components/Header";

const AuthorityLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/authority/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-heading text-2xl">Authority Login</CardTitle>
            <CardDescription>Access the municipal issue management system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="admin@municipality.gov" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              For authorized government personnel only.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthorityLogin;
