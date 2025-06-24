import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Target, Clock, Star, Users, Plus } from "lucide-react";
import Link from "next/link";
import { getChildrenAction } from "@/lib/actions/children";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function ExercisesPage() {
  // Check if user is signed in
  let session;
  let children = [];

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      redirect('/signin');
    }

    // Get children data
    const result = await getChildrenAction();
    children = result.children || [];
  } catch (error) {
    console.error('Error in exercises page:', error);
    // During build time, redirect to signin
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Speech Exercises</h1>
                <p className="text-sm text-gray-600">Interactive exercises to improve speech development</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Children Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Select a Child for Exercises
          </h2>

          {children.length === 0 ? (
            <Card className="shadow-lg border-0">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No children added yet</h3>
                <p className="text-gray-600 mb-4">Add a child profile to start speech exercises.</p>
                <Link href="/dashboard/children/add">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Child
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => {
                const age = Math.floor((new Date().getTime() - new Date(child.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
                const levelInfo = {
                  0: { name: 'Level 0', color: 'bg-gray-100 text-gray-800', description: 'Early Sounds' },
                  1: { name: 'Level 1', color: 'bg-blue-100 text-blue-800', description: 'First Words' },
                  2: { name: 'Level 2', color: 'bg-green-100 text-green-800', description: 'Word Combinations' },
                  3: { name: 'Level 3', color: 'bg-purple-100 text-purple-800', description: 'Complex Speech' },
                }[child.level] || { name: 'Unknown', color: 'bg-gray-100 text-gray-800', description: 'Assessment needed' };

                return (
                  <Card key={child.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {child.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-800">{child.name}</CardTitle>
                          <p className="text-sm text-gray-600">{age} years old</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <Badge className={levelInfo.color}>{levelInfo.name}</Badge>
                        <span className="text-xs text-gray-500">{levelInfo.description}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{child.stats?.exercises || 0}</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{child.stats?.knownWords || 0}</div>
                          <div className="text-xs text-gray-600">Words Known</div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Start Exercises
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Exercise Types */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Exercise Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Sound Practice</h3>
                <p className="text-sm text-gray-600 mb-4">Practice individual sounds and phonemes</p>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Word Repetition</h3>
                <p className="text-sm text-gray-600 mb-4">Repeat words to improve pronunciation</p>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Timed Challenges</h3>
                <p className="text-sm text-gray-600 mb-4">Fun timed exercises for motivation</p>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Interactive Games</h3>
                <p className="text-sm text-gray-600 mb-4">Gamified learning experiences</p>
                <Badge variant="outline">Coming Soon</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <Card className="shadow-lg border-0 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800 mb-2">About Speech Exercises</h3>
                <div className="text-sm text-green-700 space-y-2">
                  <p>
                    Our speech exercises are designed to help children practice and improve their speech skills
                    through interactive and engaging activities tailored to their development level.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Level 0:</strong> Basic sound recognition and vocalization
                    </div>
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Level 1:</strong> Simple word pronunciation and repetition
                    </div>
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Level 2:</strong> Word combinations and sentence building
                    </div>
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Level 3:</strong> Complex speech patterns and conversations
                    </div>
                  </div>
                  <p className="mt-4 font-medium">
                    🎯 Regular practice with these exercises can significantly improve speech development!
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
