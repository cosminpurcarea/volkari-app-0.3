import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain } from 'lucide-react';

export const Hero: React.FC = () => (
  <section className="relative bg-primary pt-32 pb-24 overflow-hidden">
    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-primary-light/20 rounded-full px-4 py-2 mb-4">
          <Brain className="h-5 w-5 text-white/80" />
          <span className="text-white/80">100% Free to Get Started</span>
        </div>
        <p className="text-accent italic font-medium mb-4">Finis Coronat Opus</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Master German Articles<br />with Confidence
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
          Join thousands of learners who are improving their German language skills with our intelligent article training system. Start for free today!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors inline-flex items-center justify-center"
          >
            Start Learning Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Sign In
          </Link>
        </div>
        <p className="mt-6 text-white/60">
          No credit card required • Cancel anytime • Free forever plan available
        </p>
      </div>
    </div>
  </section>
);