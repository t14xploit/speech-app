'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { addChildAction } from "@/lib/actions/children";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding Child...
        </>
      ) : (
        'Add Child'
      )}
    </Button>
  );
}

export default function AddChildPage() {
  const [state, formAction] = useActionState(addChildAction, { error: "" });
  const router = useRouter();

  // Handle successful child addition
  useEffect(() => {
    if (state?.success) {
      router.push('/dashboard/children');
    }
  }, [state?.success, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              👶 Add Child Profile
            </h1>
            <p className="text-gray-600">
              Create a profile to track your child&apos;s speech development
            </p>
          </div>
          <Link href="/dashboard/children">
            <Button variant="outline" className="bg-white">
              ← Cancel
            </Button>
          </Link>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              Child Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state?.error && state.error !== "" && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Child&apos;s Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your child's name"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Date of Birth *</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  This helps us determine the appropriate speech level (0-3) for your child
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-2">
                  📊 Initial Level Assessment
                </h3>
                <p className="text-sm text-amber-700">
                  Based on your child&apos;s age, we&apos;ll suggest a starting level. However, since every child develops at their own pace, especially those with speech delays, you&apos;ll be able to adjust the level after reviewing vocabulary categories and words.
                </p>
                <ul className="text-sm text-amber-700 mt-2 space-y-1">
                  <li><strong>Level 0:</strong> Early sounds and first words (0-10 words)</li>
                  <li><strong>Level 1:</strong> Single words and simple phrases (10-50 words)</li>
                  <li><strong>Level 2:</strong> Word combinations and short sentences (50-200 words)</li>
                  <li><strong>Level 3:</strong> Complex speech and conversations (200+ words)</li>
                </ul>
                <p className="text-sm text-amber-700 mt-2 font-medium">
                  💡 After adding your child, you&apos;ll complete a vocabulary assessment to set the most appropriate level.
                </p>
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">
                🎯 Personalized Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Once added, your child will get exercises tailored to their specific age and development level.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">
                📈 Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Track vocabulary growth, exercise completion, and speech milestones over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
