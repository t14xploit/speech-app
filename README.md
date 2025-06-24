# 🗣️ TinyTalker - Speech Development Made Simple for Busy Parents

> **Empowering busy parents to support their children's speech development journey with confidence and ease.**

TinyTalker is a comprehensive speech therapy application designed specifically for busy parents who want to help their children with speech development but lack the time to create exercises and track progress manually. Our app takes the guesswork out of speech therapy by providing structured, research-based tools that fit into your busy lifestyle.

## 🎯 **Why TinyTalker?**

**For Busy Parents Who:**
- ⏰ Have limited time but want to support their child's speech development
- 🤔 Don't know where to start with speech exercises
- 📊 Want to track progress without complex spreadsheets
- 🎯 Need age-appropriate activities for their child's level
- 💡 Want professional guidance without the overwhelm

**We Provide:**
- ✅ **Instant Progress Tracking** - See your child's vocabulary growth at a glance
- ✅ **Automatic Level Assessment** - No guessing what level your child should be at
- ✅ **Ready-Made Exercises** - Professional speech therapy activities (coming soon)
- ✅ **Simple Interface** - Designed for parents, not therapists
- ✅ **Research-Based Content** - Built on established speech development milestones

## 🌟 **Current Features**

### 📊 **Effortless Progress Tracking**
*"Finally, a way to see my child's progress without keeping notes everywhere!"*

- **📈 Visual Dashboard** - See vocabulary growth, exercises completed, and overall progress at a glance
- **🎯 Level Tracking** - Automatic progression through 4 speech development levels (0-3)
- **📱 Multiple Children** - Track progress for all your children in one place
- **⚡ Real-time Updates** - Progress updates instantly as your child learns new words

### 👶 **Smart Child Profiles**
*"No more guessing what level my child should be at!"*

- **🤖 Automatic Level Assessment** - Age-based starting level suggestions
- **📅 Age Calculation** - Automatic age tracking from birth date
- **📊 Individual Statistics** - Separate progress tracking for each child
- **🎨 Personalized Experience** - Each child gets their own colorful profile

### 📚 **Comprehensive Vocabulary Builder**
*"Hundreds of words organized exactly how I need them!"*

- **🎯 4 Progressive Levels**:
  - **Level 0** (0-12 months): Early sounds like "mama", "dada", "hi"
  - **Level 1** (12-24 months): First words like "apple", "dog", "more"
  - **Level 2** (2-3 years): Word combinations, colors, numbers
  - **Level 3** (3+ years): Complex speech, emotions, advanced concepts

- **📂 Organized Categories**: Animals, Food, Family, Colors, Actions, and more
- **🔍 Smart Search & Filter** - Find specific words or categories instantly
- **✅ One-Click Tracking** - Mark words as "known" or "learning" with a simple click
- **📱 Compact Design** - See 50+ words at once without scrolling endlessly

## 🚀 **Coming Soon - Next Version Features**

### 🎯 **Personalized Exercise Suggestions**
*"Custom activities designed just for my child's level!"*

- **📋 Daily Exercise Plans** - 5-10 minute activities that fit your schedule
- **🎮 Interactive Games** - Fun, engaging exercises your child will love
- **🔊 Audio Guidance** - Professional pronunciation examples
- **📈 Adaptive Difficulty** - Exercises that grow with your child

### 📊 **Advanced Analytics**
- **📅 Weekly Progress Reports** - See exactly how your child is improving
- **🎯 Milestone Tracking** - Celebrate achievements and identify areas for focus
- **📈 Growth Charts** - Visual representation of vocabulary development over time

## 🔬 **Research-Based & Parent-Friendly**

*"Built by parents, for parents, with professional guidance."*

### 📚 **Evidence-Based Content**
Our vocabulary and level system is based on established speech development milestones from:
- **[Carolina Pediatrics](https://www.carolinapediatrics.com/)** - Speech development guidelines
- **[Speech and Language UK](https://speechandlanguage.org.uk/help-for-families/ages-and-stages/)** - Age-appropriate milestones
- **[Stanford Children's Health](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-speech-and-language-milestones-90-P02170)** - Professional speech therapy standards

### 👨‍👩‍👧‍👦 **Designed for Real Families**
- **⏰ 5-Minute Setup** - Add your child and start tracking immediately
- **📱 Mobile-First** - Works perfectly on your phone during busy days
- **🎯 No Overwhelm** - Simple, clear interface that doesn't require training
- **💡 Helpful Tips** - Built-in guidance for parents new to speech development

## 🚀 **Quick Start Guide**

### **For Parents (Using the App)**
1. **Sign Up** - Create your parent account in 30 seconds
2. **Add Your Child** - Enter name and birth date for automatic level suggestion
3. **Start Tracking** - Begin marking words your child knows
4. **Watch Progress** - See vocabulary growth on your personalized dashboard

### **For Developers (Setting Up)**

#### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

#### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tinytalker-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/tinytalker"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with vocabulary data
npm run db:seed
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 **Live Demo**

**🚀 Try TinyTalker Now:** [https://tinytalker.netlify.app](https://tinytalker.netlify.app)

**Demo Features:**
- 📊 **Dashboard** - See progress statistics and child overview
- 👶 **Child Management** - Add and manage multiple child profiles
- 📚 **Vocabulary Builder** - Browse and track words across all levels
- 🔍 **Search & Filter** - Find specific words and categories
- 📈 **Progress Tracking** - View detailed progress for each child

## 🛠️ **Tech Stack**

**Built for Performance & Scalability:**
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom gradient design system
- **Database**: PostgreSQL with Prisma ORM for type-safe queries
- **Authentication**: Better-Auth for secure user management
- **UI Components**: Shadcn/ui for consistent, accessible design
- **Deployment**: Vercel-ready with optimized builds

## 📁 **Project Structure**

```
src/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                  # Authentication pages
│   │   ├── signin/              # Sign in page
│   │   └── signup/              # Sign up page
│   ├── dashboard/               # Main application
│   │   ├── page.tsx            # Dashboard home
│   │   ├── children/           # Child management
│   │   ├── vocabulary/         # Vocabulary builder
│   │   ├── exercises/          # Exercise interface
│   │   └── progress/           # Progress tracking
│   └── page.tsx                # Landing page
├── components/                  # Reusable UI components
│   ├── ui/                     # Shadcn/ui components
│   └── children/               # Child-specific components
├── lib/                        # Utilities & configurations
│   ├── actions/                # Server actions
│   ├── auth.ts                 # Better-Auth configuration
│   └── prisma.ts              # Database client
└── prisma/                     # Database configuration
    ├── schema.prisma           # Database schema
    └── seed.ts                 # Initial data seeding
```

## 🗄️ **Database Schema**

**Designed for Scalability & Performance:**
- **👤 User** - Parent accounts with secure authentication
- **👶 Child** - Child profiles with automatic level calculation
- **📂 Category** - Word categories (Animals, Food, Family, etc.)
- **📝 Word** - Vocabulary words with levels and difficulty ratings
- **✅ ChildWord** - Tracking which words each child knows with timestamps
- **📊 Statistics** - Progress tracking and analytics

## 🎯 **Available Scripts**

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Database Management
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with vocabulary data
npm run db:reset     # Reset and reseed database (development only)
```

## 🤝 **Contributing**

We welcome contributions from parents, developers, and speech therapy professionals!

**Ways to Contribute:**
- 🐛 **Report Bugs** - Help us improve the app
- 💡 **Suggest Features** - Share ideas for new functionality
- 📝 **Improve Documentation** - Help other parents get started
- 🔧 **Code Contributions** - Submit pull requests for new features

## 📞 **Support & Community**

**Need Help?**
- 📧 **Email Support** - Contact us for technical issues
- 💬 **Parent Community** - Join our community of parents using TinyTalker
- 📚 **Documentation** - Comprehensive guides for getting started

---

## 💝 **Made with Love for Busy Parents**

*"Because every child deserves the best start in their speech journey, and every parent deserves tools that actually help."*

**TinyTalker** - Turning speech development from overwhelming to achievable, one word at a time. 🗣️✨
