import React, { useState } from 'react';
import { useTrainingSessions } from '../hooks/useTrainingSessions';
import { useTrainingStats } from '../lib/hooks/useTrainingStats';
import { ProgressChart } from '../components/progress/ProgressChart';
import { StatsSummary } from '../components/progress/StatsSummary';
import { SessionDetails } from '../components/training/SessionDetails';
import { ChevronDown, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import type { Database } from '../lib/database.types';

type TrainingSession = Database['public']['Tables']['training_sessions']['Row'];

interface GroupedSessions {
  [date: string]: TrainingSession[];
}

const Progress: React.FC = () => {
  const { sessions, sessionAnswers, loading, error } = useTrainingSessions();
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const stats = useTrainingStats(sessions);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>{error instanceof Error ? error.message : 'An error occurred'}</span>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg mb-2">No training sessions recorded yet.</p>
          <p>Complete your first training session to see your progress!</p>
        </div>
      </div>
    );
  }

  // Group sessions by date
  const groupedSessions = sessions.reduce((groups: GroupedSessions, session) => {
    const date = new Date(session.completed_at).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {});

  const toggleDate = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  return (
    <div className="space-y-6">
      {selectedSession ? (
        <SessionDetails
          session={selectedSession}
          answers={sessionAnswers[selectedSession.id] || []}
          onClose={() => setSelectedSession(null)}
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Training Progress</h2>
          
          {stats && (
            <StatsSummary
              totalSessions={stats.totalSessions}
              totalQuestions={stats.totalQuestions}
              totalCorrect={stats.totalCorrect}
              averageScore={stats.averageScore}
            />
          )}

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Progress Over Time</h3>
            <ProgressChart sessions={sessions} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Training History</h3>
            {Object.entries(groupedSessions)
              .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
              .map(([date, dateSessions]) => {
                const isExpanded = expandedDates.has(date);
                const averageScore = Math.round(
                  dateSessions.reduce((sum, s) => sum + (s.correct_answers / s.total_questions * 100), 0) / 
                  dateSessions.length
                );

                return (
                  <div key={date} className="border rounded-lg">
                    <button
                      onClick={() => toggleDate(date)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-400 mr-2" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400 mr-2" />
                        )}
                        <div className="font-medium">{date}</div>
                        <div className="text-sm text-gray-500 ml-4">
                          {dateSessions.length} sessions
                        </div>
                      </div>
                      <div className={`font-medium ${
                        averageScore >= 80 ? 'text-green-600' :
                        averageScore >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {averageScore}% avg
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="border-t divide-y">
                        {dateSessions.map((session) => {
                          const percentage = Math.round(
                            (session.correct_answers / session.total_questions) * 100
                          );
                          const time = new Date(session.completed_at).toLocaleTimeString();

                          return (
                            <button
                              key={session.id}
                              onClick={() => setSelectedSession(session)}
                              className="w-full p-4 hover:bg-gray-50 flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-500">{time}</div>
                                <div className="text-sm">
                                  {session.correct_answers} / {session.total_questions} correct
                                </div>
                              </div>
                              <div className={`text-sm font-medium ${
                                percentage >= 80 ? 'text-green-600' :
                                percentage >= 60 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {percentage}%
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;