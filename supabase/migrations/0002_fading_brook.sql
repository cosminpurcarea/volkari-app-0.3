/*
  # Add session answers table

  1. New Tables
    - `session_answers`
      - `id` (uuid, primary key)
      - `session_id` (uuid, references training_sessions)
      - `noun_id` (uuid, references nouns)
      - `selected_article` (text)
      - `is_correct` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `session_answers` table
    - Add policies for authenticated users to read their own session answers
*/

CREATE TABLE IF NOT EXISTS session_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES training_sessions(id) ON DELETE CASCADE,
  noun_id uuid REFERENCES nouns(id),
  selected_article text NOT NULL CHECK (selected_article IN ('der', 'die', 'das')),
  is_correct boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE session_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own session answers"
  ON session_answers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM training_sessions
      WHERE training_sessions.id = session_answers.session_id
      AND training_sessions.user_id = auth.uid()
    )
  );