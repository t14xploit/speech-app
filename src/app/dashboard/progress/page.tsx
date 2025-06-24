import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Users, Plus } from "lucide-react";
import Link from "next/link";
import { getChildrenAction } from "@/lib/actions/children";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function ProgressPage() {
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
    console.error('Error in progress page:', error);
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
                <h1 className="text-2xl font-bold text-gray-800">Progress Tracking</h1>
                <p className="text-sm text-gray-600">Monitor your children's speech development progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-100/60 via-blue-50/40 to-white hover:shadow-xl hover:from-blue-100/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Children</p>
                  <p className="text-3xl font-bold text-gray-800">{children.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-100/60 via-green-50/40 to-white hover:shadow-xl hover:from-green-100/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Words</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {children.reduce((sum, child) => sum + (child.stats?.knownWords || 0), 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-100/60 via-purple-50/40 to-white hover:shadow-xl hover:from-purple-100/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Exercises</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {children.reduce((sum, child) => sum + (child.stats?.exercises || 0), 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg flex items-center justify-center shadow-sm">
                  <BarChart3 className="w-6 h-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-100/60 via-orange-50/40 to-white hover:shadow-xl hover:from-orange-100/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Progress</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {children.length > 0 ? Math.round((children.reduce((sum, child) => sum + (child.stats?.knownWords || 0), 0) / children.length) * 2) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center shadow-sm">
                  <Calendar className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Children Progress */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Individual Progress
          </h2>

          {children.length === 0 ? (
            <Card className="shadow-lg border-0">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No progress data yet</h3>
                <p className="text-gray-600 mb-4">Add a child profile to start tracking progress.</p>
                <Link href="/dashboard/children/add">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Child
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {children.map((child) => {
                const age = Math.floor((new Date().getTime() - new Date(child.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
                const levelInfo = {
                  0: { name: 'Level 0', color: 'bg-gray-100 text-gray-800', description: 'Early Sounds' },
                  1: { name: 'Level 1', color: 'bg-blue-100 text-blue-800', description: 'First Words' },
                  2: { name: 'Level 2', color: 'bg-green-100 text-green-800', description: 'Word Combinations' },
                  3: { name: 'Level 3', color: 'bg-purple-100 text-purple-800', description: 'Complex Speech' },
                }[child.level] || { name: 'Unknown', color: 'bg-gray-100 text-gray-800', description: 'Assessment needed' };

                const progressPercentage = Math.min((child.stats?.knownWords || 0) * 2, 100);

                return (
                  <Card key={child.id} className="shadow-lg border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {child.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <CardTitle className="text-lg text-gray-800">{child.name}</CardTitle>
                            <p className="text-sm text-gray-600">{age} years old</p>
                          </div>
                        </div>
                        <Badge className={levelInfo.color}>{levelInfo.name}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Vocabulary Progress</span>
                            <span className="font-semibold">{child.stats?.knownWords || 0} words</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{child.stats?.knownWords || 0}</div>
                            <div className="text-xs text-gray-600">Words Known</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{child.stats?.exercises || 0}</div>
                            <div className="text-xs text-gray-600">Exercises</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{child.stats?.days || 0}</div>
                            <div className="text-xs text-gray-600">Days Active</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Information Section */}
        <Card className="shadow-lg border-0 bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <BarChart3 className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-800 mb-2">Understanding Progress Tracking</h3>
                <div className="text-sm text-purple-700 space-y-2">
                  <p>
                    Progress tracking helps you monitor your child's speech development journey.
                    We track vocabulary growth, exercise completion, and overall engagement.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Vocabulary Progress:</strong> Number of words your child has learned
                    </div>
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Exercise Completion:</strong> Speech exercises completed successfully
                    </div>
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Level Advancement:</strong> Automatic progression based on vocabulary
                    </div>
                    <div className="bg-white/50 p-3 rounded">
                      <strong>Daily Engagement:</strong> Days since starting the program
                    </div>
                  </div>
                  <p className="mt-4 font-medium">
                    📊 Regular tracking helps identify areas for improvement and celebrates achievements!
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
