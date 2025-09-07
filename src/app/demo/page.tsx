'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Users,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Star,
  Activity,
  Plus,
  ArrowRight,
  Home,
  Play
} from "lucide-react";

// Mock data for demo - simulating real app data
const mockChildren = [
  {
    id: 'demo-child-1',
    name: 'Emma',
    birthDate: new Date(Date.now() - 20 * 30 * 24 * 60 * 60 * 1000), // 20 months old
    level: 1,
    userId: 'demo-user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    stats: {
      knownWords: 45,
      exercises: 23,
      weeklyGrowth: 8
    }
  },
  {
    id: 'demo-child-2',
    name: 'Alex',
    birthDate: new Date(Date.now() - 36 * 30 * 24 * 60 * 60 * 1000), // 3 years old
    level: 2,
    userId: 'demo-user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    stats: {
      knownWords: 156,
      exercises: 67,
      weeklyGrowth: 12
    }
  }
];

// Calculate demo statistics
const totalChildren = mockChildren.length;
const totalWords = mockChildren.reduce((sum, child) => sum + (child.stats?.knownWords || 0), 0);
const totalExercises = mockChildren.reduce((sum, child) => sum + (child.stats?.exercises || 0), 0);
const averageProgress = totalChildren > 0 ? Math.round((totalWords / totalChildren) * 2) : 0;

export default function DemoPage() {
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
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TinyTalker Demo
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Experience the full app functionality</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
                <Button variant="outline" size="sm" className="sm:hidden">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="sm">
                  <span className="hidden sm:block">Get Started</span>
                  <Play className="w-4 h-4 sm:hidden" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-yellow-800">
            <span className="text-lg">⚠️</span>
            <span className="text-xs sm:text-sm font-medium">
              This is a demo with mock data. Sign up to save real progress!
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-100/60 via-blue-50/40 to-white hover:shadow-xl hover:from-blue-100/80 transition-all duration-300">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">Total Children</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-800">{totalChildren}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center shadow-sm">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-100/60 via-green-50/40 to-white hover:shadow-xl hover:from-green-100/80 transition-all duration-300">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">Words Learned</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-800">{totalWords}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center shadow-sm">
                  <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-100/60 via-purple-50/40 to-white hover:shadow-xl hover:from-purple-100/80 transition-all duration-300">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">Exercises Done</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-800">{totalExercises}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-100/60 via-orange-50/40 to-white hover:shadow-xl hover:from-orange-100/80 transition-all duration-300">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium">Avg Progress</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-800">{averageProgress}%</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center shadow-sm">
                  <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-orange-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Children Overview */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Children Overview */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50/60 via-white to-blue-50/30 hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Your Children
                </CardTitle>
                <Button variant="outline" size="sm" disabled className="opacity-50">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChildren.map((child) => {
                    const age = Math.floor((new Date().getTime() - new Date(child.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
                    const levelInfo = {
                      0: { name: 'Level 0', color: 'bg-gray-100 text-gray-800', description: 'Early Sounds' },
                      1: { name: 'Level 1', color: 'bg-blue-100 text-blue-800', description: 'First Words' },
                      2: { name: 'Level 2', color: 'bg-green-100 text-green-800', description: 'Word Combinations' },
                      3: { name: 'Level 3', color: 'bg-purple-100 text-purple-800', description: 'Complex Speech' },
                    }[child.level] || { name: 'Unknown', color: 'bg-gray-100 text-gray-800', description: 'Assessment needed' };

                    return (
                      <div key={child.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                            {child.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{child.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">{age} years old</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={levelInfo.color + " text-xs"}>{levelInfo.name}</Badge>
                          <div className="text-right">
                            <p className="text-xs sm:text-sm font-semibold text-gray-800">{child.stats?.knownWords || 0} words</p>
                            <p className="text-xs text-gray-600">{child.stats?.exercises || 0} exercises</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50/40 via-white to-emerald-50/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-800">Emma learned 3 new words today</p>
                      <p className="text-xs text-gray-600">Great progress on vocabulary building!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-800">Alex completed 2 exercises</p>
                      <p className="text-xs text-gray-600">Keep up the excellent work!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-800">Weekly milestone achieved!</p>
                      <p className="text-xs text-gray-600">Both children hit their weekly goals</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Progress */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button disabled className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 opacity-50 cursor-not-allowed text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Child
                </Button>
                <Button disabled variant="outline" className="w-full justify-start opacity-50 cursor-not-allowed">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Vocabulary Builder
                </Button>
                <Button disabled variant="outline" className="w-full justify-start opacity-50 cursor-not-allowed">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Start Exercises
                </Button>
                <Button disabled variant="outline" className="w-full justify-start opacity-50 cursor-not-allowed">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
                <div className="pt-2 border-t">
                  <Link href="/signin">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Sign Up to Use Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50/40 via-white to-yellow-50/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{totalWords}</div>
                    <div className="text-xs text-gray-600">Total Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{totalExercises}</div>
                    <div className="text-xs text-gray-600">Exercises</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips & Motivation */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Daily Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  💡 <strong>Tip of the day:</strong> Practice vocabulary during daily activities like mealtime or bath time.
                  This helps children associate words with real-world experiences!
                </p>
              </CardContent>
            </Card>

            {/* Demo CTA */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-4 sm:p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Ready to get started?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Sign up now to track real progress and unlock all features!
                </p>
                <Link href="/signup">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Create Free Account
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
