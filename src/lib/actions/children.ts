'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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

export async function addChildAction(prevState: any, formData: FormData) {
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
      headers: await headers()
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

    return { success: true };
  } catch (error) {
    console.error('Add child error:', error);
    return {
      error: 'An error occurred while adding the child',
    };
  }
}

export async function getChildrenAction() {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user?.id) {
      return { children: [] };
    }

    // Get children for current user
    const children = await prisma.child.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { children };
  } catch (error) {
    console.error('Get children error:', error);
    return { children: [] };
  }
}

export async function deleteChildAction(childId: string) {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers()
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

export async function updateChildLevelAction(childId: string, level: number) {
  try {
    // Get current user session
    const session = await auth.api.getSession({
      headers: await headers()
    });

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

    return { success: true };
  } catch (error) {
    console.error('Update child level error:', error);
    return {
      error: 'An error occurred while updating the child level',
    };
  }
}
