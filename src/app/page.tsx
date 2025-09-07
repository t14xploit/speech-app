import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header with Login */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🗣️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TinyTalker
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/signin">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="outline" size="sm" className="sm:hidden">
                  <LogIn className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="sm">
                  <UserPlus className="w-4 h-4 mr-2 hidden sm:block" />
                  <span className="hidden sm:block">Sign Up</span>
                  <UserPlus className="w-4 h-4 sm:hidden" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            🗣️ TinyTalker
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive speech therapy app for busy parents helping children with speech delays
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg"
            >
              Try Demo
            </Link>
            <Link
              href="/about"
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-lg border border-gray-200"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Statistics</h3>
            <p className="text-gray-600">
              Track total known words, progress per category, and weekly vocabulary growth with beautiful charts.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Exercises</h3>
            <p className="text-gray-600">
              Interactive exercises tailored to your child&apos;s level with word recognition, pronunciation, and more.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">👶</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Child Profiles</h3>
            <p className="text-gray-600">
              Create profiles with automatic level calculation based on age and track individual progress.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Vocabulary</h3>
            <p className="text-gray-600">
              Comprehensive word lists organized by categories and levels, with date tracking and notes.
            </p>
          </div>
        </div>

        {/* Level System */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            🎯 Four Progressive Levels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-4xl mb-3">🍼</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Level 0</h3>
              <p className="text-sm text-gray-600 mb-2">12-18 months</p>
              <p className="text-sm text-gray-700">First words (0-50 vocabulary)</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-4xl mb-3">👶</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Level 1</h3>
              <p className="text-sm text-gray-600 mb-2">18-24 months</p>
              <p className="text-sm text-gray-700">Two-word phrases (50-200 words)</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-4xl mb-3">🧒</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Level 2</h3>
              <p className="text-sm text-gray-600 mb-2">2-3 years</p>
              <p className="text-sm text-gray-700">Simple sentences (200-1000 words)</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-4xl mb-3">👦</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Level 3</h3>
              <p className="text-sm text-gray-600 mb-2">3-4 years</p>
              <p className="text-sm text-gray-700">Complex speech (1000+ words)</p>
            </div>
          </div>
        </div>

        {/* Research-Based */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🔬 Research-Based Approach</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Our vocabulary and exercises are based on established speech development milestones from
            Speech and Language UK and Stanford Children&apos;s Health research.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://speechandlanguage.org.uk/help-for-families/ages-and-stages/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Speech & Language UK
            </a>
            <a
              href="https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-speech-and-language-milestones-90-P02170"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Stanford Children&apos;s Health
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
