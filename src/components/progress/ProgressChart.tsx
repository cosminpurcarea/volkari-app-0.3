import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Database } from '../../lib/database.types';

type TrainingSession = Database['public']['Tables']['training_sessions']['Row'];

interface ProgressChartProps {
  sessions: TrainingSession[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ sessions }) => {
  // Group sessions by date and calculate average score
  const dailyScores = sessions.reduce((acc, session) => {
    const date = new Date(session.completed_at).toLocaleDateString();
    const score = (session.correct_answers / session.total_questions) * 100;
    
    if (!acc[date]) {
      acc[date] = { total: score, count: 1 };
    } else {
      acc[date].total += score;
      acc[date].count += 1;
    }
    
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const chartData = Object.entries(dailyScores).map(([date, { total, count }]) => ({
    date,
    score: Math.round(total / count),
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Average Score']}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#3B82F6" 
            name="Average Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};