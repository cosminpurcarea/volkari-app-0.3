import React, { useMemo, useState } from 'react';
import type { Database } from '../../lib/database.types';

type TrainingSession = Database['public']['Tables']['training_sessions']['Row'];
type TimeRange = '30d' | '90d' | '180d' | '365d' | 'all';

interface TrainingHeatmapProps {
  sessions: TrainingSession[];
}

export const TrainingHeatmap: React.FC<TrainingHeatmapProps> = ({ sessions }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d'); // Changed default to 30d

  const heatmapData = useMemo(() => {
    if (sessions.length === 0) return {};
    
    const data: Record<string, { count: number; avgScore: number }> = {};
    
    // Group sessions by date
    sessions.forEach(session => {
      const date = new Date(session.completed_at).toISOString().split('T')[0];
      const score = (session.correct_answers / session.total_questions) * 100;
      
      if (!data[date]) {
        data[date] = { count: 1, avgScore: score };
      } else {
        data[date].count += 1;
        data[date].avgScore = (data[date].avgScore * (data[date].count - 1) + score) / data[date].count;
      }
    });

    return data;
  }, [sessions]);

  // Generate dates for display
  const dates = useMemo(() => {
    if (sessions.length === 0) return [];

    const result = [];
    const today = new Date();
    const daysToShow = timeRange === 'all' ? 365 : parseInt(timeRange);
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      result.push(date.toISOString().split('T')[0]);
    }
    return result;
  }, [sessions, timeRange]);

  // Group dates by week for display
  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];
    
    dates.forEach(date => {
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        result.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(date);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }
    
    return result;
  }, [dates]);

  const getColor = (date: string) => {
    const data = heatmapData[date];
    if (!data) return 'bg-gray-100';
    
    const intensity = Math.min(1, data.count / 5); // Max intensity at 5 sessions
    const score = data.avgScore;
    
    if (score >= 90) return `bg-[#19233b] opacity-${Math.round(intensity * 100)}`;
    if (score >= 70) return `bg-[#2e436a] opacity-${Math.round(intensity * 80)}`;
    if (score >= 50) return `bg-[#2e436a] opacity-${Math.round(intensity * 60)}`;
    return `bg-[#2e436a] opacity-${Math.round(intensity * 40)}`;
  };

  if (sessions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Training Activity</h3>
        <p className="text-gray-500">No training sessions recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Training Activity</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="h-12 text-lg px-4 rounded-md border-gray-300 shadow-sm focus:border-[#2e436a] focus:ring-[#2e436a]"
        >
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="180d">Last 180 days</option>
          <option value="365d">Last year</option>
          <option value="all">All time</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex gap-1">
              {weeks.map((week, weekIndex) => {
                const date = week[i];
                return date ? (
                  <div
                    key={`${weekIndex}-${i}`}
                    className={`w-3 h-3 rounded-sm ${getColor(date)}`}
                    title={`${date}: ${heatmapData[date]?.count || 0} sessions, ${Math.round(heatmapData[date]?.avgScore || 0)}% avg score`}
                  />
                ) : (
                  <div key={`${weekIndex}-${i}`} className="w-3 h-3" />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end text-sm text-gray-500">
          <span className="mr-2">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100" />
            <div className="w-3 h-3 rounded-sm bg-[#2e436a] opacity-40" />
            <div className="w-3 h-3 rounded-sm bg-[#2e436a] opacity-60" />
            <div className="w-3 h-3 rounded-sm bg-[#2e436a] opacity-80" />
            <div className="w-3 h-3 rounded-sm bg-[#19233b]" />
          </div>
          <span className="ml-2">More</span>
        </div>
      </div>
    </div>
  );
};