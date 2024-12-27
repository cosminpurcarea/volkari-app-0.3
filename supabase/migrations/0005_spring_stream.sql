/*
  # Fix User Settings RLS Policies

  1. Changes
    - Drop existing RLS policies for user_settings table
    - Add new policies for:
      - Inserting own settings
      - Updating own settings
      - Viewing own settings
  
  2. Security
    - Enable RLS on user_settings table
    - Ensure users can only access their own settings
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;

-- Create new policies
CREATE POLICY "Users can insert own settings"
  ON user_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own settings"
  ON user_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own settings"
  ON user_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);