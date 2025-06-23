'use server';

import { signIn, signUp, signOut } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Validation schemas
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function signInAction(prevState: any, formData: FormData) {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate input
  const validatedData = signInSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      error: validatedData.error.errors[0].message,
    };
  }

  try {
    console.log('Attempting sign in for:', validatedData.data.email);
    const result = await signIn.email({
      email: validatedData.data.email,
      password: validatedData.data.password,
    });

    console.log('Sign in result:', result);

    if (result.error) {
      console.log('Sign in failed:', result.error);
      return {
        error: result.error.message || 'Invalid email or password',
      };
    }

    // Successful sign in - redirect will be handled by the client
    console.log('Sign in successful, returning success state');
    return { success: true };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      error: 'An error occurred during sign in',
    };
  }
}

export async function signUpAction(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate input
  const validatedData = signUpSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      error: validatedData.error.errors[0].message,
    };
  }

  try {
    console.log('Attempting sign up for:', validatedData.data.email);
    console.log('Password length:', validatedData.data.password.length);

    const result = await signUp.email({
      email: validatedData.data.email,
      password: validatedData.data.password,
      name: validatedData.data.name,
    });

    console.log('Sign up result:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.log('Sign up failed:', result.error);
      return {
        error: result.error.message || 'Failed to create account',
      };
    }

    // Successful sign up - redirect will be handled by the client
    console.log('Sign up successful, returning success state');
    return { success: true };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      error: 'An error occurred during sign up',
    };
  }
}

export async function signOutAction() {
  try {
    await signOut();
    redirect('/');
  } catch (error) {
    console.error('Sign out error:', error);
    // Even if there's an error, redirect to home
    redirect('/');
  }
}
