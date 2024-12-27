import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useUserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError) throw fetchError;
        if (mounted) setProfile(existingProfile);
      } catch (err) {
        if (mounted) {
          console.error('Error fetching profile:', err);
          setError(err instanceof Error ? err.message : 'An error occurred while fetching profile');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    
    try {
      setError(null);
      
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      const message = err instanceof Error ? err.message : 'An error occurred while updating profile';
      setError(message);
      throw new Error(message);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}