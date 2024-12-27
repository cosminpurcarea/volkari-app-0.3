/*
  # Fix RLS Policies

  1. Changes
    - Add upsert policies for profiles and user_settings
    - Fix session_answers policies to properly check ownership
    - Add missing policies for training_sessions
  
  2. Security
    - Ensure users can only access their own data
    - Allow proper initialization of user data on signup
*/

-- Fix profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can manage own profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Fix user_settings policies
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;

CREATE POLICY "Users can manage own settings"
  ON user_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Fix session_answers policies
DROP POLICY IF EXISTS "Users can insert session answers" ON session_answers;
DROP POLICY IF EXISTS "Users can view session answers" ON session_answers;

CREATE POLICY "Users can manage own session answers"
  ON session_answers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM training_sessions
      WHERE training_sessions.id = session_answers.session_id
      AND training_sessions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM training_sessions
      WHERE training_sessions.id = session_answers.session_id
      AND training_sessions.user_id = auth.uid()
    )
  );

-- Fix training_sessions policies
DROP POLICY IF EXISTS "Users can view own sessions" ON training_sessions;
DROP POLICY IF EXISTS "Users can insert own sessions" ON training_sessions;

CREATE POLICY "Users can manage own sessions"
  ON training_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);