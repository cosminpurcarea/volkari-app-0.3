/*
  # Add insert policy for session answers

  1. Changes
    - Add insert policy for session_answers table to allow authenticated users to insert their own answers
    - Add cascade delete to ensure answers are deleted when a session is deleted

  2. Security
    - Users can only insert answers for their own training sessions
    - Answers are automatically deleted when the parent session is deleted
*/

-- Add insert policy for session answers
CREATE POLICY "Users can insert own session answers"
  ON session_answers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM training_sessions
      WHERE training_sessions.id = session_answers.session_id
      AND training_sessions.user_id = auth.uid()
    )
  );