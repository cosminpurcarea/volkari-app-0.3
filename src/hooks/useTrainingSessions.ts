import { useData } from '../lib/hooks/useData';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type TrainingSession = Database['public']['Tables']['training_sessions']['Row'];
type SessionAnswer = Database['public']['Tables']['session_answers']['Row'] & {
  noun: Database['public']['Tables']['nouns']['Row'];
};

export function useTrainingSessions() {
  const { user } = useAuth();
  
  const { data: sessions, loading: sessionsLoading, error: sessionsError } = 
    useData<TrainingSession>('training_sessions', {
      eq: { column: 'user_id', value: user?.id },
      order: { column: 'completed_at', ascending: false }
    });

  const latestSessionId = sessions?.[0]?.id;

  const { data: answers, loading: answersLoading, error: answersError } = 
    useData<SessionAnswer>('session_answers', {
      select: `*, noun:nouns(*)`,
      eq: latestSessionId ? { column: 'session_id', value: latestSessionId } : undefined
    });

  const sessionAnswers = (answers || []).reduce((acc, answer) => {
    if (!acc[answer.session_id]) {
      acc[answer.session_id] = [];
    }
    acc[answer.session_id].push(answer);
    return acc;
  }, {} as Record<string, SessionAnswer[]>);

  return {
    sessions: sessions || [],
    sessionAnswers,
    loading: sessionsLoading || answersLoading,
    error: sessionsError || answersError,
  };
}