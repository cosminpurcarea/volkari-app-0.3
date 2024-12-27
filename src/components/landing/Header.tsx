import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Twitter, Facebook, Instagram } from 'lucide-react';

export const Header: React.FC = () => (
  <header className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">VOLKARI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#features" className="text-gray-600 hover:text-primary">Features</Link>
          <Link to="/#pricing" className="text-gray-600 hover:text-primary">Pricing</Link>
          <Link to="/#testimonials" className="text-gray-600 hover:text-primary">Testimonials</Link>
          <div className="flex items-center space-x-4">
            <a href="https://twitter.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://github.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-primary hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Sign up free
          </Link>
        </div>
      </div>
    </div>
  </header>
);