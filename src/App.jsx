import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Code2, Brain, TrendingUp, Calendar, Sparkles, ArrowRight, CheckCircle2, Zap } from "lucide-react"

function App() {
  const navigate = useNavigate();

  const benefits = [
    "In-browser code editor with instant feedback",
    "Solutions organized by company and difficulty",
    "Time complexity analysis for every problem",
    "Community discussions and multiple approaches",
    "Mobile-friendly interface for learning anywhere"
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Zap size={24} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AlgoFlow</span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate("/Login")} 
                variant="ghost"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate("/Signup")}
              >
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8 animate-fade-in">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-sm text-blue-300">Trusted by 50,000+ developers</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Master Algorithms.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ace Your Interviews.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The modern platform for learning data structures and algorithms. 
            Practice smarter with AI guidance, track your progress, and build 
            the problem-solving skills top companies look for.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              onClick={() => navigate("/Signup")} 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 w-full sm:w-auto"
            >
              Start Learning Free
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button 
              onClick={() => navigate("/Login")} 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 w-full sm:w-auto"
            >
              Sign In
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span>Free tier forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Built for Real Learning
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                No fluff, no gimmicks. Just the tools and structure you need to 
                level up your coding skills and land your dream job.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => navigate("/Signup")} 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Start Your Journey
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  87%
                </div>
                <div className="text-slate-400">Success Rate</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2 text-purple-300">
                  500+
                </div>
                <div className="text-sm text-slate-400">Problems Solved</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500/20 to-blue-500/20 border border-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2 text-pink-300">
                  30 Days
                </div>
                <div className="text-sm text-slate-400">Average to Job</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-blue-400" />
                <span className="font-semibold">AlgoFlow</span>
              </div>
              <p className="text-sm text-slate-400">Build your coding confidence.</p>
            </div>
            <div className="text-sm text-slate-400">
              © 2026 AlgoFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App