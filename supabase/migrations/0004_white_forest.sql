-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own session answers" ON session_answers;
DROP POLICY IF EXISTS "Users can view own session answers" ON session_answers;

-- Create more permissive policies
CREATE POLICY "Users can insert session answers"
  ON session_answers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view session answers"
  ON session_answers
  FOR SELECT
  TO authenticated
  USING (true);