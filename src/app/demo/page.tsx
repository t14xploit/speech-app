'use client';

import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import VocabularyManager from '@/components/VocabularyManager';
import ExerciseInterface from '@/components/ExerciseInterface';

// Mock data for demo
const mockChild = {
  id: 'demo-child-1',
  name: 'Emma',
  birthDate: new Date(Date.now() - 20 * 30 * 24 * 60 * 60 * 1000), // 20 months old
  level: 1,
  userId: 'demo-user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  knownWords: [
    {
      id: 'kw1',
      childId: 'demo-child-1',
      wordId: 'w1',
      dateLearned: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      notes: null,
      word: {
        id: 'w1',
        text: 'mama',
        level: 0,
        categoryId: 'cat1',
        difficulty: 1,
        imageUrl: null,
        audioUrl: null,
        createdAt: new Date(),
        category: {
          id: 'cat1',
          name: 'Family',
          description: 'Family members',
          icon: '👨‍👩‍👧‍👦'
        }
      }
    },
    {
      id: 'kw2',
      childId: 'demo-child-1',
      wordId: 'w2',
      dateLearned: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      notes: null,
      word: {
        id: 'w2',
        text: 'ball',
        level: 0,
        categoryId: 'cat2',
        difficulty: 1,
        imageUrl: null,
        audioUrl: null,
        createdAt: new Date(),
        category: {
          id: 'cat2',
          name: 'Toys',
          description: 'Toys and playthings',
          icon: '🧸'
        }
      }
    }
  ],
  weeklyProgress: [
    {
      id: 'wp1',
      childId: 'demo-child-1',
      weekStart: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      wordsLearned: 3,
      exercisesDone: 8,
      totalScore: 420,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'wp2',
      childId: 'demo-child-1',
      weekStart: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      wordsLearned: 5,
      exercisesDone: 12,
      totalScore: 580,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'wp3',
      childId: 'demo-child-1',
      weekStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      wordsLearned: 4,
      exercisesDone: 10,
      totalScore: 520,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

const mockAvailableWords = [
  {
    id: 'w1',
    text: 'mama',
    level: 0,
    categoryId: 'cat1',
    difficulty: 1,
    imageUrl: null,
    audioUrl: null,
    createdAt: new Date(),
    category: {
      id: 'cat1',
      name: 'Family',
      description: 'Family members',
      icon: '👨‍👩‍👧‍👦'
    }
  },
  {
    id: 'w2',
    text: 'ball',
    level: 0,
    categoryId: 'cat2',
    difficulty: 1,
    imageUrl: null,
    audioUrl: null,
    createdAt: new Date(),
    category: {
      id: 'cat2',
      name: 'Toys',
      description: 'Toys and playthings',
      icon: '🧸'
    }
  },
  {
    id: 'w3',
    text: 'milk',
    level: 0,
    categoryId: 'cat3',
    difficulty: 1,
    imageUrl: null,
    audioUrl: null,
    createdAt: new Date(),
    category: {
      id: 'cat3',
      name: 'Food',
      description: 'Food and drinks',
      icon: '🍎'
    }
  }
];

const mockExercise = {
  id: 'ex1',
  title: 'Point to Mama',
  description: 'Help your child identify family members',
  type: 'WORD_RECOGNITION' as const,
  level: 0,
  categoryId: 'cat1',
  wordId: 'w1',
  content: {
    targetWord: 'mama',
    images: [
      { url: '/images/mama.jpg', isCorrect: true, alt: 'Mother holding baby' },
      { url: '/images/dada.jpg', isCorrect: false, alt: 'Father with child' },
      { url: '/images/baby.jpg', isCorrect: false, alt: 'Baby playing' }
    ],
    instruction: 'Point to mama!'
  },
  mediaUrl: null,
  createdAt: new Date()
};

export default function DemoPage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'vocabulary' | 'exercise'>('dashboard');

  const handleWordAdded = (wordId: string, notes?: string) => {
    console.log('Word added:', wordId, notes);
    // In a real app, this would update the database
  };

  const handleWordRemoved = (wordId: string) => {
    console.log('Word removed:', wordId);
    // In a real app, this would update the database
  };

  const handleExerciseComplete = (result: any) => {
    console.log('Exercise completed:', result);
    // In a real app, this would save the result to the database
    setCurrentView('dashboard');
  };

  const handleExerciseSkip = () => {
    console.log('Exercise skipped');
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              🗣️ SpeechBuddy Demo
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setCurrentView('vocabulary')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'vocabulary'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📚 Vocabulary
              </button>
              <button
                onClick={() => setCurrentView('exercise')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'exercise'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🎯 Exercise
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-yellow-800">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium">
              This is a demo with mock data. In the real app, data would be stored in a database.
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {currentView === 'dashboard' && <Dashboard child={mockChild} />}
      
      {currentView === 'vocabulary' && (
        <VocabularyManager
          childId={mockChild.id}
          level={mockChild.level}
          knownWords={mockChild.knownWords}
          availableWords={mockAvailableWords}
          onWordAdded={handleWordAdded}
          onWordRemoved={handleWordRemoved}
        />
      )}
      
      {currentView === 'exercise' && (
        <ExerciseInterface
          exercise={mockExercise}
          onComplete={handleExerciseComplete}
          onSkip={handleExerciseSkip}
        />
      )}
    </div>
  );
}
