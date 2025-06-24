import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  // Check if user is signed in on server side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log('Server session in dashboard:', session?.user?.id ? `Found: ${session.user.id}` : 'Not found');

  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🗣️ SpeechBuddy Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome to your speech therapy dashboard!
            </p>
          </div>
          <form action={signOutAction}>
            <Button
              type="submit"
              variant="outline"
              className="bg-white"
            >
              Sign Out
            </Button>
          </form>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Child Profiles Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                👶 Child Profiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage your children&apos;s speech development profiles
              </p>
              <Link href="/dashboard/children">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Manage Profiles
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Exercises Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                🎯 Speech Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Interactive exercises tailored to your child&apos;s level
              </p>
              <Link href="/dashboard/exercises">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Start Exercises
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                📊 Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View detailed statistics and progress reports
              </p>
              <Link href="/dashboard/progress">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Progress
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Vocabulary Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                📚 Vocabulary Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Expand your child&apos;s vocabulary with targeted words
              </p>
              <Link href="/dashboard/vocabulary">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Build Vocabulary
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                ⚙️ Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Customize your experience and preferences
              </p>
              <Link href="/dashboard/settings">
                <Button className="w-full bg-gray-600 hover:bg-gray-700">
                  Open Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                ❓ Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get help and learn how to use SpeechBuddy effectively
              </p>
              <Link href="/dashboard/help">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Get Help
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-lg border-0 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Children Registered</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Exercises Completed</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-purple-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Words Learned</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-orange-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
