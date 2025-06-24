'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const addChildSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  birthDate: z.string().min(1, 'Birth date is required'),
});

// Calculate speech level based on age
function calculateSpeechLevel(birthDate: Date): number {
  const now = new Date();
  const ageInMonths = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  
  if (ageInMonths < 12) return 0;      // 0-12 months
  if (ageInMonths < 24) return 1;      // 12-24 months  
  if (ageInMonths < 36) return 2;      // 2-3 years
  return 3;                            // 3+ years
}

export async function addChildAction(prevState: unknown, formData: FormData) {
  const rawData = {
    name: formData.get('name') as string,
    birthDate: formData.get('birthDate') as string,
  };

  // Validate input
  const validatedData = addChildSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      error: validatedData.error.errors[0].message,
    };
  }

  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        error: 'You must be signed in to add a child',
      };
    }

    // Parse birth date and calculate suggested level
    const birthDate = new Date(validatedData.data.birthDate);
    const suggestedLevel = calculateSpeechLevel(birthDate);

    console.log('Adding child:', {
      name: validatedData.data.name,
      birthDate: birthDate.toISOString(),
      suggestedLevel,
      userId: session.user.id
    });

    // Create child in database with suggested level (parent will assess actual level)
    const child = await prisma.child.create({
      data: {
        name: validatedData.data.name,
        birthDate: birthDate,
        level: suggestedLevel, // This will be updated after assessment
        userId: session.user.id,
      },
    });

    console.log('Child created successfully:', child);
  } catch (error) {
    console.error('Add child error:', error);
    return {
      error: 'An error occurred while adding the child',
    };
  }

  // Redirect to children page on success (outside try-catch to avoid catching NEXT_REDIRECT)
  redirect('/dashboard/children');
}

export async function getChildrenAction() {
  try {
    console.log('getChildrenAction called');

    // Get current user session (nextCookies plugin handles cookie management)
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log('getChildren session:', session?.user?.id ? `Found: ${session.user.id}` : 'Not found');

    if (!session?.user?.id) {
      console.log('No session in getChildren');
      return { children: [] };
    }

    // Get children for current user with statistics
    const children = await prisma.child.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        knownWords: true, // Include known words (ChildWord relation)
        exerciseResults: true, // Include exercise results
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform children data to include statistics
    const childrenWithStats = children.map(child => {
      const knownWordsCount = child.knownWords.length;
      const exercisesCount = child.exerciseResults.length;

      // Calculate days since creation
      const daysSinceCreation = Math.floor(
        (new Date().getTime() - child.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        id: child.id,
        name: child.name,
        birthDate: child.birthDate,
        level: child.level,
        createdAt: child.createdAt,
        updatedAt: child.updatedAt,
        stats: {
          knownWords: knownWordsCount,
          exercises: exercisesCount,
          days: daysSinceCreation
        }
      };
    });

    console.log(`Found ${children.length} children for user ${session.user.id}`);

    return { children: childrenWithStats };
  } catch (error) {
    console.error('Get children error:', error);
    return { children: [] };
  }
}



// New action that accepts userId directly from client
export async function getChildrenByUserIdAction(userId: string) {
  try {
    console.log('getChildrenByUserIdAction called for user:', userId);

    if (!userId) {
      return { children: [] };
    }

    // Get children for specified user
    const children = await prisma.child.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('Found children:', children.length);
    return { children };
  } catch (error) {
    console.error('Get children by userId error:', error);
    return { children: [] };
  }
}

export async function deleteChildAction(childId: string) {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        error: 'You must be signed in to delete a child',
      };
    }

    // Verify child belongs to current user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: session.user.id,
      },
    });

    if (!child) {
      return {
        error: 'Child not found or you do not have permission to delete this child',
      };
    }

    // Delete child (cascade will handle related records)
    await prisma.child.delete({
      where: {
        id: childId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete child error:', error);
    return {
      error: 'An error occurred while deleting the child',
    };
  }
}

export async function updateChildLevelAction(prevState: unknown, formData: FormData) {
  console.log('updateChildLevelAction called');

  const childId = formData.get('childId') as string;
  const level = parseInt(formData.get('level') as string);

  console.log('Form data:', { childId, level });

  if (!childId || isNaN(level)) {
    console.log('Invalid form data');
    return {
      error: 'Invalid child ID or level',
    };
  }
  try {
    console.log('Getting session...');
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log('Session:', session?.user?.id ? `Found: ${session.user.id}` : 'Not found');

    if (!session?.user?.id) {
      return {
        error: 'You must be signed in to update a child',
      };
    }

    // Verify child belongs to current user
    const child = await prisma.child.findFirst({
      where: {
        id: childId,
        userId: session.user.id,
      },
    });

    if (!child) {
      return {
        error: 'Child not found or you do not have permission to update this child',
      };
    }

    // Update child level
    await prisma.child.update({
      where: {
        id: childId,
      },
      data: {
        level: level,
      },
    });

    console.log(`Updated child ${childId} to level ${level}`);
  } catch (error) {
    console.error('Update child level error:', error);
    return {
      error: 'An error occurred while updating the child level',
    };
  }

  // Redirect to children page on success (outside try-catch to avoid catching NEXT_REDIRECT)
  redirect('/dashboard/children');
}
