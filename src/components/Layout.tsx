import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Brain, History, BookOpen, LayoutDashboard } from 'lucide-react';
import { UserMenu } from './user/UserMenu';

const Layout: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Start Training', href: '/training', icon: Brain },
    { name: 'Your Progress', href: '/progress', icon: History },
    { name: 'Nouns Register', href: '/nouns', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">VOLKARI</span>
          </Link>
          <UserMenu />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-4 mb-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  location.pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-primary-light/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;