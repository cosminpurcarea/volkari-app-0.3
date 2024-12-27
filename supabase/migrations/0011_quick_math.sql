-- Modify profiles table to allow upsert operations
ALTER TABLE profiles
DROP CONSTRAINT IF EXISTS profiles_pkey,
ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);

-- Modify user_settings table to allow upsert operations
ALTER TABLE user_settings
DROP CONSTRAINT IF EXISTS user_settings_pkey,
ADD CONSTRAINT user_settings_pkey PRIMARY KEY (id);

-- Update profiles policies to be more permissive during signup
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can manage own profile"
  ON profiles
  FOR ALL
  USING (auth.uid() = id OR auth.uid() IS NULL)
  WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

-- Update user_settings policies
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;

CREATE POLICY "Users can manage own settings"
  ON user_settings
  FOR ALL
  USING (auth.uid() = id OR auth.uid() IS NULL)
  WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);