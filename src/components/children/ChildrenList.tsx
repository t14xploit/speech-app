'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Calendar, TrendingUp, BookOpen, Play, BarChart3 } from "lucide-react";
import Link from "next/link";
import { deleteChildAction } from "@/lib/actions/children";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Child {
  id: string;
  name: string;
  birthDate: Date;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  stats?: {
    knownWords: number;
    exercises: number;
    days: number;
  };
}

interface ChildrenListProps {
  children: Child[];
}

function calculateAge(birthDate: Date): string {
  const now = new Date();
  const ageInMonths = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  
  if (ageInMonths < 12) {
    return `${Math.floor(ageInMonths)} months`;
  } else if (ageInMonths < 24) {
    const years = Math.floor(ageInMonths / 12);
    const months = Math.floor(ageInMonths % 12);
    return months > 0 ? `${years} year${years > 1 ? 's' : ''} ${months} months` : `${years} year${years > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(ageInMonths / 12);
    return `${years} years`;
  }
}

function getLevelInfo(level: number): { name: string; description: string; color: string } {
  switch (level) {
    case 0:
      return {
        name: "Level 0",
        description: "Early sounds and first words",
        color: "bg-blue-100 text-blue-800"
      };
    case 1:
      return {
        name: "Level 1",
        description: "Single words and simple phrases",
        color: "bg-green-100 text-green-800"
      };
    case 2:
      return {
        name: "Level 2",
        description: "Word combinations and short sentences",
        color: "bg-orange-100 text-orange-800"
      };
    case 3:
      return {
        name: "Level 3",
        description: "Complex speech and conversations",
        color: "bg-purple-100 text-purple-800"
      };
    default:
      return {
        name: "Assessment Needed",
        description: "Please complete level assessment",
        color: "bg-amber-100 text-amber-800"
      };
  }
}

export default function ChildrenList({ children }: ChildrenListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (childId: string) => {
    setDeletingId(childId);
    try {
      const result = await deleteChildAction(childId);
      if (result.success) {
        router.refresh();
      } else {
        console.error('Delete failed:', result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => {
          const levelInfo = getLevelInfo(child.level);
          const age = calculateAge(new Date(child.birthDate));
          
          return (
            <Card key={child.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {child.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-800 mb-1">
                        {child.name}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {age}
                      </div>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full"
                        disabled={deletingId === child.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Child Profile</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {child.name}&apos;s profile? This will permanently remove all their progress data, exercises, and vocabulary records. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(child.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete Profile
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <Badge className={`${levelInfo.color} px-3 py-1`}>
                    {levelInfo.name}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {levelInfo.description}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {child.stats?.knownWords || 0}
                    </div>
                    <div className="text-xs text-gray-600">Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {child.stats?.exercises || 0}
                    </div>
                    <div className="text-xs text-gray-600">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {child.stats?.days || 0}
                    </div>
                    <div className="text-xs text-gray-600">Days</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/dashboard/children/${child.id}/vocabulary`}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Vocabulary
                    </Button>
                  </Link>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Exercises
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs hover:bg-gray-50">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Progress
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs hover:bg-gray-50">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
