// Vocabulary data based on speech development milestones
// Level 0: 12-18 months (0-50 words)
// Level 1: 18-24 months (50-200 words)
// Level 2: 2-3 years (200-1000 words)
// Level 3: 3-4 years (1000+ words)

export interface VocabularyCategory {
  name: string;
  description: string;
  icon: string;
}

export interface VocabularyWord {
  text: string;
  level: number;
  category: string;
  difficulty: number; // 1-5 within level
  imageUrl?: string;
  audioUrl?: string;
}

export const categories: VocabularyCategory[] = [
  {
    name: "Family",
    description: "Family members and relationships",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    name: "Body Parts",
    description: "Parts of the body",
    icon: "👤"
  },
  {
    name: "Food",
    description: "Food and drinks",
    icon: "🍎"
  },
  {
    name: "Animals",
    description: "Animals and pets",
    icon: "🐶"
  },
  {
    name: "Toys",
    description: "Toys and playthings",
    icon: "🧸"
  },
  {
    name: "Actions",
    description: "Action words and verbs",
    icon: "🏃"
  },
  {
    name: "Colors",
    description: "Colors and visual descriptions",
    icon: "🌈"
  },
  {
    name: "Numbers",
    description: "Numbers and counting",
    icon: "🔢"
  },
  {
    name: "Clothing",
    description: "Clothes and accessories",
    icon: "👕"
  },
  {
    name: "Transportation",
    description: "Vehicles and transportation",
    icon: "🚗"
  },
  {
    name: "Home",
    description: "House and household items",
    icon: "🏠"
  },
  {
    name: "Nature",
    description: "Nature and weather",
    icon: "🌳"
  },
  {
    name: "Emotions",
    description: "Feelings and emotions",
    icon: "😊"
  },
  {
    name: "Social",
    description: "Social words and greetings",
    icon: "👋"
  }
];

export const vocabularyWords: VocabularyWord[] = [
  // Level 0: 12-18 months (First words, 0-50 vocabulary)
  // Family - Most important first words
  { text: "mama", level: 0, category: "Family", difficulty: 1 },
  { text: "dada", level: 0, category: "Family", difficulty: 1 },
  { text: "baby", level: 0, category: "Family", difficulty: 2 },
  
  // Body Parts - Basic body awareness
  { text: "eye", level: 0, category: "Body Parts", difficulty: 2 },
  { text: "nose", level: 0, category: "Body Parts", difficulty: 2 },
  { text: "mouth", level: 0, category: "Body Parts", difficulty: 3 },
  
  // Food - Essential needs
  { text: "milk", level: 0, category: "Food", difficulty: 1 },
  { text: "water", level: 0, category: "Food", difficulty: 2 },
  { text: "more", level: 0, category: "Food", difficulty: 1 },
  { text: "eat", level: 0, category: "Food", difficulty: 2 },
  
  // Animals - Common first animal words
  { text: "dog", level: 0, category: "Animals", difficulty: 1 },
  { text: "cat", level: 0, category: "Animals", difficulty: 1 },
  { text: "moo", level: 0, category: "Animals", difficulty: 1 }, // Animal sounds
  
  // Actions - Basic verbs
  { text: "go", level: 0, category: "Actions", difficulty: 1 },
  { text: "up", level: 0, category: "Actions", difficulty: 1 },
  { text: "bye", level: 0, category: "Social", difficulty: 1 },
  { text: "hi", level: 0, category: "Social", difficulty: 1 },
  
  // Essential words
  { text: "no", level: 0, category: "Social", difficulty: 1 },
  { text: "yes", level: 0, category: "Social", difficulty: 2 },
  { text: "mine", level: 0, category: "Social", difficulty: 2 },
  
  // Toys and objects
  { text: "ball", level: 0, category: "Toys", difficulty: 1 },
  { text: "book", level: 0, category: "Toys", difficulty: 2 },
  { text: "car", level: 0, category: "Transportation", difficulty: 1 },
  
  // Level 1: 18-24 months (50-200 words, 2-word phrases)
  // Family expansion
  { text: "mommy", level: 1, category: "Family", difficulty: 1 },
  { text: "daddy", level: 1, category: "Family", difficulty: 1 },
  { text: "grandma", level: 1, category: "Family", difficulty: 3 },
  { text: "grandpa", level: 1, category: "Family", difficulty: 3 },
  
  // Body Parts expansion
  { text: "hand", level: 1, category: "Body Parts", difficulty: 1 },
  { text: "foot", level: 1, category: "Body Parts", difficulty: 1 },
  { text: "head", level: 1, category: "Body Parts", difficulty: 1 },
  { text: "hair", level: 1, category: "Body Parts", difficulty: 2 },
  { text: "ear", level: 1, category: "Body Parts", difficulty: 2 },
  
  // Food expansion
  { text: "apple", level: 1, category: "Food", difficulty: 2 },
  { text: "banana", level: 1, category: "Food", difficulty: 3 },
  { text: "cookie", level: 1, category: "Food", difficulty: 2 },
  { text: "juice", level: 1, category: "Food", difficulty: 2 },
  { text: "bread", level: 1, category: "Food", difficulty: 2 },
  
  // Animals expansion
  { text: "bird", level: 1, category: "Animals", difficulty: 2 },
  { text: "fish", level: 1, category: "Animals", difficulty: 2 },
  { text: "horse", level: 1, category: "Animals", difficulty: 2 },
  { text: "pig", level: 1, category: "Animals", difficulty: 2 },
  
  // Actions expansion
  { text: "walk", level: 1, category: "Actions", difficulty: 2 },
  { text: "run", level: 1, category: "Actions", difficulty: 2 },
  { text: "sit", level: 1, category: "Actions", difficulty: 2 },
  { text: "come", level: 1, category: "Actions", difficulty: 2 },
  { text: "help", level: 1, category: "Actions", difficulty: 2 },
  
  // Colors - first colors
  { text: "red", level: 1, category: "Colors", difficulty: 2 },
  { text: "blue", level: 1, category: "Colors", difficulty: 2 },
  
  // Numbers - first numbers
  { text: "one", level: 1, category: "Numbers", difficulty: 2 },
  { text: "two", level: 1, category: "Numbers", difficulty: 3 },
  
  // Clothing basics
  { text: "shoe", level: 1, category: "Clothing", difficulty: 2 },
  { text: "hat", level: 1, category: "Clothing", difficulty: 2 },
  
  // Home items
  { text: "bed", level: 1, category: "Home", difficulty: 2 },
  { text: "chair", level: 1, category: "Home", difficulty: 2 },
  { text: "door", level: 1, category: "Home", difficulty: 2 },
  
  // Transportation
  { text: "bus", level: 1, category: "Transportation", difficulty: 2 },
  { text: "truck", level: 1, category: "Transportation", difficulty: 2 },
  
  // Social expansion
  { text: "please", level: 1, category: "Social", difficulty: 3 },
  { text: "thank you", level: 1, category: "Social", difficulty: 4 },
  
  // Level 2: 2-3 years (200-1000 words, 3-word sentences)
  // Family relationships
  { text: "brother", level: 2, category: "Family", difficulty: 3 },
  { text: "sister", level: 2, category: "Family", difficulty: 3 },
  { text: "uncle", level: 2, category: "Family", difficulty: 3 },
  { text: "aunt", level: 2, category: "Family", difficulty: 3 },
  
  // Body Parts detailed
  { text: "finger", level: 2, category: "Body Parts", difficulty: 3 },
  { text: "toe", level: 2, category: "Body Parts", difficulty: 3 },
  { text: "knee", level: 2, category: "Body Parts", difficulty: 3 },
  { text: "elbow", level: 2, category: "Body Parts", difficulty: 4 },
  { text: "shoulder", level: 2, category: "Body Parts", difficulty: 4 },
  
  // Food variety
  { text: "cheese", level: 2, category: "Food", difficulty: 3 },
  { text: "chicken", level: 2, category: "Food", difficulty: 3 },
  { text: "soup", level: 2, category: "Food", difficulty: 3 },
  { text: "cereal", level: 2, category: "Food", difficulty: 3 },
  { text: "sandwich", level: 2, category: "Food", difficulty: 4 },
  
  // Animals variety
  { text: "elephant", level: 2, category: "Animals", difficulty: 4 },
  { text: "lion", level: 2, category: "Animals", difficulty: 3 },
  { text: "bear", level: 2, category: "Animals", difficulty: 3 },
  { text: "rabbit", level: 2, category: "Animals", difficulty: 3 },
  { text: "monkey", level: 2, category: "Animals", difficulty: 3 },
  
  // Actions complex
  { text: "jump", level: 2, category: "Actions", difficulty: 3 },
  { text: "dance", level: 2, category: "Actions", difficulty: 3 },
  { text: "sing", level: 2, category: "Actions", difficulty: 3 },
  { text: "play", level: 2, category: "Actions", difficulty: 3 },
  { text: "sleep", level: 2, category: "Actions", difficulty: 3 },
  
  // Colors expansion
  { text: "yellow", level: 2, category: "Colors", difficulty: 3 },
  { text: "green", level: 2, category: "Colors", difficulty: 3 },
  { text: "orange", level: 2, category: "Colors", difficulty: 4 },
  { text: "purple", level: 2, category: "Colors", difficulty: 4 },
  
  // Numbers expansion
  { text: "three", level: 2, category: "Numbers", difficulty: 3 },
  { text: "four", level: 2, category: "Numbers", difficulty: 3 },
  { text: "five", level: 2, category: "Numbers", difficulty: 4 },
  
  // Clothing detailed
  { text: "shirt", level: 2, category: "Clothing", difficulty: 3 },
  { text: "pants", level: 2, category: "Clothing", difficulty: 3 },
  { text: "socks", level: 2, category: "Clothing", difficulty: 3 },
  { text: "jacket", level: 2, category: "Clothing", difficulty: 4 },
  
  // Home detailed
  { text: "table", level: 2, category: "Home", difficulty: 3 },
  { text: "window", level: 2, category: "Home", difficulty: 3 },
  { text: "kitchen", level: 2, category: "Home", difficulty: 4 },
  { text: "bathroom", level: 2, category: "Home", difficulty: 4 },
  
  // Transportation variety
  { text: "airplane", level: 2, category: "Transportation", difficulty: 4 },
  { text: "train", level: 2, category: "Transportation", difficulty: 3 },
  { text: "boat", level: 2, category: "Transportation", difficulty: 3 },
  
  // Nature introduction
  { text: "tree", level: 2, category: "Nature", difficulty: 3 },
  { text: "flower", level: 2, category: "Nature", difficulty: 3 },
  { text: "sun", level: 2, category: "Nature", difficulty: 3 },
  { text: "moon", level: 2, category: "Nature", difficulty: 3 },
  
  // Emotions basic
  { text: "happy", level: 2, category: "Emotions", difficulty: 3 },
  { text: "sad", level: 2, category: "Emotions", difficulty: 3 },
  { text: "mad", level: 2, category: "Emotions", difficulty: 3 },
  
  // Social skills
  { text: "sorry", level: 2, category: "Social", difficulty: 3 },
  { text: "excuse me", level: 2, category: "Social", difficulty: 4 },
  { text: "friend", level: 2, category: "Social", difficulty: 3 },

  // Level 3: 3-4 years (1000+ words, complex sentences)
  // Family complex relationships
  { text: "cousin", level: 3, category: "Family", difficulty: 4 },
  { text: "nephew", level: 3, category: "Family", difficulty: 5 },
  { text: "niece", level: 3, category: "Family", difficulty: 5 },
  { text: "family", level: 3, category: "Family", difficulty: 4 },

  // Body Parts advanced
  { text: "stomach", level: 3, category: "Body Parts", difficulty: 4 },
  { text: "back", level: 3, category: "Body Parts", difficulty: 4 },
  { text: "chest", level: 3, category: "Body Parts", difficulty: 4 },
  { text: "neck", level: 3, category: "Body Parts", difficulty: 4 },
  { text: "wrist", level: 3, category: "Body Parts", difficulty: 5 },
  { text: "ankle", level: 3, category: "Body Parts", difficulty: 5 },

  // Food advanced
  { text: "vegetables", level: 3, category: "Food", difficulty: 5 },
  { text: "spaghetti", level: 3, category: "Food", difficulty: 5 },
  { text: "hamburger", level: 3, category: "Food", difficulty: 4 },
  { text: "pizza", level: 3, category: "Food", difficulty: 4 },
  { text: "breakfast", level: 3, category: "Food", difficulty: 4 },
  { text: "lunch", level: 3, category: "Food", difficulty: 4 },
  { text: "dinner", level: 3, category: "Food", difficulty: 4 },

  // Animals advanced
  { text: "giraffe", level: 3, category: "Animals", difficulty: 4 },
  { text: "zebra", level: 3, category: "Animals", difficulty: 4 },
  { text: "tiger", level: 3, category: "Animals", difficulty: 4 },
  { text: "penguin", level: 3, category: "Animals", difficulty: 4 },
  { text: "butterfly", level: 3, category: "Animals", difficulty: 5 },
  { text: "dinosaur", level: 3, category: "Animals", difficulty: 4 },

  // Actions advanced
  { text: "swimming", level: 3, category: "Actions", difficulty: 4 },
  { text: "climbing", level: 3, category: "Actions", difficulty: 4 },
  { text: "drawing", level: 3, category: "Actions", difficulty: 4 },
  { text: "reading", level: 3, category: "Actions", difficulty: 4 },
  { text: "writing", level: 3, category: "Actions", difficulty: 5 },
  { text: "cooking", level: 3, category: "Actions", difficulty: 4 },
  { text: "cleaning", level: 3, category: "Actions", difficulty: 4 },

  // Colors advanced
  { text: "pink", level: 3, category: "Colors", difficulty: 4 },
  { text: "brown", level: 3, category: "Colors", difficulty: 4 },
  { text: "black", level: 3, category: "Colors", difficulty: 4 },
  { text: "white", level: 3, category: "Colors", difficulty: 4 },
  { text: "gray", level: 3, category: "Colors", difficulty: 5 },

  // Numbers advanced
  { text: "six", level: 3, category: "Numbers", difficulty: 4 },
  { text: "seven", level: 3, category: "Numbers", difficulty: 4 },
  { text: "eight", level: 3, category: "Numbers", difficulty: 4 },
  { text: "nine", level: 3, category: "Numbers", difficulty: 4 },
  { text: "ten", level: 3, category: "Numbers", difficulty: 4 },

  // Clothing advanced
  { text: "dress", level: 3, category: "Clothing", difficulty: 4 },
  { text: "sweater", level: 3, category: "Clothing", difficulty: 4 },
  { text: "pajamas", level: 3, category: "Clothing", difficulty: 5 },
  { text: "underwear", level: 3, category: "Clothing", difficulty: 4 },
  { text: "gloves", level: 3, category: "Clothing", difficulty: 4 },

  // Home advanced
  { text: "bedroom", level: 3, category: "Home", difficulty: 4 },
  { text: "living room", level: 3, category: "Home", difficulty: 5 },
  { text: "garage", level: 3, category: "Home", difficulty: 4 },
  { text: "basement", level: 3, category: "Home", difficulty: 5 },
  { text: "attic", level: 3, category: "Home", difficulty: 5 },
  { text: "stairs", level: 3, category: "Home", difficulty: 4 },

  // Transportation advanced
  { text: "helicopter", level: 3, category: "Transportation", difficulty: 5 },
  { text: "motorcycle", level: 3, category: "Transportation", difficulty: 5 },
  { text: "bicycle", level: 3, category: "Transportation", difficulty: 4 },
  { text: "scooter", level: 3, category: "Transportation", difficulty: 4 },

  // Nature advanced
  { text: "grass", level: 3, category: "Nature", difficulty: 4 },
  { text: "leaves", level: 3, category: "Nature", difficulty: 4 },
  { text: "clouds", level: 3, category: "Nature", difficulty: 4 },
  { text: "rain", level: 3, category: "Nature", difficulty: 4 },
  { text: "snow", level: 3, category: "Nature", difficulty: 4 },
  { text: "wind", level: 3, category: "Nature", difficulty: 4 },
  { text: "ocean", level: 3, category: "Nature", difficulty: 4 },
  { text: "mountain", level: 3, category: "Nature", difficulty: 5 },

  // Emotions advanced
  { text: "excited", level: 3, category: "Emotions", difficulty: 4 },
  { text: "scared", level: 3, category: "Emotions", difficulty: 4 },
  { text: "surprised", level: 3, category: "Emotions", difficulty: 5 },
  { text: "angry", level: 3, category: "Emotions", difficulty: 4 },
  { text: "tired", level: 3, category: "Emotions", difficulty: 4 },
  { text: "proud", level: 3, category: "Emotions", difficulty: 4 },

  // Social advanced
  { text: "sharing", level: 3, category: "Social", difficulty: 4 },
  { text: "helping", level: 3, category: "Social", difficulty: 4 },
  { text: "listening", level: 3, category: "Social", difficulty: 4 },
  { text: "waiting", level: 3, category: "Social", difficulty: 4 },
  { text: "turn", level: 3, category: "Social", difficulty: 4 },
  { text: "polite", level: 3, category: "Social", difficulty: 5 },

  // Toys advanced
  { text: "puzzle", level: 3, category: "Toys", difficulty: 4 },
  { text: "blocks", level: 3, category: "Toys", difficulty: 4 },
  { text: "crayons", level: 3, category: "Toys", difficulty: 4 },
  { text: "bicycle", level: 3, category: "Toys", difficulty: 4 },
  { text: "dollhouse", level: 3, category: "Toys", difficulty: 5 }
];

// Helper function to get words by level
export function getWordsByLevel(level: number): VocabularyWord[] {
  return vocabularyWords.filter(word => word.level === level);
}

// Helper function to get words by category
export function getWordsByCategory(category: string): VocabularyWord[] {
  return vocabularyWords.filter(word => word.category === category);
}

// Helper function to get words by level and category
export function getWordsByLevelAndCategory(level: number, category: string): VocabularyWord[] {
  return vocabularyWords.filter(word => word.level === level && word.category === category);
}

// Age-based level calculation
export function calculateLevelFromAge(birthDate: Date): number {
  const now = new Date();
  const ageInMonths = (now.getFullYear() - birthDate.getFullYear()) * 12 +
                     (now.getMonth() - birthDate.getMonth());

  if (ageInMonths < 18) return 0;      // 12-18 months
  if (ageInMonths < 24) return 1;      // 18-24 months
  if (ageInMonths < 36) return 2;      // 2-3 years
  return 3;                            // 3+ years
}
