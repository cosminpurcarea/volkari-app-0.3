import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { validateEmail, validatePassword } from '../utils/validation';

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        throw new Error(passwordError);
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: { email }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          throw new Error('An account with this email already exists');
        }
        throw signUpError;
      }

      return true;
    } catch (err) {
      console.error('Signup error:', err);
      const message = err instanceof Error ? err.message : 'An error occurred during signup';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
    error
  };
}