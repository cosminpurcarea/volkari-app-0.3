/*
  # Add countries table and update input styles

  1. New Tables
    - `countries`
      - `code` (text, primary key)
      - `name` (text, not null)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `countries` table
    - Add policy for authenticated users to read countries data
*/

CREATE TABLE IF NOT EXISTS countries (
  code text PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view countries"
  ON countries FOR SELECT
  TO authenticated
  USING (true);

-- Insert common countries
INSERT INTO countries (code, name) VALUES
  ('DE', 'Germany'),
  ('AT', 'Austria'),
  ('CH', 'Switzerland'),
  ('US', 'United States'),
  ('GB', 'United Kingdom'),
  ('FR', 'France'),
  ('IT', 'Italy'),
  ('ES', 'Spain'),
  ('PT', 'Portugal'),
  ('NL', 'Netherlands'),
  ('BE', 'Belgium'),
  ('DK', 'Denmark'),
  ('SE', 'Sweden'),
  ('NO', 'Norway'),
  ('FI', 'Finland')
ON CONFLICT (code) DO NOTHING;