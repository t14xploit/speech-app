import { SignUp } from "@/components/SignUp"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(session){
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <span className="text-4xl">🗣️</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            SpeechBuddy
          </h1>
          <p className="text-gray-600 text-lg">
            Start your child&apos;s speech development journey
          </p>
        </div>

        {/* Sign Up Component */}
        <div className="mb-6">
          <SignUp />
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <Alert className="bg-green-50 border-green-200">
            <ArrowLeft className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Already have an account?</AlertTitle>
            <AlertDescription className="text-green-700">
              <div className="flex items-center justify-between mt-2">
                <span>Sign in to continue your progress</span>
                <Button asChild variant="outline" size="sm" className="bg-white hover:bg-green-50">
                  <Link href="/signin">
                    Sign In
                  </Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
