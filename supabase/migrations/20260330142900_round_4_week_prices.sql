/*
  # Round 4-week prices down to nearest dollar

  ## Summary
  Updates all 4-week package prices to round down to the nearest dollar amount.

  ## Changes
  - Studio: $168.30 → $168
  - 1-Bedroom: $202.30 → $202
  - 2-Bedroom: $253.30 → $253
  - 3-Bedroom+: $321.30 → $321
*/

-- Update duration_options to round 4-week prices down
UPDATE packages SET duration_options = 
  CASE 
    WHEN name = 'Studio' THEN '{"2": {"weeks": 2, "price": 99.00}, "4": {"weeks": 4, "price": 168.00}}'::jsonb
    WHEN name = '1-Bedroom' THEN '{"2": {"weeks": 2, "price": 119.00}, "4": {"weeks": 4, "price": 202.00}}'::jsonb
    WHEN name = '2-Bedroom' THEN '{"2": {"weeks": 2, "price": 149.00}, "4": {"weeks": 4, "price": 253.00}}'::jsonb
    WHEN name = '3-Bedroom+' THEN '{"2": {"weeks": 2, "price": 189.00}, "4": {"weeks": 4, "price": 321.00}}'::jsonb
  END
WHERE name IN ('Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom+');