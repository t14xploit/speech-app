'use client';

import { useState, useEffect } from 'react';
import { Exercise, ExerciseResult } from '@/generated/prisma';

interface ExerciseInterfaceProps {
  exercise: Exercise;
  onComplete: (result: {
    status: 'COMPLETED' | 'ATTEMPTED';
    score?: number;
    timeSpent: number;
    notes?: string;
  }) => void;
  onSkip: () => void;
}

interface WordRecognitionContent {
  targetWord: string;
  images: Array<{
    url: string;
    isCorrect: boolean;
    alt: string;
  }>;
  instruction: string;
}

interface PronunciationContent {
  targetWord: string;
  audioUrl: string;
  phonetics?: string;
  instruction: string;
  tips?: string[];
}

interface MatchingContent {
  pairs: Array<{
    word: string;
    imageUrl: string;
  }>;
  instruction: string;
}

export default function ExerciseInterface({ exercise, onComplete, onSkip }: ExerciseInterfaceProps) {
  const [startTime] = useState(Date.now());
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const getTimeSpent = () => Math.floor((Date.now() - startTime) / 1000);

  const handleSubmit = () => {
    const timeSpent = getTimeSpent();
    let score = 0;
    let status: 'COMPLETED' | 'ATTEMPTED' = 'ATTEMPTED';

    // Calculate score based on exercise type
    if (exercise.type === 'WORD_RECOGNITION') {
      const content = exercise.content as unknown as WordRecognitionContent;
      const correctImages = content.images.filter(img => img.isCorrect);
      const selectedCorrect = selectedAnswers.filter(answer => 
        correctImages.some(img => img.url === answer)
      );
      score = Math.round((selectedCorrect.length / correctImages.length) * 100);
      status = score >= 70 ? 'COMPLETED' : 'ATTEMPTED';
    } else if (exercise.type === 'MATCHING') {
      // For matching exercises, we'd need more complex logic
      score = selectedAnswers.length > 0 ? 80 : 0;
      status = score >= 70 ? 'COMPLETED' : 'ATTEMPTED';
    } else {
      // Default scoring
      score = selectedAnswers.length > 0 ? 75 : 0;
      status = score >= 70 ? 'COMPLETED' : 'ATTEMPTED';
    }

    setIsCorrect(score >= 70);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete({
        status,
        score,
        timeSpent,
        notes: `Attempts: ${attempts + 1}, Score: ${score}%`
      });
    }, 2000);
  };

  const handleTryAgain = () => {
    setAttempts(prev => prev + 1);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const renderWordRecognition = () => {
    const content = exercise.content as unknown as WordRecognitionContent;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {content.instruction}
          </h2>
          <div className="text-lg text-blue-600 font-semibold">
            "{content.targetWord}"
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                if (selectedAnswers.includes(image.url)) {
                  setSelectedAnswers(prev => prev.filter(url => url !== image.url));
                } else {
                  setSelectedAnswers(prev => [...prev, image.url]);
                }
              }}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                ${selectedAnswers.includes(image.url)
                  ? 'border-blue-500 bg-blue-50 scale-105'
                  : 'border-gray-300 bg-white hover:border-gray-400'
                }
              `}
              disabled={showFeedback}
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-4xl">🖼️</span>
                {/* In a real app, you'd use an actual image */}
                <div className="absolute bottom-2 left-2 right-2 text-xs text-gray-600 bg-white bg-opacity-75 rounded px-1">
                  {image.alt}
                </div>
              </div>
              {selectedAnswers.includes(image.url) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderPronunciation = () => {
    const content = exercise.content as unknown as PronunciationContent;
    
    return (
      <div className="space-y-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {content.instruction}
          </h2>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {content.targetWord}
          </div>
          {content.phonetics && (
            <div className="text-lg text-gray-600 mb-4">
              /{content.phonetics}/
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 mb-4 transition-colors">
            <span className="text-2xl">🔊</span>
          </button>
          <div className="text-sm text-gray-600">
            Click to hear the word
          </div>
        </div>

        {content.tips && (
          <div className="bg-yellow-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Tips:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {content.tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setSelectedAnswers(['practiced'])}
          className={`
            px-6 py-3 rounded-xl font-semibold transition-colors
            ${selectedAnswers.includes('practiced')
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {selectedAnswers.includes('practiced') ? '✓ Practiced!' : 'Mark as Practiced'}
        </button>
      </div>
    );
  };

  const renderMatching = () => {
    const content = exercise.content as unknown as MatchingContent;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {content.instruction}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Words column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-center">Words</h3>
            {content.pairs.map((pair, index) => (
              <button
                key={`word-${index}`}
                onClick={() => {
                  const wordKey = `word-${index}`;
                  if (selectedAnswers.includes(wordKey)) {
                    setSelectedAnswers(prev => prev.filter(item => item !== wordKey));
                  } else {
                    setSelectedAnswers(prev => [...prev, wordKey]);
                  }
                }}
                className={`
                  w-full p-3 rounded-lg border-2 transition-all duration-200
                  ${selectedAnswers.includes(`word-${index}`)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                  }
                `}
              >
                {pair.word}
              </button>
            ))}
          </div>

          {/* Images column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-center">Pictures</h3>
            {content.pairs.map((pair, index) => (
              <button
                key={`image-${index}`}
                onClick={() => {
                  const imageKey = `image-${index}`;
                  if (selectedAnswers.includes(imageKey)) {
                    setSelectedAnswers(prev => prev.filter(item => item !== imageKey));
                  } else {
                    setSelectedAnswers(prev => [...prev, imageKey]);
                  }
                }}
                className={`
                  w-full p-3 rounded-lg border-2 transition-all duration-200 aspect-square
                  ${selectedAnswers.includes(`image-${index}`)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                  }
                `}
              >
                <div className="flex items-center justify-center h-full">
                  <span className="text-3xl">🖼️</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'WORD_RECOGNITION':
        return renderWordRecognition();
      case 'PRONUNCIATION':
        return renderPronunciation();
      case 'MATCHING':
        return renderMatching();
      default:
        return (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🚧</div>
            <div className="text-xl font-semibold text-gray-600">
              Exercise type not yet implemented
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {exercise.title}
              </h1>
              <p className="text-gray-600 mt-1">
                {exercise.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Level {exercise.level}</div>
              <div className="text-sm text-gray-500">
                Time: {Math.floor(getTimeSpent() / 60)}:{(getTimeSpent() % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {renderExerciseContent()}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`
            bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4
            ${isCorrect ? 'border-green-500' : 'border-yellow-500'}
          `}>
            <div className="text-center">
              <div className="text-4xl mb-2">
                {isCorrect ? '🎉' : '💪'}
              </div>
              <div className="text-xl font-semibold text-gray-800 mb-2">
                {isCorrect ? 'Great job!' : 'Good try!'}
              </div>
              <div className="text-gray-600">
                {isCorrect 
                  ? 'You completed this exercise successfully!'
                  : 'Keep practicing - you\'re doing great!'
                }
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onSkip}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            disabled={showFeedback}
          >
            Skip Exercise
          </button>
          
          <div className="space-x-3">
            {showFeedback && !isCorrect && (
              <button
                onClick={handleTryAgain}
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
              >
                Try Again
              </button>
            )}
            
            {!showFeedback && (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswers.length === 0}
                className={`
                  px-6 py-3 rounded-xl font-semibold transition-colors
                  ${selectedAnswers.length > 0
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
