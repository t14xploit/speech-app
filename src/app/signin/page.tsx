// import { auth } from "@/lib/auth"
// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
import SignIn from "@/components/SignIn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <span className="text-4xl">🗣️</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            TinyTalker
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Continue your child&apos;s speech journey
          </p>
        </div>

        {/* Sign In Component */}
        <div className="mb-6">
          <SignIn />
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <Alert className="bg-blue-50 border-blue-200">
            <Bell className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">New to TinyTalker?</AlertTitle>
            <AlertDescription className="text-blue-700">
              <div className="flex items-center justify-between mt-2">
                <span>Create an account to get started</span>
                <Button asChild variant="outline" size="sm" className="bg-white hover:bg-blue-50">
                  <Link href="/signup" className="flex items-center">
                    Sign Up <ExternalLink className="ml-1 h-3 w-3" />
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
