import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  buttonText: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  to,
  buttonText,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
};