import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type UserSettings = Database['public']['Tables']['user_settings']['Row'];

const DEFAULT_SETTINGS = {
  default_questions_per_session: 10,
  default_seconds_per_question: 5,
};

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  async function fetchSettings() {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // First, try to get existing settings
      const { data: existingSettings, error: fetchError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingSettings) {
        setSettings(existingSettings);
      } else {
        // If no settings exist, create default settings
        const { data: newSettings, error: insertError } = await supabase
          .from('user_settings')
          .insert([{
            id: user.id,
            ...DEFAULT_SETTINGS,
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        setSettings(newSettings);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching settings');
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(updates: Partial<Omit<UserSettings, 'id' | 'created_at' | 'updated_at'>>) {
    if (!user) return;
    
    try {
      setError(null);
      
      const { data, error } = await supabase
        .from('user_settings')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (err) {
      console.error('Error updating settings:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating settings');
      throw err;
    }
  }

  return {
    settings,
    loading,
    error,
    updateSettings,
  };
}