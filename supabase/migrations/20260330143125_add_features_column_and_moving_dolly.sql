/*
  # Add features column and Moving Dolly

  ## Summary
  Adds a features column to the packages table to track included items, then adds "Moving Dolly" to 1-Bedroom, 2-Bedroom, and 3-Bedroom+ packages.

  ## Changes
  1. New Column
    - `features` (jsonb array) to store included items/features for each package

  2. Package Updates
    - 1-Bedroom: Add "Moving Dolly" to features
    - 2-Bedroom: Add "Moving Dolly" to features
    - 3-Bedroom+: Add "Moving Dolly" to features
    - Studio: Empty features array (no Moving Dolly included)

  ## Security
  - Maintains existing RLS policies
*/

-- Add features column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'packages' AND column_name = 'features'
  ) THEN
    ALTER TABLE packages ADD COLUMN features JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Update packages with Moving Dolly feature
UPDATE packages 
SET features = '["Moving Dolly"]'::jsonb
WHERE name IN ('1-Bedroom', '2-Bedroom', '3-Bedroom+')
AND features = '[]'::jsonb;

-- Ensure Studio has empty features array
UPDATE packages 
SET features = '[]'::jsonb
WHERE name = 'Studio'
AND features = '[]'::jsonb;