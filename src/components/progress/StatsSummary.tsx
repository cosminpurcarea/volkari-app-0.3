import React from 'react';
import { Trophy, Target, CheckCircle } from 'lucide-react';

interface StatsSummaryProps {
  totalSessions: number;
  totalQuestions: number;
  totalCorrect: number;
  averageScore: number;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({
  totalSessions,
  totalQuestions,
  totalCorrect,
  averageScore,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <Trophy className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="text-2xl font-bold">{totalSessions}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <Target className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Questions Answered</p>
            <p className="text-2xl font-bold">{totalQuestions}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-2xl font-bold">{averageScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};