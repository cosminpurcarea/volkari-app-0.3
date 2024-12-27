import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Facebook, Instagram, Github, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">VOLKARI</span>
          </Link>
          <p className="text-gray-400 mb-4">
            Master German articles through smart, adaptive learning. Join our community of language enthusiasts today!
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://github.com/volkari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><Link to="/#features" className="hover:text-white">Features</Link></li>
            <li><Link to="/#pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/#testimonials" className="hover:text-white">Testimonials</Link></li>
            <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:contact@volkari.com" className="hover:text-white">contact@volkari.com</a>
            </li>
            <li className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Göttingen, Germany</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} VOLKARI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
            <Link to="/cookies" className="text-sm text-gray-400 hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);