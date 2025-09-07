'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Baby, Calendar, Info } from "lucide-react";
import Link from "next/link";
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
        <>
          <Baby className="mr-2 h-4 w-4" />
          Add Child
        </>
      )}
    </Button>
  );
}

export default function AddChildPage() {
  const [state, formAction] = useActionState(addChildAction, { error: "" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link href="/dashboard/children">
            <Button variant="outline" size="sm" className="bg-white w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Add Child Profile
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Create a profile to track your child&apos;s speech development
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg border-0 mb-6 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <Baby className="mr-2 h-5 w-5" />
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
                <Label htmlFor="name" className="text-sm font-medium">
                  Child&apos;s Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your child's name"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm font-medium flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Date of Birth *
                </Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                  className="h-11"
                />
                <p className="text-sm text-gray-500">
                  This helps us suggest an appropriate starting speech level
                </p>
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="shadow-lg border-0 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">
                  About Speech Level Assessment
                </h3>
                <div className="text-sm text-blue-700 space-y-2">
                  <p>
                    Based on your child&apos;s age, we&apos;ll suggest a starting level. However, 
                    every child develops at their own pace, especially those with speech delays.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    <div className="bg-white/50 p-2 rounded">
                      <strong>Level 0:</strong> Early sounds (0-12 months)
                    </div>
                    <div className="bg-white/50 p-2 rounded">
                      <strong>Level 1:</strong> First words (12-24 months)
                    </div>
                    <div className="bg-white/50 p-2 rounded">
                      <strong>Level 2:</strong> Word combinations (2-3 years)
                    </div>
                    <div className="bg-white/50 p-2 rounded">
                      <strong>Level 3:</strong> Complex speech (3+ years)
                    </div>
                  </div>
                  <p className="mt-3 font-medium">
                    💡 After adding your child, you&apos;ll complete a vocabulary assessment 
                    to set the most appropriate level for their current abilities.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
