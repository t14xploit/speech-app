// Exercise templates and data for speech therapy app
// Based on different exercise types for each level

export interface ExerciseTemplate {
  title: string;
  description: string;
  type: string; // Maps to ExerciseType enum
  level: number;
  categoryId?: string;
  wordId?: string;
  content: any; // JSON content structure
  mediaUrl?: string;
}

// Exercise content structures for different types
export interface WordRecognitionContent {
  targetWord: string;
  images: Array<{
    url: string;
    isCorrect: boolean;
    alt: string;
  }>;
  instruction: string;
}

export interface PronunciationContent {
  targetWord: string;
  audioUrl: string;
  phonetics?: string;
  instruction: string;
  tips?: string[];
}

export interface MatchingContent {
  pairs: Array<{
    word: string;
    imageUrl: string;
  }>;
  instruction: string;
}

export interface CategorizationContent {
  categories: Array<{
    name: string;
    icon: string;
  }>;
  items: Array<{
    word: string;
    imageUrl: string;
    correctCategory: string;
  }>;
  instruction: string;
}

export interface FillInBlankContent {
  sentence: string; // Use {blank} as placeholder
  options: string[];
  correctAnswer: string;
  imageUrl?: string;
  instruction: string;
}

export interface StoryTellingContent {
  storyPrompt: string;
  targetWords: string[];
  imagePrompts?: string[];
  instruction: string;
}

export interface SoundRecognitionContent {
  targetSound: string;
  words: Array<{
    word: string;
    hasTargetSound: boolean;
    audioUrl?: string;
  }>;
  instruction: string;
}

// Exercise templates for each level
export const exerciseTemplates: ExerciseTemplate[] = [
  // Level 0 Exercises (12-18 months)
  {
    title: "Point to Mama",
    description: "Help your child identify family members",
    type: "WORD_RECOGNITION",
    level: 0,
    content: {
      targetWord: "mama",
      images: [
        { url: "/images/mama.jpg", isCorrect: true, alt: "Mother holding baby" },
        { url: "/images/dada.jpg", isCorrect: false, alt: "Father with child" },
        { url: "/images/baby.jpg", isCorrect: false, alt: "Baby playing" }
      ],
      instruction: "Point to mama!"
    } as WordRecognitionContent
  },
  {
    title: "Say Bye-Bye",
    description: "Practice waving and saying goodbye",
    type: "PRONUNCIATION",
    level: 0,
    content: {
      targetWord: "bye",
      audioUrl: "/audio/bye.mp3",
      instruction: "Wave your hand and say 'bye-bye'",
      tips: ["Make it fun with exaggerated waving", "Repeat several times"]
    } as PronunciationContent
  },
  {
    title: "More Milk",
    description: "Learn to ask for more",
    type: "WORD_RECOGNITION",
    level: 0,
    content: {
      targetWord: "more",
      images: [
        { url: "/images/more-milk.jpg", isCorrect: true, alt: "Glass of milk" },
        { url: "/images/empty-cup.jpg", isCorrect: false, alt: "Empty cup" },
        { url: "/images/water.jpg", isCorrect: false, alt: "Glass of water" }
      ],
      instruction: "Which one shows MORE milk?"
    } as WordRecognitionContent
  },

  // Level 1 Exercises (18-24 months)
  {
    title: "Animal Sounds",
    description: "Match animals with their sounds",
    type: "MATCHING",
    level: 1,
    content: {
      pairs: [
        { word: "moo", imageUrl: "/images/cow.jpg" },
        { word: "woof", imageUrl: "/images/dog.jpg" },
        { word: "meow", imageUrl: "/images/cat.jpg" }
      ],
      instruction: "Match each animal with its sound!"
    } as MatchingContent
  },
  {
    title: "Body Parts Song",
    description: "Point to body parts while singing",
    type: "WORD_RECOGNITION",
    level: 1,
    content: {
      targetWord: "nose",
      images: [
        { url: "/images/nose.jpg", isCorrect: true, alt: "Child touching nose" },
        { url: "/images/eye.jpg", isCorrect: false, alt: "Child pointing to eye" },
        { url: "/images/mouth.jpg", isCorrect: false, alt: "Child pointing to mouth" }
      ],
      instruction: "Touch your nose!"
    } as WordRecognitionContent
  },
  {
    title: "Two-Word Phrases",
    description: "Practice combining words",
    type: "FILL_IN_BLANK",
    level: 1,
    content: {
      sentence: "More {blank}",
      options: ["milk", "water", "juice"],
      correctAnswer: "milk",
      imageUrl: "/images/milk-glass.jpg",
      instruction: "What do you want more of?"
    } as FillInBlankContent
  },

  // Level 2 Exercises (2-3 years)
  {
    title: "Sort the Animals",
    description: "Put animals in the right groups",
    type: "CATEGORIZATION",
    level: 2,
    content: {
      categories: [
        { name: "Farm Animals", icon: "🚜" },
        { name: "Wild Animals", icon: "🌳" },
        { name: "Pets", icon: "🏠" }
      ],
      items: [
        { word: "cow", imageUrl: "/images/cow.jpg", correctCategory: "Farm Animals" },
        { word: "lion", imageUrl: "/images/lion.jpg", correctCategory: "Wild Animals" },
        { word: "dog", imageUrl: "/images/dog.jpg", correctCategory: "Pets" },
        { word: "pig", imageUrl: "/images/pig.jpg", correctCategory: "Farm Animals" },
        { word: "cat", imageUrl: "/images/cat.jpg", correctCategory: "Pets" },
        { word: "elephant", imageUrl: "/images/elephant.jpg", correctCategory: "Wild Animals" }
      ],
      instruction: "Put each animal where it belongs!"
    } as CategorizationContent
  },
  {
    title: "Color Hunt",
    description: "Find objects of specific colors",
    type: "WORD_RECOGNITION",
    level: 2,
    content: {
      targetWord: "red",
      images: [
        { url: "/images/red-apple.jpg", isCorrect: true, alt: "Red apple" },
        { url: "/images/blue-ball.jpg", isCorrect: false, alt: "Blue ball" },
        { url: "/images/yellow-banana.jpg", isCorrect: false, alt: "Yellow banana" },
        { url: "/images/red-car.jpg", isCorrect: true, alt: "Red car" }
      ],
      instruction: "Find all the RED things!"
    } as WordRecognitionContent
  },
  {
    title: "Complete the Sentence",
    description: "Fill in missing words in sentences",
    type: "FILL_IN_BLANK",
    level: 2,
    content: {
      sentence: "The cat is {blank} the chair.",
      options: ["on", "under", "beside"],
      correctAnswer: "on",
      imageUrl: "/images/cat-on-chair.jpg",
      instruction: "Where is the cat?"
    } as FillInBlankContent
  },
  {
    title: "First Sound Game",
    description: "Identify words that start with the same sound",
    type: "SOUND_RECOGNITION",
    level: 2,
    content: {
      targetSound: "b",
      words: [
        { word: "ball", hasTargetSound: true, audioUrl: "/audio/ball.mp3" },
        { word: "cat", hasTargetSound: false, audioUrl: "/audio/cat.mp3" },
        { word: "book", hasTargetSound: true, audioUrl: "/audio/book.mp3" },
        { word: "dog", hasTargetSound: false, audioUrl: "/audio/dog.mp3" }
      ],
      instruction: "Which words start with the 'b' sound?"
    } as SoundRecognitionContent
  },

  // Level 3 Exercises (3-4 years)
  {
    title: "Tell a Story",
    description: "Create a story using specific words",
    type: "STORY_TELLING",
    level: 3,
    content: {
      storyPrompt: "Tell me about a day at the park",
      targetWords: ["playground", "swing", "slide", "friends", "fun"],
      imagePrompts: ["/images/park.jpg", "/images/playground.jpg"],
      instruction: "Use these words to tell your story: playground, swing, slide, friends, fun"
    } as StoryTellingContent
  },
  {
    title: "Emotion Detective",
    description: "Identify emotions in different situations",
    type: "WORD_RECOGNITION",
    level: 3,
    content: {
      targetWord: "excited",
      images: [
        { url: "/images/excited-child.jpg", isCorrect: true, alt: "Child jumping with joy" },
        { url: "/images/sad-child.jpg", isCorrect: false, alt: "Child looking sad" },
        { url: "/images/angry-child.jpg", isCorrect: false, alt: "Child looking angry" },
        { url: "/images/scared-child.jpg", isCorrect: false, alt: "Child looking scared" }
      ],
      instruction: "Which child looks EXCITED?"
    } as WordRecognitionContent
  },
  {
    title: "Rhyme Time",
    description: "Find words that rhyme",
    type: "MATCHING",
    level: 3,
    content: {
      pairs: [
        { word: "cat", imageUrl: "/images/cat.jpg" },
        { word: "hat", imageUrl: "/images/hat.jpg" },
        { word: "dog", imageUrl: "/images/dog.jpg" },
        { word: "frog", imageUrl: "/images/frog.jpg" }
      ],
      instruction: "Match the words that rhyme!"
    } as MatchingContent
  },
  {
    title: "Complex Sentences",
    description: "Build longer, more complex sentences",
    type: "FILL_IN_BLANK",
    level: 3,
    content: {
      sentence: "Yesterday I {blank} to the store with my mom.",
      options: ["go", "went", "going"],
      correctAnswer: "went",
      imageUrl: "/images/shopping.jpg",
      instruction: "Choose the correct word for past tense"
    } as FillInBlankContent
  },
  {
    title: "Sequence Story",
    description: "Put story events in the right order",
    type: "CATEGORIZATION",
    level: 3,
    content: {
      categories: [
        { name: "First", icon: "1️⃣" },
        { name: "Second", icon: "2️⃣" },
        { name: "Third", icon: "3️⃣" }
      ],
      items: [
        { word: "Wake up", imageUrl: "/images/wake-up.jpg", correctCategory: "First" },
        { word: "Eat breakfast", imageUrl: "/images/breakfast.jpg", correctCategory: "Second" },
        { word: "Go to school", imageUrl: "/images/school.jpg", correctCategory: "Third" }
      ],
      instruction: "Put these morning activities in order!"
    } as CategorizationContent
  }
];

// Helper functions
export function getExercisesByLevel(level: number): ExerciseTemplate[] {
  return exerciseTemplates.filter(exercise => exercise.level === level);
}

export function getExercisesByType(type: string): ExerciseTemplate[] {
  return exerciseTemplates.filter(exercise => exercise.type === type);
}

export function getExercisesByLevelAndType(level: number, type: string): ExerciseTemplate[] {
  return exerciseTemplates.filter(exercise => exercise.level === level && exercise.type === type);
}
