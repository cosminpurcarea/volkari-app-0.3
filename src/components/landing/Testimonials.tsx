import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'German Language Student',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'VOLKARI has transformed my German learning experience. The article training is intuitive and effective, making it easier than ever to master der, die, and das. The instant feedback and progress tracking keep me motivated every day!'
  },
  {
    name: 'Michael K.',
    role: 'Language Enthusiast',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Finally, a tool that makes learning German articles enjoyable. The progress tracking keeps me motivated, and the spaced repetition system helps me remember the correct articles naturally. It\'s become an essential part of my daily language practice.'
  },
  {
    name: 'Emma L.',
    role: 'Exchange Student',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'I love how VOLKARI adapts to my learning pace. The personalized exercises and detailed progress tracking have helped me improve significantly. The interface is user-friendly, and the immediate feedback helps reinforce correct article usage.'
  }
];

export const Testimonials: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-xl text-gray-600">Join thousands of satisfied learners</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-6">{testimonial.quote}</p>
            <div className="flex items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full mr-4"
              />
              <div>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-gray-500 text-sm">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);