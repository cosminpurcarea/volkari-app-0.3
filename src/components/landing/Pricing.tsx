import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Pricing: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-gray-600">Start learning German articles today</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="border rounded-lg p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Free</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold">€0</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Basic article training</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>100 most common nouns</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Basic progress tracking</span>
            </li>
          </ul>
          <Link
            to="/signup"
            className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Get Started Free
          </Link>
        </div>

        <div className="border rounded-lg p-8 bg-gray-50 opacity-75 relative">
          <div className="absolute -top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Coming Soon
          </div>
          <h3 className="text-xl font-semibold mb-4">Pro</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold">€9</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-gray-500">
              <Check className="h-5 w-5 mr-2" />
              <span>Everything in Free</span>
            </li>
            <li className="flex items-center text-gray-500">
              <Check className="h-5 w-5 mr-2" />
              <span>5,000+ nouns database</span>
            </li>
            <li className="flex items-center text-gray-500">
              <Check className="h-5 w-5 mr-2" />
              <span>Advanced analytics</span>
            </li>
          </ul>
          <button
            disabled
            className="w-full py-2 px-4 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>

        <div className="border rounded-lg p-8 bg-gray-50 opacity-75 relative">
          <div className="absolute -top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Coming Soon
          </div>
          <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold">€29</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-gray-500">
              <Check className="h-5 w-5 mr-2" />
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-center text-gray-500">
              <Check className="h-5 w-5 mr-2" />
              <span>Custom word lists</span>
            </li>
            <li className="flex items-center text-gray-500">
              <Check className="h-5 w-5 mr-2" />
              <span>Team management</span>
            </li>
          </ul>
          <button
            disabled
            className="w-full py-2 px-4 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  </section>
);