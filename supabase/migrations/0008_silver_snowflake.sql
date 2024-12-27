/*
  # Fix profile email handling and add email functions

  1. Changes
    - Add email sending function
    - Add profile validation function
    - Update profile triggers
*/

-- Create a function to validate profile email
CREATE OR REPLACE FUNCTION validate_profile_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NULL THEN
    RAISE EXCEPTION 'email cannot be null';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile validation
CREATE TRIGGER ensure_profile_email
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION validate_profile_email();

-- Create a function to send email reports
CREATE OR REPLACE FUNCTION send_progress_report(
  user_id uuid,
  report_data jsonb
) RETURNS void AS $$
BEGIN
  -- Function implementation will be handled by Edge Functions
  -- This is just a placeholder for the schema
  NULL;
END;
$$ LANGUAGE plpgsql;