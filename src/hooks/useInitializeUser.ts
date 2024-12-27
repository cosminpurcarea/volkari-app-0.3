import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export async function initializeUser(user: User) {
  try {
    // Initialize profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) throw profileError;

    // Initialize user settings
    const { error: settingsError } = await supabase
      .from('user_settings')
      .upsert({
        id: user.id,
        default_questions_per_session: 10,
        default_seconds_per_question: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (settingsError) throw settingsError;
  } catch (error) {
    console.error('Error initializing user:', error);
    throw error;
  }
}