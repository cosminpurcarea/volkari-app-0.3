import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useData } from '../lib/hooks/useData';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/database.types';

type Noun = Database['public']['Tables']['nouns']['Row'];

export function useNouns() {
  const { user } = useAuth();
  const { data: nouns, loading, error } = useData<Noun>('nouns', {
    order: { column: 'created_at', ascending: false }
  });

  const addNoun = useCallback(async (noun: Omit<Noun, 'id' | 'created_at'>) => {
    if (!user) return;
    const { error } = await supabase
      .from('nouns')
      .insert([{ ...noun, created_by: user.id }]);
    if (error) throw error;
  }, [user]);

  const updateNoun = useCallback(async (id: string, updates: Partial<Noun>) => {
    if (!user) return;
    const { error } = await supabase
      .from('nouns')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
  }, [user]);

  const deleteNoun = useCallback(async (id: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('nouns')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }, [user]);

  return {
    nouns: nouns || [],
    loading,
    error,
    addNoun,
    updateNoun,
    deleteNoun,
  };
}