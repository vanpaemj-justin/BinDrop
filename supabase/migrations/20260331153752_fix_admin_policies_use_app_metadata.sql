/*
  # Fix Admin Policies to Use app_metadata

  ## Summary
  Fixes critical security vulnerability where admin checks use user_metadata instead of app_metadata.

  ## Security Issues Fixed
  
  1. **user_metadata vs app_metadata**
     - OLD: Policies check auth.jwt() -> 'user_metadata' ->> 'role'
     - NEW: Policies check auth.jwt() -> 'app_metadata' ->> 'role'
     - IMPACT: Users can modify user_metadata but NOT app_metadata
     - CRITICAL: This prevents privilege escalation attacks

  2. **UPDATE Policy WITH CHECK**
     - OLD: WITH CHECK (true) - allows any update
     - NEW: WITH CHECK checks admin role
     - IMPACT: Ensures admin role is verified for the updated data

  ## Changes
  - Drop existing admin policies
  - Recreate with proper app_metadata checks
  - Add admin role check to WITH CHECK clause on UPDATE policy
  - Add DELETE policy with proper admin check

  ## Notes
  - app_metadata can ONLY be set via Supabase Dashboard or Admin API
  - user_metadata can be modified by the user themselves (INSECURE for roles)
  - To grant admin: Set app_metadata: {"role": "admin"} in Auth dashboard
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Only admins can view orders" ON orders;
DROP POLICY IF EXISTS "Only admins can update orders" ON orders;
DROP POLICY IF EXISTS "Only admins can delete orders" ON orders;

-- Recreate with proper app_metadata checks
CREATE POLICY "Only admins can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Only admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "Only admins can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );