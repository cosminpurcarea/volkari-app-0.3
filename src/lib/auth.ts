import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function initializeUserProfile(user: User) {
  if (!user.email) {
    throw new Error('User email is required');
  }

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (!existingProfile) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) throw profileError;
  }
}

export async function initializeUserSettings(user: User) {
  const { data: existingSettings } = await supabase
    .from('user_settings')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (!existingSettings) {
    const { error: settingsError } = await supabase
      .from('user_settings')
      .insert({
        id: user.id,
        default_questions_per_session: 10,
        default_seconds_per_question: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (settingsError) throw settingsError;
  }
}

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}