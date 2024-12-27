import { supabase } from './supabase';
import type { Database } from './database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Session = Database['public']['Tables']['training_sessions']['Row'];

async function getProfile(userId: string): Promise<Profile> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
    
  if (error) throw new Error(`Could not fetch user profile: ${error.message}`);
  if (!profile) throw new Error('Profile not found');
  
  return profile;
}

async function getSessions(userId: string): Promise<Session[]> {
  const { data, error } = await supabase
    .from('training_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });

  if (error) throw new Error(`Could not fetch training sessions: ${error.message}`);
  return data || [];
}

function getEncouragementMessage(stats: { recentAverage: number, trend: string }): string {
  if (stats.recentAverage >= 90) {
    return "Outstanding work! You're mastering German articles like a pro!";
  } else if (stats.recentAverage >= 80) {
    return "Great progress! Keep up the excellent work!";
  } else if (stats.recentAverage >= 70) {
    return "You're making solid progress. Keep practicing!";
  } else {
    return "Every practice session brings you closer to mastery. Keep going!";
  }
}

export async function sendProgressReport(userId: string): Promise<void> {
  try {
    const profile = await getProfile(userId);
    if (!profile.email) {
      throw new Error('No email address found for user');
    }

    const sessions = await getSessions(userId);
    if (sessions.length === 0) {
      throw new Error('No training sessions found');
    }

    const recentSessions = sessions.slice(0, 5);
    const recentAverage = Math.round(
      recentSessions.reduce((sum, s) => sum + (s.correct_answers / s.total_questions * 100), 0) / 
      recentSessions.length
    );

    const stats = {
      totalSessions: sessions.length,
      recentAverage,
      trend: recentAverage >= 80 ? 'excellent' : recentAverage >= 70 ? 'good' : 'improving'
    };

    const encouragement = getEncouragementMessage(stats);

    const { error: emailError } = await supabase.functions.invoke('send-progress-report', {
      body: {
        to: profile.email,
        name: profile.first_name || 'Learner',
        stats,
        encouragement
      }
    });

    if (emailError) throw emailError;
  } catch (error) {
    console.error('Error sending progress report:', error);
    throw error instanceof Error ? error : new Error('Failed to send progress report');
  }
}