import { PrismaClient } from '../src/generated/prisma';
import { categories, vocabularyWords } from './seed-data/vocabulary';
import { exerciseTemplates } from './seed-data/exercises';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (in development only)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🧹 Clearing existing data...');
    await prisma.exerciseResult.deleteMany();
    await prisma.weeklyProgress.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.childWord.deleteMany();
    await prisma.word.deleteMany();
    await prisma.child.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  }

  // Seed categories
  console.log('📂 Seeding categories...');
  const categoryMap = new Map<string, string>();
  
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        description: category.description,
        icon: category.icon,
      },
    });
    categoryMap.set(category.name, createdCategory.id);
    console.log(`  ✅ Created category: ${category.name}`);
  }

  // Seed vocabulary words
  console.log('📝 Seeding vocabulary words...');
  const wordMap = new Map<string, string>();
  
  for (const word of vocabularyWords) {
    const categoryId = categoryMap.get(word.category);
    if (!categoryId) {
      console.warn(`  ⚠️  Category not found for word: ${word.text} (${word.category})`);
      continue;
    }

    const createdWord = await prisma.word.upsert({
      where: {
        text_level: {
          text: word.text,
          level: word.level,
        },
      },
      update: {},
      create: {
        text: word.text,
        level: word.level,
        categoryId: categoryId,
        difficulty: word.difficulty,
        imageUrl: word.imageUrl,
        audioUrl: word.audioUrl,
      },
    });
    wordMap.set(`${word.text}-${word.level}`, createdWord.id);
  }
  console.log(`  ✅ Created ${vocabularyWords.length} vocabulary words`);

  // Seed exercises
  console.log('🎯 Seeding exercises...');
  
  for (const exercise of exerciseTemplates) {
    let categoryId: string | undefined;
    let wordId: string | undefined;

    // Find category ID if specified
    if (exercise.categoryId) {
      categoryId = categoryMap.get(exercise.categoryId);
    }

    // Find word ID if specified
    if (exercise.wordId) {
      wordId = wordMap.get(`${exercise.wordId}-${exercise.level}`);
    }

    await prisma.exercise.create({
      data: {
        title: exercise.title,
        description: exercise.description,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: exercise.type as any, // Cast to enum
        level: exercise.level,
        categoryId: categoryId,
        wordId: wordId,
        content: exercise.content,
        mediaUrl: exercise.mediaUrl,
      },
    });
  }
  console.log(`  ✅ Created ${exerciseTemplates.length} exercises`);

  // Create sample users and children for testing
  if (process.env.NODE_ENV !== 'production') {
    console.log('👥 Creating sample users and children...');
    
    const sampleUser = await prisma.user.create({
      data: {
        email: 'parent@example.com',
        name: 'Sample Parent',
      },
    });

    // Create children at different levels
    const children = [
      {
        name: 'Emma',
        birthDate: new Date(Date.now() - 15 * 30 * 24 * 60 * 60 * 1000), // 15 months old
        level: 0,
      },
      {
        name: 'Liam',
        birthDate: new Date(Date.now() - 20 * 30 * 24 * 60 * 60 * 1000), // 20 months old
        level: 1,
      },
      {
        name: 'Sophia',
        birthDate: new Date(Date.now() - 30 * 30 * 24 * 60 * 60 * 1000), // 30 months old
        level: 2,
      },
      {
        name: 'Noah',
        birthDate: new Date(Date.now() - 42 * 30 * 24 * 60 * 60 * 1000), // 42 months old
        level: 3,
      },
    ];

    for (const childData of children) {
      const child = await prisma.child.create({
        data: {
          name: childData.name,
          birthDate: childData.birthDate,
          level: childData.level,
          userId: sampleUser.id,
        },
      });

      // Add some known words for each child
      const levelWords = vocabularyWords.filter(w => w.level <= childData.level);
      const knownWordsCount = Math.min(
        Math.floor(levelWords.length * 0.3), // 30% of available words
        childData.level === 0 ? 15 : childData.level === 1 ? 40 : childData.level === 2 ? 80 : 150
      );

      const shuffledWords = levelWords.sort(() => 0.5 - Math.random());
      const selectedWords = shuffledWords.slice(0, knownWordsCount);

      for (const word of selectedWords) {
        const wordId = wordMap.get(`${word.text}-${word.level}`);
        if (wordId) {
          await prisma.childWord.create({
            data: {
              childId: child.id,
              wordId: wordId,
              dateLearned: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in last 30 days
            },
          });
        }
      }

      // Create some weekly progress entries
      for (let week = 0; week < 4; week++) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (week * 7));
        weekStart.setHours(0, 0, 0, 0);
        // Set to Monday of that week
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);

        await prisma.weeklyProgress.create({
          data: {
            childId: child.id,
            weekStart: weekStart,
            wordsLearned: Math.floor(Math.random() * 10) + 1,
            exercisesDone: Math.floor(Math.random() * 15) + 5,
            totalScore: Math.floor(Math.random() * 500) + 300,
          },
        });
      }

      console.log(`  ✅ Created child: ${childData.name} (Level ${childData.level}) with ${knownWordsCount} known words`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
  
  // Print summary
  const stats = {
    categories: await prisma.category.count(),
    words: await prisma.word.count(),
    exercises: await prisma.exercise.count(),
    users: await prisma.user.count(),
    children: await prisma.child.count(),
    knownWords: await prisma.childWord.count(),
  };

  console.log('\n📊 Database Summary:');
  console.log(`  Categories: ${stats.categories}`);
  console.log(`  Words: ${stats.words}`);
  console.log(`  Exercises: ${stats.exercises}`);
  console.log(`  Users: ${stats.users}`);
  console.log(`  Children: ${stats.children}`);
  console.log(`  Known Words: ${stats.knownWords}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
