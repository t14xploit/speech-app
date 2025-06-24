'use client';

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, BookOpen, Check, Plus, MoreVertical } from "lucide-react";
import Link from "next/link";
import { getCategoriesWithWords, getChildVocabulary, updateWordStatus } from "@/lib/actions/vocabulary";

interface Word {
  id: string;
  text: string;
  level: number;
  difficulty: number;
  category: {
    id: string;
    name: string;
    icon: string;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  words: Word[];
}

interface VocabularyPageProps {
  params: Promise<{ id: string }>;
}

function WordCard({ word, isKnown, onStatusChange }: {
  word: Word;
  isKnown: boolean;
  onStatusChange: (wordId: string, status: 'known' | 'learning' | 'remove') => void;
}) {
  return (
    <div className={`relative p-3 rounded-lg border transition-all ${
      isKnown 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">{word.text}</span>
          {isKnown && <Check className="h-4 w-4 text-green-600" />}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!isKnown ? (
              <>
                <DropdownMenuItem onClick={() => onStatusChange(word.id, 'known')}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Known
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(word.id, 'learning')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Learning
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => onStatusChange(word.id, 'remove')}>
                Remove from Known
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <Badge variant="outline" className="text-xs">
          Level {word.level}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {word.category.name}
        </Badge>
      </div>
    </div>
  );
}

export default function VocabularyPage({ params }: VocabularyPageProps) {
  const resolvedParams = use(params);
  const [categories, setCategories] = useState<Category[]>([]);
  const [knownWords, setKnownWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesResult, vocabularyResult] = await Promise.all([
          getCategoriesWithWords(),
          getChildVocabulary(resolvedParams.id)
        ]);

        setCategories(categoriesResult.categories);
        setKnownWords(vocabularyResult.knownWords);
      } catch (error) {
        console.error('Error loading vocabulary data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [resolvedParams.id]);

  const handleWordStatusChange = async (wordId: string, status: 'known' | 'learning' | 'remove') => {
    try {
      const result = await updateWordStatus(resolvedParams.id, wordId, status);
      
      if (result.success) {
        // Update local state
        if (status === 'known') {
          const word = categories
            .flatMap(cat => cat.words)
            .find(w => w.id === wordId);
          if (word && !knownWords.find(kw => kw.id === wordId)) {
            setKnownWords(prev => [...prev, word]);
          }
        } else if (status === 'remove') {
          setKnownWords(prev => prev.filter(w => w.id !== wordId));
        }
      }
    } catch (error) {
      console.error('Error updating word status:', error);
    }
  };

  const getWordsForLevel = (level: number) => {
    return categories.reduce((acc, category) => {
      const levelWords = category.words.filter(word => word.level === level);
      if (levelWords.length > 0) {
        acc.push({
          ...category,
          words: levelWords
        });
      }
      return acc;
    }, [] as Category[]);
  };

  const getKnownWordsCount = (level: number) => {
    return knownWords.filter(word => word.level === level).length;
  };

  const getTotalWordsCount = (level: number) => {
    return categories.reduce((total, category) => {
      return total + category.words.filter(word => word.level === level).length;
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-2xl">Loading vocabulary...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/children">
            <Button variant="outline" size="sm" className="bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <BookOpen className="mr-3 h-8 w-8" />
              Vocabulary Builder
            </h1>
            <p className="text-gray-600">
              Track your child&apos;s vocabulary progress across different levels
            </p>
          </div>
        </div>

        {/* Level Tabs */}
        <Tabs value={selectedLevel.toString()} onValueChange={(value) => setSelectedLevel(parseInt(value))}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {[0, 1, 2, 3].map((level) => (
              <TabsTrigger key={level} value={level.toString()} className="flex flex-col items-center p-4">
                <Badge className="mb-1">Level {level}</Badge>
                <span className="text-xs">
                  {getKnownWordsCount(level)}/{getTotalWordsCount(level)} words
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {[0, 1, 2, 3].map((level) => (
            <TabsContent key={level} value={level.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getWordsForLevel(level).map((category) => (
                  <Card key={category.id} className="shadow-lg border-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <span className="text-2xl mr-2">{category.icon}</span>
                        {category.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.words.map((word) => (
                          <WordCard
                            key={word.id}
                            word={word}
                            isKnown={knownWords.some(kw => kw.id === word.id)}
                            onStatusChange={handleWordStatusChange}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
