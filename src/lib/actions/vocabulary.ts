'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getCategoriesWithWords() {
  try {
    console.log('Getting categories with words...');

    const categories = await prisma.category.findMany({
      include: {
        words: {
          orderBy: [
            { level: 'asc' },
            { difficulty: 'asc' },
            { text: 'asc' }
          ]
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    console.log(`Found ${categories.length} categories`);
    console.log(`Total words: ${categories.reduce((total, cat) => total + cat.words.length, 0)}`);

    // Transform the data to ensure each word has category info
    const transformedCategories = categories.map(category => ({
      ...category,
      words: category.words.map(word => ({
        ...word,
        category: {
          id: category.id,
          name: category.name,
          icon: category.icon || '📝'
        }
      }))
    }));

    return { categories: transformedCategories };
  } catch (error) {
    console.error('Get categories error:', error);
    return { categories: [] };
  }
}

export async function getChildVocabulary(childId: string) {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { knownWords: [], learningWords: [] };
    }

    // Verify child belongs to current user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: session.user.id,
      },
    });

    if (!child) {
      return { knownWords: [], learningWords: [] };
    }

    // Get child's known words
    const childWords = await prisma.childWord.findMany({
      where: {
        childId: childId,
      },
      include: {
        word: {
          include: {
            category: true
          }
        }
      }
    });

    return { 
      knownWords: childWords.map(cw => cw.word),
      learningWords: [] // We can add this status later
    };
  } catch (error) {
    console.error('Get child vocabulary error:', error);
    return { knownWords: [], learningWords: [] };
  }
}

// Function to calculate appropriate level based on known words
async function calculateChildLevel(childId: string): Promise<number> {
  // Get all known words for the child with their levels
  const knownWords = await prisma.childWord.findMany({
    where: { childId },
    include: {
      word: true
    }
  });

  // Count words by level
  const wordsByLevel = {
    0: knownWords.filter(cw => cw.word.level === 0).length,
    1: knownWords.filter(cw => cw.word.level === 1).length,
    2: knownWords.filter(cw => cw.word.level === 2).length,
    3: knownWords.filter(cw => cw.word.level === 3).length,
  };

  // Level progression thresholds based on speech development milestones
  // Level 0: 0-10 words (early sounds)
  // Level 1: 10-50 words (single words)
  // Level 2: 50-200 words (word combinations)
  // Level 3: 200+ words (complex speech)

  const totalWords = knownWords.length;

  if (totalWords >= 200) return 3;
  if (totalWords >= 50) return 2;
  if (totalWords >= 10) return 1;
  return 0;
}

export async function updateWordStatus(childId: string, wordId: string, status: 'known' | 'learning' | 'remove') {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { error: 'You must be signed in' };
    }

    // Verify child belongs to current user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: session.user.id,
      },
    });

    if (!child) {
      return { error: 'Child not found or access denied' };
    }

    if (status === 'remove') {
      // Remove word from child's vocabulary
      await prisma.childWord.deleteMany({
        where: {
          childId: childId,
          wordId: wordId,
        },
      });
    } else if (status === 'known') {
      // Add or update word as known
      await prisma.childWord.upsert({
        where: {
          childId_wordId: {
            childId: childId,
            wordId: wordId,
          },
        },
        update: {
          dateLearned: new Date(),
          notes: 'Known',
        },
        create: {
          childId: childId,
          wordId: wordId,
          dateLearned: new Date(),
          notes: 'Known',
        },
      });
    }
    // For 'learning' status, we could add a separate field or use notes

    // Automatically assess and update child's level based on vocabulary progress
    const newLevel = await calculateChildLevel(childId);

    // Update child's level if it has changed
    if (newLevel !== child.level) {
      await prisma.child.update({
        where: { id: childId },
        data: { level: newLevel }
      });

      console.log(`Child ${childId} level automatically updated from ${child.level} to ${newLevel}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Update word status error:', error);
    return { error: 'Failed to update word status' };
  }
}
