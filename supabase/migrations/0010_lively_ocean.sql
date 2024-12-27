-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can manage own profile" ON profiles;

-- Create new policies for profiles that allow insertion during signup
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Drop existing policies for user_settings
DROP POLICY IF EXISTS "Users can manage own settings" ON user_settings;

-- Create new policies for user_settings that allow insertion during signup
CREATE POLICY "Users can insert own settings"
  ON user_settings
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own settings"
  ON user_settings
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own settings"
  ON user_settings
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);