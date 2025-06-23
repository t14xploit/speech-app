"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={className}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export default function SignInPage() {
  const [state, formAction] = useActionState(signInAction, { error: "" });
  const router = useRouter();

  // Handle successful sign in
  useEffect(() => {
    console.log('Sign in state:', state);
    if (state?.success) {
      console.log('Redirecting to dashboard...');
      router.push('/dashboard');
    }
  }, [state, router]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🗣️ SpeechBuddy
          </h1>
          <p className="text-gray-600">
            Welcome back! Sign in to continue helping your child&apos;s speech development
          </p>
        </div>

        {/* Sign In Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state?.error && state.error !== "" && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {state?.success && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Sign in successful! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="parent@example.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-11"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" name="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>

              <SubmitButton className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Sign In
              </SubmitButton>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Secured by <span className="text-blue-600 font-semibold">better-auth</span>
          </p>
        </div>
      </div>
    </div>
  );
}
