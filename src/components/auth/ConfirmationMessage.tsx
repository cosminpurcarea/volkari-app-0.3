import React from 'react';
import { Link } from 'react-router-dom';

export const ConfirmationMessage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-2xl font-bold text-center mb-4">Check your email</h2>
        <p className="text-gray-600 text-center mb-6">
          We've sent you a confirmation email. Please check your inbox and follow the instructions to complete your registration.
        </p>
        <Link
          to="/login"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#19233b] hover:bg-[#2e436a] transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </div>
  </div>
);