'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Circle } from "lucide-react";
import { updateChildLevelAction } from "@/lib/actions/children";

interface LevelData {
  level: number;
  name: string;
  description: string;
  wordRange: string;
  color: string;
  categories: {
    name: string;
    words: string[];
    icon: string;
  }[];
}

const levelData: LevelData[] = [
  {
    level: 0,
    name: "Level 0",
    description: "Early sounds and first words",
    wordRange: "0-10 words",
    color: "bg-blue-100 text-blue-800",
    categories: [
      {
        name: "First Sounds",
        icon: "🔊",
        words: ["mama", "dada", "baba", "hi", "bye"]
      },
      {
        name: "Basic Needs",
        icon: "🍼",
        words: ["milk", "more", "up", "no", "yes"]
      }
    ]
  },
  {
    level: 1,
    name: "Level 1", 
    description: "Single words and simple phrases",
    wordRange: "10-50 words",
    color: "bg-green-100 text-green-800",
    categories: [
      {
        name: "Family",
        icon: "👨‍👩‍👧‍👦",
        words: ["mom", "dad", "baby", "sister", "brother", "grandma", "grandpa"]
      },
      {
        name: "Food",
        icon: "🍎",
        words: ["apple", "banana", "cookie", "water", "juice", "bread", "cheese"]
      },
      {
        name: "Toys",
        icon: "🧸",
        words: ["ball", "car", "doll", "book", "blocks", "puzzle"]
      },
      {
        name: "Actions",
        icon: "🏃",
        words: ["go", "stop", "come", "sit", "eat", "sleep", "play"]
      }
    ]
  },
  {
    level: 2,
    name: "Level 2",
    description: "Word combinations and short sentences", 
    wordRange: "50-200 words",
    color: "bg-orange-100 text-orange-800",
    categories: [
      {
        name: "Animals",
        icon: "🐶",
        words: ["dog", "cat", "bird", "fish", "cow", "horse", "pig", "chicken", "duck", "sheep"]
      },
      {
        name: "Colors",
        icon: "🌈",
        words: ["red", "blue", "green", "yellow", "pink", "purple", "orange", "black", "white"]
      },
      {
        name: "Body Parts",
        icon: "👤",
        words: ["head", "eyes", "nose", "mouth", "ears", "hands", "feet", "arms", "legs"]
      },
      {
        name: "Clothing",
        icon: "👕",
        words: ["shirt", "pants", "shoes", "socks", "hat", "coat", "dress"]
      },
      {
        name: "Phrases",
        icon: "💬",
        words: ["want more", "all done", "go outside", "my turn", "help me", "I see"]
      }
    ]
  },
  {
    level: 3,
    name: "Level 3",
    description: "Complex speech and conversations",
    wordRange: "200+ words", 
    color: "bg-purple-100 text-purple-800",
    categories: [
      {
        name: "Emotions",
        icon: "😊",
        words: ["happy", "sad", "angry", "excited", "scared", "surprised", "tired", "hungry"]
      },
      {
        name: "Places",
        icon: "🏠",
        words: ["home", "school", "park", "store", "hospital", "library", "playground"]
      },
      {
        name: "Time",
        icon: "⏰",
        words: ["today", "tomorrow", "yesterday", "morning", "afternoon", "night", "now", "later"]
      },
      {
        name: "Questions",
        icon: "❓",
        words: ["what", "where", "when", "who", "why", "how", "which"]
      },
      {
        name: "Sentences",
        icon: "📝",
        words: ["I want to go", "Can I have", "Where is my", "I don't like", "Let's play together"]
      }
    ]
  }
];

export default function AssessLevelPage({ params }: { params: { id: string } }) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleConfirmLevel = async () => {
    if (selectedLevel === null) return;

    setIsUpdating(true);
    try {
      const result = await updateChildLevelAction(params.id, selectedLevel);
      if (result.success) {
        router.push('/dashboard/children');
      } else {
        console.error('Failed to update level:', result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              📊 Speech Level Assessment
            </h1>
            <p className="text-gray-600">
              Review each level to determine your child&apos;s current speech abilities
            </p>
          </div>
          <Link href="/dashboard/children">
            <Button variant="outline" className="bg-white">
              ← Back to Children
            </Button>
          </Link>
        </div>

        {/* Instructions */}
        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📋 How to Assess Your Child&apos;s Level
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>1. <strong>Review each tab</strong> - Look through the vocabulary and categories for each level</p>
              <p>2. <strong>Consider your child&apos;s abilities</strong> - Can they say most words in a level easily?</p>
              <p>3. <strong>Choose the appropriate level</strong> - Pick the level that matches their current abilities</p>
              <p>4. <strong>Start slightly below</strong> - It&apos;s better to start easier and progress up</p>
            </div>
          </CardContent>
        </Card>

        {/* Level Tabs */}
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {levelData.map((level) => (
              <TabsTrigger 
                key={level.level} 
                value={level.level.toString()}
                className="flex flex-col items-center p-4"
              >
                <Badge className={`${level.color} mb-1`}>
                  {level.name}
                </Badge>
                <span className="text-xs">{level.wordRange}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {levelData.map((level) => (
            <TabsContent key={level.level} value={level.level.toString()}>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                        <Badge className={level.color}>
                          {level.name}
                        </Badge>
                        {level.description}
                      </CardTitle>
                      <p className="text-gray-600 mt-2">
                        Typical vocabulary: {level.wordRange}
                      </p>
                    </div>
                    <Button
                      onClick={() => setSelectedLevel(level.level)}
                      className={`${
                        selectedLevel === level.level 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {selectedLevel === level.level ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Selected
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 mr-2" />
                          Choose This Level
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {level.categories.map((category, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <span className="text-2xl">{category.icon}</span>
                            {category.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {category.words.map((word, wordIndex) => (
                              <Badge 
                                key={wordIndex} 
                                variant="outline" 
                                className="text-xs"
                              >
                                {word}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Confirm Selection */}
        {selectedLevel !== null && (
          <Card className="shadow-lg border-0 mt-8 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    ✅ Level {selectedLevel} Selected
                  </h3>
                  <p className="text-green-700">
                    You&apos;ve chosen {levelData[selectedLevel].name} - {levelData[selectedLevel].description}
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Confirm & Save Level
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
