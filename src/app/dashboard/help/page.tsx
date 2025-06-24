import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              ❓ Help & Support
            </h1>
            <p className="text-gray-600">
              Get help and learn how to use TinyTalker effectively
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="bg-white">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Help Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                🚀 Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Learn how to set up your child&apos;s profile and start their speech development journey.
              </p>
              <Link href="/dashboard/children">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Set Up Child Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                📖 User Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive guide on using all features of TinyTalker effectively.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View User Guide
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                💬 Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Need help? Our support team is here to assist you with any questions.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                🎯 Speech Development Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Expert tips and strategies for supporting your child&apos;s speech development.
              </p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                View Tips
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
