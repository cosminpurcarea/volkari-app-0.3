import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useProfileEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const sendEmail = async (type: 'progress' | 'report', data: any) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email, first_name')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile?.email) throw new Error('No email address found');

      // Send email using Edge Function
      const { error: emailError } = await supabase.functions.invoke(
        `send-${type}-email`,
        {
          body: {
            to: profile.email,
            name: profile.first_name || 'Learner',
            data
          }
        }
      );

      if (emailError) throw emailError;

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send email';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendEmail,
    loading,
    error
  };
}