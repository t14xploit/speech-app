'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Calendar, TrendingUp } from "lucide-react";
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
        description: "Early sounds (0-10 words)", 
        color: "bg-blue-100 text-blue-800" 
      };
    case 1:
      return { 
        name: "Level 1", 
        description: "First words (10-50 words)", 
        color: "bg-green-100 text-green-800" 
      };
    case 2:
      return { 
        name: "Level 2", 
        description: "Word combinations (50-200 words)", 
        color: "bg-orange-100 text-orange-800" 
      };
    case 3:
      return { 
        name: "Level 3", 
        description: "Complex speech (200+ words)", 
        color: "bg-purple-100 text-purple-800" 
      };
    default:
      return { 
        name: "Unknown", 
        description: "Assessment needed", 
        color: "bg-gray-100 text-gray-800" 
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
            <Card key={child.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-800 mb-1">
                      {child.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {age}
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
                <Badge className={`${levelInfo.color} w-fit`}>
                  {levelInfo.name}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {levelInfo.description}
                </p>
                
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Start Exercises
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Progress
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Edit Profile
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold text-blue-600">0</div>
                      <div className="text-xs text-gray-500">Words</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">0</div>
                      <div className="text-xs text-gray-500">Exercises</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-purple-600">0</div>
                      <div className="text-xs text-gray-500">Days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
