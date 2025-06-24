"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <Card className="rounded-md max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign in</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const result = await signIn.email({
                  email,
                  password,
                });

                if (result.error) {
                  alert(result.error.message);
                } else {
                  router.push("/dashboard");
                }
              } catch {
                alert("Sign in failed");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
