import React from 'react';
import { Link } from 'react-router-dom';

export const CallToAction = () => (
  <section className="py-20 bg-blue-50">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Ready to master German articles?</h2>
      <p className="text-xl text-gray-600 mb-8">
        Join thousands of learners who are improving their German language skills with DEART.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Start Learning Now
        </Link>
        <Link
          to="/login"
          className="bg-white text-blue-500 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors border-2 border-blue-500 w-full sm:w-auto"
        >
          Log In
        </Link>
      </div>
    </div>
  </section>
);