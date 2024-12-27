import React from 'react';
import { Zap, Globe, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-lg">
    <div className="bg-primary/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const Features = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={Zap}
          title="Smart Training"
          description="Adaptive learning system that focuses on your weak points and helps you improve faster."
        />
        <FeatureCard
          icon={Globe}
          title="Comprehensive Database"
          description="Access a vast collection of German nouns with their correct articles and translations."
        />
        <FeatureCard
          icon={Users}
          title="Progress Tracking"
          description="Monitor your learning journey with detailed statistics and performance insights."
        />
      </div>
    </div>
  </section>
);