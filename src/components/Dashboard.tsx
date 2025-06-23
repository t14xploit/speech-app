'use client';

import { useState, useEffect } from 'react';
import { Child, ChildWord, Category, WeeklyProgress } from '@/generated/prisma';

interface DashboardProps {
  child: Child & {
    knownWords: (ChildWord & {
      word: {
        category: Category;
      };
    })[];
    weeklyProgress: WeeklyProgress[];
  };
}

interface CategoryStats {
  categoryName: string;
  knownWords: number;
  totalWords: number;
  percentage: number;
  icon: string;
}

export default function Dashboard({ child }: DashboardProps) {
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [weeklyGrowth, setWeeklyGrowth] = useState<{ week: string; words: number }[]>([]);

  useEffect(() => {
    // Calculate category statistics
    const categoryMap = new Map<string, { known: number; total: number; icon: string }>();
    
    // Initialize categories
    child.knownWords.forEach(({ word }) => {
      const categoryName = word.category.name;
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, {
          known: 0,
          total: 0,
          icon: word.category.icon || '📚'
        });
      }
    });

    // Count known words per category
    child.knownWords.forEach(({ word }) => {
      const categoryName = word.category.name;
      const stats = categoryMap.get(categoryName)!;
      stats.known += 1;
    });

    // Convert to array for display
    const stats: CategoryStats[] = Array.from(categoryMap.entries()).map(([categoryName, data]) => ({
      categoryName,
      knownWords: data.known,
      totalWords: data.total || data.known, // We'll need to fetch total from API
      percentage: data.total ? (data.known / data.total) * 100 : 100,
      icon: data.icon
    }));

    setCategoryStats(stats);

    // Process weekly growth data
    const sortedProgress = child.weeklyProgress
      .sort((a, b) => new Date(a.weekStart).getTime() - new Date(b.weekStart).getTime())
      .slice(-8); // Last 8 weeks

    const growthData = sortedProgress.map(progress => ({
      week: new Date(progress.weekStart).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      words: progress.wordsLearned
    }));

    setWeeklyGrowth(growthData);
  }, [child]);

  const totalKnownWords = child.knownWords.length;
  const currentLevel = child.level;
  const levelNames = ['First Words', 'Two-Word Phrases', 'Simple Sentences', 'Complex Speech'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {child.name}'s Progress 🌟
              </h1>
              <p className="text-gray-600 mt-2">
                Level {currentLevel}: {levelNames[currentLevel]}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{totalKnownWords}</div>
              <div className="text-gray-600">Total Words</div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Weekly Growth Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📈 Weekly Vocabulary Growth
            </h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {weeklyGrowth.map((week, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg w-full transition-all duration-500 hover:from-blue-600 hover:to-blue-400"
                    style={{
                      height: `${Math.max((week.words / Math.max(...weeklyGrowth.map(w => w.words))) * 200, 20)}px`
                    }}
                  />
                  <div className="text-xs text-gray-600 mt-2 text-center">
                    {week.week}
                  </div>
                  <div className="text-sm font-semibold text-blue-600">
                    {week.words}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🎯 Current Level
            </h2>
            <div className="text-center">
              <div className="text-6xl mb-4">
                {currentLevel === 0 ? '🍼' : currentLevel === 1 ? '👶' : currentLevel === 2 ? '🧒' : '👦'}
              </div>
              <div className="text-lg font-semibold text-gray-800">
                Level {currentLevel}
              </div>
              <div className="text-gray-600 mb-4">
                {levelNames[currentLevel]}
              </div>
              <div className="bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalKnownWords / (currentLevel + 1) / 50) * 100, 100)}%` }}
                />
              </div>
              <div className="text-sm text-gray-600">
                Progress to next level
              </div>
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            📚 Progress by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-semibold text-gray-800">
                      {category.categoryName}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {category.knownWords} words
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(category.percentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {Math.round(category.percentage)}% complete
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-semibold">Practice Exercises</div>
            <div className="text-sm opacity-90">Start learning activities</div>
          </button>
          
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <div className="text-3xl mb-2">📝</div>
            <div className="font-semibold">Add New Words</div>
            <div className="text-sm opacity-90">Track vocabulary growth</div>
          </button>
          
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">View Reports</div>
            <div className="text-sm opacity-90">Detailed progress analysis</div>
          </button>
        </div>
      </div>
    </div>
  );
}
