# 🗣️ SpeechBuddy - Speech Therapy App for Busy Parents

A comprehensive speech therapy application designed to help busy parents support their children with speech delays. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## 🌟 Features

### 📊 Statistics & Progress Tracking
- **Total Known Words**: Track your child's vocabulary growth
- **Category Progress**: Monitor progress across different word categories (Family, Animals, Food, etc.)
- **Completion Percentages**: See how much of each category your child has mastered
- **Weekly Growth Charts**: Visual representation of vocabulary development over time

### 🧩 Interactive Exercises
- **Word Recognition**: Point to correct images based on spoken words
- **Pronunciation Practice**: Audio-guided pronunciation exercises
- **Matching Games**: Match words with corresponding images
- **Categorization**: Sort words into appropriate categories
- **Fill-in-the-Blank**: Complete sentences with missing words
- **Story Telling**: Use target words in creative storytelling
- **Sound Recognition**: Identify words that start with specific sounds

### 👶 Child Profile Management
- **Multiple Children**: Support for multiple child profiles per parent
- **Automatic Level Calculation**: Age-based level assignment (0-3)
- **Birth Date Tracking**: Automatic age calculation and level progression
- **Individual Progress**: Separate tracking for each child

### 📚 Comprehensive Vocabulary System
- **4 Progressive Levels**:
  - Level 0 (12-18 months): First words (0-50 vocabulary)
  - Level 1 (18-24 months): Two-word phrases (50-200 words)
  - Level 2 (2-3 years): Simple sentences (200-1000 words)
  - Level 3 (3-4 years): Complex speech (1000+ words)
- **14 Categories**: Family, Body Parts, Food, Animals, Toys, Actions, Colors, Numbers, Clothing, Transportation, Home, Nature, Emotions, Social
- **Word Tracking**: Date learned, optional notes, difficulty levels
- **Search & Filter**: Easy word discovery and management

## 🔬 Research-Based Approach

Our vocabulary and exercise system is based on established speech development milestones from:
- [Speech and Language UK](https://speechandlanguage.org.uk/help-for-families/ages-and-stages/)
- [Stanford Children's Health](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-speech-and-language-milestones-90-P02170)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd speech-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/speechapp"
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with vocabulary and exercises
npm run db:seed
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Demo

Visit `/demo` to see a working demonstration with mock data showcasing all the main features:
- Dashboard with progress statistics
- Vocabulary management interface
- Interactive exercise examples

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Ready for integration (schema prepared)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Landing page
│   └── demo/              # Demo pages
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard
│   ├── VocabularyManager.tsx
│   └── ExerciseInterface.tsx
├── lib/                   # Utilities
│   └── prisma.ts         # Database client
└── generated/            # Generated Prisma client

prisma/
├── schema.prisma         # Database schema
├── seed.ts              # Database seeding
└── seed-data/           # Vocabulary and exercise data
    ├── vocabulary.ts    # Word lists by level/category
    └── exercises.ts     # Exercise templates
```

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main models:
- **User**: Parent accounts
- **Child**: Child profiles with automatic level calculation
- **Category**: Word categories (Family, Animals, etc.)
- **Word**: Vocabulary words with levels and difficulty
- **ChildWord**: Tracking which words each child knows
- **Exercise**: Exercise templates and content
- **ExerciseResult**: Exercise completion tracking
- **WeeklyProgress**: Weekly statistics for charts

## 🎯 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with initial data
npm run db:reset     # Reset and reseed database
```
