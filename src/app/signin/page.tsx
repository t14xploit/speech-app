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
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg mb-3 sm:mb-4">
            <span className="text-3xl sm:text-4xl">🗣️</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            TinyTalker
          </h1>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            Welcome back! Continue your child&apos;s speech journey
          </p>
        </div>

        {/* Sign In Component */}
        <div className="mb-4 sm:mb-6">
          <SignIn />
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <Alert className="bg-blue-50 border-blue-200">
            <Bell className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800 text-sm sm:text-base">New to TinyTalker?</AlertTitle>
            <AlertDescription className="text-blue-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2 sm:gap-0">
                <span className="text-sm sm:text-base">Create an account to get started</span>
                <Button asChild variant="outline" size="sm" className="bg-white hover:bg-blue-50 w-full sm:w-auto">
                  <Link href="/signup" className="flex items-center justify-center">
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
