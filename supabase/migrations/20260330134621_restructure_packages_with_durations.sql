/*
  # Restructure packages to support duration options

  1. Changes
    - Add `duration_options` JSONB column to store pricing for different rental weeks
    - Remove `rental_weeks` column as it will be stored in duration_options
    - Remove `price` column as prices will be in duration_options
    - Delete existing 4-week duplicate packages
    - Update existing packages with duration options (2 weeks and 4 weeks pricing)
  
  2. Data Structure
    duration_options format: 
    {
      "2": {"weeks": 2, "price": 99.00},
      "4": {"weeks": 4, "price": 168.30}
    }

  3. Security
    - Maintains existing RLS policies
*/

-- Remove duplicate 4-week packages
DELETE FROM packages WHERE name LIKE '%(4 weeks)%';

-- Add duration_options column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'packages' AND column_name = 'duration_options'
  ) THEN
    ALTER TABLE packages ADD COLUMN duration_options JSONB DEFAULT '{}';
  END IF;
END $$;

-- Update existing packages with duration options
UPDATE packages SET duration_options = 
  CASE 
    WHEN name = 'Studio' THEN '{"2": {"weeks": 2, "price": 99.00}, "4": {"weeks": 4, "price": 168.30}}'::jsonb
    WHEN name = '1-Bedroom' THEN '{"2": {"weeks": 2, "price": 119.00}, "4": {"weeks": 4, "price": 202.30}}'::jsonb
    WHEN name = '2-Bedroom' THEN '{"2": {"weeks": 2, "price": 149.00}, "4": {"weeks": 4, "price": 253.30}}'::jsonb
    WHEN name = '3-Bedroom+' THEN '{"2": {"weeks": 2, "price": 189.00}, "4": {"weeks": 4, "price": 321.30}}'::jsonb
  END
WHERE duration_options = '{}'::jsonb;

-- Drop old columns (keep price and rental_weeks for now for backward compatibility, will remove after UI update)
-- We'll handle this in a future migration after verifying the UI works