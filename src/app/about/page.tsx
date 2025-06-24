import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Lightbulb, Users, Target, Code, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">About TinyTalker</h1>
                <p className="text-sm text-gray-600">The story behind the app</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">🗣️</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Born from a Parent's Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            TinyTalker was created to solve a real problem: helping busy parents support their children's speech development without the overwhelm.
          </p>
        </div>

        {/* The Problem */}
        <Card className="shadow-lg border-0 mb-8 bg-gradient-to-br from-red-50/60 via-red-50/40 to-white">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center">
              <Target className="w-6 h-6 mr-3 text-red-600" />
              The Problem We Saw
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              As busy parents, we noticed a gap in available tools for speech development. Existing solutions were either:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Too complex</strong> - Designed for professionals, not parents</li>
              <li><strong>Too time-consuming</strong> - Required hours of preparation and creativity</li>
              <li><strong>Too expensive</strong> - Professional therapy costs were overwhelming</li>
              <li><strong>Too generic</strong> - One-size-fits-all approaches that didn't work for every child</li>
            </ul>
            <p>
              Parents needed something simple, effective, and designed specifically for their busy lives.
            </p>
          </CardContent>
        </Card>

        {/* The Vision */}
        <Card className="shadow-lg border-0 mb-8 bg-gradient-to-br from-blue-50/60 via-blue-50/40 to-white">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center">
              <Lightbulb className="w-6 h-6 mr-3 text-blue-600" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              TinyTalker was born from the idea that <strong>every parent should have access to professional-quality speech development tools</strong> without needing a degree in speech therapy.
            </p>
            <p className="mb-4">
              We envisioned an app that would:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Take the guesswork out of speech development</li>
              <li>Provide age-appropriate activities automatically</li>
              <li>Track progress without manual effort</li>
              <li>Fit into a busy parent's 5-minute breaks</li>
              <li>Give confidence to parents who feel lost</li>
            </ul>
            <p>
              The goal was simple: <em>Make speech development support as easy as checking your phone.</em>
            </p>
          </CardContent>
        </Card>

        {/* Current State */}
        <Card className="shadow-lg border-0 mb-8 bg-gradient-to-br from-yellow-50/60 via-yellow-50/40 to-white">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center">
              <Code className="w-6 h-6 mr-3 text-yellow-600" />
              Where We Are Today
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              <strong>TinyTalker is not perfect</strong> - and we're honest about that. This is the first version, built as a solid foundation for something much bigger.
            </p>
            <p className="mb-4">
              What we've built so far:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>✅ <strong>Child profile management</strong> with automatic level assessment</li>
              <li>✅ <strong>Comprehensive vocabulary tracking</strong> across 4 development levels</li>
              <li>✅ <strong>Progress visualization</strong> that actually makes sense to parents</li>
              <li>✅ <strong>Research-based content</strong> from established speech development guidelines</li>
              <li>✅ <strong>Clean, intuitive interface</strong> designed for busy parents</li>
            </ul>
            <p className="mb-4">
              What's coming next:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>🚧 <strong>Interactive exercises</strong> tailored to each child's level</li>
              <li>🚧 <strong>Audio pronunciation guides</strong> for parents and children</li>
              <li>🚧 <strong>Weekly progress reports</strong> and milestone celebrations</li>
              <li>🚧 <strong>Community features</strong> for parent support and sharing</li>
            </ul>
          </CardContent>
        </Card>

        {/* The Foundation */}
        <Card className="shadow-lg border-0 mb-8 bg-gradient-to-br from-green-50/60 via-green-50/40 to-white">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center">
              <Heart className="w-6 h-6 mr-3 text-green-600" />
              A Strong Foundation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              While TinyTalker isn't complete, it represents something important: <strong>a solid foundation built on real parent needs</strong>.
            </p>
            <p className="mb-4">
              This foundation includes:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Proven technology stack</strong> - Built with modern, scalable tools</li>
              <li><strong>Research-based approach</strong> - Content based on established speech therapy guidelines</li>
              <li><strong>Parent-first design</strong> - Every feature designed for busy parents, not therapists</li>
              <li><strong>Extensible architecture</strong> - Ready to grow with new features and capabilities</li>
              <li><strong>Real-world testing</strong> - Built and tested by actual parents</li>
            </ul>
            <p>
              Most importantly, it proves that <em>simple, effective speech development tools for parents are not only possible - they're necessary</em>.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50/60 via-purple-50/40 to-white">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Join the Journey
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                TinyTalker is just the beginning. We're building something that will genuinely help families, 
                one word at a time. Try it out, share your feedback, and help us make it even better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Try the Demo
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline">
                    Get Started Today
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
