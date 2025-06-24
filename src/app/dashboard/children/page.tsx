import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getChildrenAction } from "@/lib/actions/children";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ChildrenList from "@/components/children/ChildrenList";

export default async function ChildrenPage() {
  // Check if user is signed in on server side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log('Server session in children page:', session?.user?.id ? `Found: ${session.user.id}` : 'Not found');

  if (!session?.user) {
    redirect('/signin');
  }

  // Get children for the current user
  const { children } = await getChildrenAction();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              👶 Child Profiles
            </h1>
            <p className="text-gray-600">
              Manage your children&apos;s speech development profiles
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="bg-white">
                ← Back to Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/children/add">
              <Button className="bg-blue-600 hover:bg-blue-700">
                + Add Child
              </Button>
            </Link>
          </div>
        </div>

        {/* Children List or Empty State */}
        {children.length === 0 ? (
          <Card className="shadow-lg border-0 text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">👶</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No children added yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start by adding your child&apos;s profile to begin tracking their speech development journey.
              </p>
              <Link href="/dashboard/children/add">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add Your First Child
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <ChildrenList children={children} />
        )}

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center">
                📊 Level Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Automatically determine your child&apos;s speech level (0-3) based on their age and vocabulary size.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center">
                📈 Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Monitor vocabulary growth, exercise completion, and speech development milestones.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center">
                🎯 Personalized Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Get exercises tailored to your child&apos;s specific level and learning needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
