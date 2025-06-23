import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              📊 Progress Tracking
            </h1>
            <p className="text-gray-600">
              View detailed statistics and progress reports
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="bg-white">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Coming Soon */}
        <Card className="shadow-lg border-0 text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Progress Tracking Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Track your child&apos;s vocabulary growth, exercise completion, and speech development milestones.
            </p>
            <Link href="/dashboard/children">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Set Up Child Profile First
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
