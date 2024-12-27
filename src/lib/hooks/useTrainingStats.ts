import { useMemo } from 'react';
import type { Database } from '../database.types';

type TrainingSession = Database['public']['Tables']['training_sessions']['Row'];

export function useTrainingStats(sessions: TrainingSession[]) {
  return useMemo(() => {
    if (!sessions.length) return null;

    const totalSessions = sessions.length;
    const totalQuestions = sessions.reduce((sum, session) => sum + session.total_questions, 0);
    const totalCorrect = sessions.reduce((sum, session) => sum + session.correct_answers, 0);
    const averageScore = (totalCorrect / totalQuestions) * 100;

    return {
      totalSessions,
      totalQuestions,
      totalCorrect,
      averageScore: Math.round(averageScore),
    };
  }, [sessions]);
}