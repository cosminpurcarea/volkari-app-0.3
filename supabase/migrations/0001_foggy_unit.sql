/*
  # Initial Database Schema

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to auth.users
    - `training_sessions`
      - Records completed training sessions
    - `nouns`
      - Stores German nouns with articles
    - `user_settings`
      - Stores user-specific app settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  first_name text,
  last_name text,
  email text,
  country_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- User Settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  default_questions_per_session integer DEFAULT 10,
  default_seconds_per_question integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Nouns table
CREATE TABLE IF NOT EXISTS nouns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  article text NOT NULL CHECK (article IN ('der', 'die', 'das')),
  translation text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE nouns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view nouns"
  ON nouns FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert nouns"
  ON nouns FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own nouns"
  ON nouns FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Training Sessions table
CREATE TABLE IF NOT EXISTS training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  correct_answers integer NOT NULL,
  total_questions integer NOT NULL,
  seconds_per_question integer NOT NULL,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON training_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON training_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);