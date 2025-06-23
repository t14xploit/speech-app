'use client';

import { useState, useEffect } from 'react';
import { Word, Category, ChildWord } from '@/generated/prisma';

interface VocabularyManagerProps {
  childId: string;
  level: number;
  knownWords: (ChildWord & { word: Word })[];
  availableWords: (Word & { category: Category })[];
  onWordAdded: (wordId: string, notes?: string) => void;
  onWordRemoved: (wordId: string) => void;
}

interface CategoryFilter {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export default function VocabularyManager({
  childId,
  level,
  knownWords,
  availableWords,
  onWordAdded,
  onWordRemoved
}: VocabularyManagerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showKnownOnly, setShowKnownOnly] = useState(false);
  const [categories, setCategories] = useState<CategoryFilter[]>([]);
  const [filteredWords, setFilteredWords] = useState<(Word & { category: Category })[]>([]);

  useEffect(() => {
    // Build category filters
    const categoryMap = new Map<string, CategoryFilter>();
    
    availableWords.forEach(word => {
      const categoryId = word.category.id;
      const categoryName = word.category.name;
      const categoryIcon = word.category.icon || '📚';
      
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: categoryName,
          icon: categoryIcon,
          count: 0
        });
      }
      categoryMap.get(categoryId)!.count++;
    });

    const categoryList = Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    setCategories(categoryList);
  }, [availableWords]);

  useEffect(() => {
    // Filter words based on current filters
    let filtered = availableWords.filter(word => word.level <= level);

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(word => word.category.id === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(word =>
        word.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Known/unknown filter
    if (showKnownOnly) {
      const knownWordIds = new Set(knownWords.map(kw => kw.word.id));
      filtered = filtered.filter(word => knownWordIds.has(word.id));
    }

    setFilteredWords(filtered);
  }, [availableWords, level, selectedCategory, searchTerm, showKnownOnly, knownWords]);

  const isWordKnown = (wordId: string) => {
    return knownWords.some(kw => kw.word.id === wordId);
  };

  const getWordProgress = (wordLevel: number) => {
    const levelNames = ['First Words', 'Two-Word Phrases', 'Simple Sentences', 'Complex Speech'];
    return levelNames[wordLevel] || `Level ${wordLevel}`;
  };

  const handleWordToggle = (word: Word & { category: Category }) => {
    if (isWordKnown(word.id)) {
      onWordRemoved(word.id);
    } else {
      onWordAdded(word.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📚 Vocabulary Manager
          </h1>
          <p className="text-gray-600">
            Track and manage your child's vocabulary progress
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Words
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Show Known Only */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showKnownOnly}
                  onChange={(e) => setShowKnownOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show known words only
                </span>
              </label>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>Total Available: {availableWords.length}</span>
            <span>Known: {knownWords.length}</span>
            <span>Filtered: {filteredWords.length}</span>
          </div>
        </div>

        {/* Word Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredWords.map((word) => {
              const known = isWordKnown(word.id);
              return (
                <div
                  key={word.id}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${known
                      ? 'border-green-300 bg-green-50 hover:bg-green-100'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => handleWordToggle(word)}
                >
                  {/* Known indicator */}
                  {known && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}

                  {/* Word content */}
                  <div className="text-center">
                    {/* Category icon */}
                    <div className="text-2xl mb-2">{word.category.icon}</div>
                    
                    {/* Word text */}
                    <div className="font-semibold text-gray-800 mb-1">
                      {word.text}
                    </div>
                    
                    {/* Category name */}
                    <div className="text-xs text-gray-600 mb-2">
                      {word.category.name}
                    </div>
                    
                    {/* Level indicator */}
                    <div className="text-xs text-gray-500">
                      {getWordProgress(word.level)}
                    </div>
                    
                    {/* Difficulty stars */}
                    <div className="flex justify-center mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < word.difficulty ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="mt-3">
                    <button
                      className={`
                        w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors
                        ${known
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }
                      `}
                    >
                      {known ? 'Remove' : 'Add Word'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredWords.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-xl font-semibold text-gray-600 mb-2">
                No words found
              </div>
              <div className="text-gray-500">
                Try adjusting your filters or search terms
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
