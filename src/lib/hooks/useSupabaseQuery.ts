import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export function useSupabaseQuery<T>(
  tableName: string,
  options: {
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    eq?: { column: string; value: any };
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        if (!user) {
          setData([]);
          return;
        }

        setLoading(true);
        setError(null);

        let query = supabase.from(tableName).select(options.select || '*');

        if (options.eq) {
          query = query.eq(options.eq.column, options.eq.value);
        }

        if (options.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? false
          });
        }

        const { data, error } = await query;

        if (mounted) {
          if (error) throw error;
          setData(data || []);
        }
      } catch (err) {
        if (mounted) {
          console.error(`Error fetching ${tableName}:`, err);
          setError(err instanceof Error ? err as PostgrestError : null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [user, tableName, JSON.stringify(options)]);

  return { data, loading, error };
}