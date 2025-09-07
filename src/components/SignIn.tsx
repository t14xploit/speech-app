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
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm w-full">
      <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Sign In</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600">
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
              autoComplete="email"
              className="h-10 sm:h-11 text-sm sm:text-base"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
              autoComplete="current-password"
              className="h-10 sm:h-11 text-sm sm:text-base"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base mt-2"
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
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">Signing in...</span>
              </>
            ) : (
              <span className="text-sm sm:text-base">Sign In</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
