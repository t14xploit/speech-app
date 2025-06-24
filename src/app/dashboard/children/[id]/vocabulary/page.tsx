'use client';

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, BookOpen, Check, Plus, Search, Filter } from "lucide-react";
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

function WordBadge({ word, isKnown, onStatusChange }: {
  word: Word;
  isKnown: boolean;
  onStatusChange: (wordId: string, status: 'known' | 'learning' | 'remove') => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant={isKnown ? "default" : "outline"}
          className={`cursor-pointer transition-all hover:scale-105 ${
            isKnown
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'hover:bg-blue-50 hover:border-blue-300'
          }`}
        >
          {word.text}
          {isKnown && <Check className="ml-1 h-3 w-3" />}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
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
  );
}

export default function VocabularyPage({ params }: VocabularyPageProps) {
  const resolvedParams = use(params);
  const [categories, setCategories] = useState<Category[]>([]);
  const [knownWords, setKnownWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const getFilteredWords = (level: number) => {
    let allWords: Word[] = [];

    categories.forEach(category => {
      const levelWords = category.words.filter(word => word.level === level);
      allWords = [...allWords, ...levelWords];
    });

    // Filter by search term
    if (searchTerm) {
      allWords = allWords.filter(word =>
        word.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      allWords = allWords.filter(word =>
        word.category.name === selectedCategory
      );
    }

    // Group by category for display
    const groupedWords = allWords.reduce((acc, word) => {
      const categoryName = word.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(word);
      return acc;
    }, {} as Record<string, Word[]>);

    return groupedWords;
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

        {/* Search and Filter */}
        <Card className="shadow-lg border-0 mb-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search words..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

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

          {[0, 1, 2, 3].map((level) => {
            const filteredWords = getFilteredWords(level);
            const hasWords = Object.keys(filteredWords).length > 0;

            return (
              <TabsContent key={level} value={level.toString()}>
                {!hasWords ? (
                  <Card className="shadow-lg border-0">
                    <CardContent className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">No words found</h3>
                      <p className="text-gray-600">
                        {searchTerm || selectedCategory !== 'all'
                          ? 'Try adjusting your search or filter criteria.'
                          : 'No words available for this level.'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(filteredWords).map(([categoryName, words]) => (
                      <Card key={categoryName} className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center">
                            <span className="text-2xl mr-2">
                              {categories.find(cat => cat.name === categoryName)?.icon || '📝'}
                            </span>
                            {categoryName}
                            <Badge variant="outline" className="ml-2">
                              {words.length} words
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {words.map((word) => (
                              <WordBadge
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
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
