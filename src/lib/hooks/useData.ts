import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../../contexts/AuthContext';

export function useData<T>(
  tableName: string,
  options: {
    select?: string;
    eq?: { column: string; value: any };
    order?: { column: string; ascending?: boolean };
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    async function fetchData() {
      if (!user) {
        if (mounted) {
          setData([]);
          setLoading(false);
        }
        return;
      }
      
      try {
        setLoading(true);
        setError(null);

        let query = supabase.from(tableName).select(options.select || '*');

        if (options.eq) {
          query = query.eq(options.eq.column, options.eq.value);
        }

        if (options.order) {
          query = query.order(options.order.column, { ascending: options.order.ascending });
        }

        const { data: result, error: queryError } = await query;

        if (queryError) throw queryError;
        if (mounted) setData(result || []);
      } catch (err) {
        console.error(`Error fetching ${tableName}:`, err);
        if (mounted) {
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(fetchData, retryDelay * retryCount);
          } else {
            setError(err instanceof Error ? err : new Error('Failed to fetch data'));
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [user, tableName, JSON.stringify(options)]);

  return { data, loading, error };
}