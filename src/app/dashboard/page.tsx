import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { signOutAction } from "@/lib/actions/auth";
import { getChildrenAction } from "@/lib/actions/children";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Target,
  Award,
  Clock,
  Plus,
  ArrowRight,
  BarChart3,
  Star,
  Activity
} from "lucide-react";

export default async function DashboardPage() {
  // Check if user is signed in on server side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/signin');
  }

  // Get children data for dashboard stats
  const { children } = await getChildrenAction();

  // Calculate dashboard statistics
  const totalChildren = children.length;
  const totalWords = children.reduce((sum, child) => sum + (child.stats?.knownWords || 0), 0);
  const totalExercises = children.reduce((sum, child) => sum + (child.stats?.exercises || 0), 0);
  const averageProgress = totalChildren > 0 ? Math.round((totalWords / totalChildren) * 2) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🗣️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SpeechBuddy
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {session.user.name || 'Parent'}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/dashboard/children/add">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Child
                </Button>
              </Link>
              <form action={signOutAction}>
                <Button variant="outline" type="submit">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Children</p>
                  <p className="text-3xl font-bold text-gray-800">{totalChildren}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Words Learned</p>
                  <p className="text-3xl font-bold text-gray-800">{totalWords}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Exercises Done</p>
                  <p className="text-3xl font-bold text-gray-800">{totalExercises}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Progress</p>
                  <p className="text-3xl font-bold text-gray-800">{averageProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Children Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Children Overview */}
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Your Children
                </CardTitle>
                <Link href="/dashboard/children">
                  <Button variant="outline" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {children.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No children added yet</h3>
                    <p className="text-gray-600 mb-4">Start by adding your first child to begin tracking their speech development.</p>
                    <Link href="/dashboard/children/add">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Child
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {children.slice(0, 3).map((child) => {
                      const age = Math.floor((new Date().getTime() - new Date(child.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
                      const levelInfo = {
                        0: { name: 'Level 0', color: 'bg-gray-100 text-gray-800', description: 'Early Sounds' },
                        1: { name: 'Level 1', color: 'bg-blue-100 text-blue-800', description: 'First Words' },
                        2: { name: 'Level 2', color: 'bg-green-100 text-green-800', description: 'Word Combinations' },
                        3: { name: 'Level 3', color: 'bg-purple-100 text-purple-800', description: 'Complex Speech' },
                      }[child.level] || { name: 'Unknown', color: 'bg-gray-100 text-gray-800', description: 'Assessment needed' };

                      return (
                        <div key={child.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {child.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{child.name}</h4>
                              <p className="text-sm text-gray-600">{age} years old</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={levelInfo.color}>{levelInfo.name}</Badge>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-800">{child.stats?.knownWords || 0} words</p>
                              <p className="text-xs text-gray-600">{child.stats?.exercises || 0} exercises</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {children.length === 0 ? (
                    <p className="text-gray-600 text-center py-4">No recent activity. Add a child to get started!</p>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">New words learned today</p>
                          <p className="text-xs text-gray-600">Great progress on vocabulary building!</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Exercise completed</p>
                          <p className="text-xs text-gray-600">Keep up the excellent work!</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/children/add">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Child
                  </Button>
                </Link>
                <Link href="/dashboard/vocabulary">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Vocabulary Builder
                  </Button>
                </Link>
                <Link href="/dashboard/exercises">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Start Exercises
                  </Button>
                </Link>
                <Link href="/dashboard/progress">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-semibold">{averageProgress}%</span>
                  </div>
                  <Progress value={averageProgress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalWords}</div>
                    <div className="text-xs text-gray-600">Total Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{totalExercises}</div>
                    <div className="text-xs text-gray-600">Exercises</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips & Motivation */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Daily Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed">
                  💡 <strong>Tip of the day:</strong> Practice vocabulary during daily activities like mealtime or bath time.
                  This helps children associate words with real-world experiences!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
