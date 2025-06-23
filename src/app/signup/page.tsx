"use client";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/lib/actions/auth";
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

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUpAction, { error: "" });
  const router = useRouter();

  // Handle successful sign up
  useEffect(() => {
    if (state?.success) {
      router.push('/dashboard');
    }
  }, [state?.success, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🗣️ SpeechBuddy
          </h1>
          <p className="text-gray-600">
            Create your account to start helping your child&apos;s speech development
          </p>
        </div>

        {/* Sign Up Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state?.error && state.error !== "" && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="h-11"
                />
              </div>

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
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  autoComplete="new-password"
                  required
                  className="h-11"
                />
              </div>

              <SubmitButton className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Create Account
              </SubmitButton>
            </form>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <div className="w-full text-center border-t pt-4">
              <p className="text-xs text-gray-500">
                Secured by <span className="text-blue-600 font-semibold">better-auth</span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
