/*
  # Create Packages and Orders Tables

  1. New Tables
    - `packages`
      - `id` (uuid, primary key)
      - `name` (text) - Package name (e.g., "Studio", "1-Bedroom")
      - `price` (numeric) - Package price in dollars
      - `num_totes` (integer) - Number of totes/bins included
      - `rental_weeks` (integer) - Number of weeks included in rental
      - `created_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `delivery_address` (text)
      - `pickup_address` (text)
      - `delivery_date` (date)
      - `pickup_date` (date)
      - `package_id` (uuid, foreign key to packages)
      - `status` (text) - Order status (pending, confirmed, delivered, picked_up, completed, cancelled)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Packages: Allow public read access (for browsing)
    - Orders: Allow public insert (for booking), authenticated read/update for admin dashboard
*/

CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  num_totes integer NOT NULL,
  rental_weeks integer NOT NULL DEFAULT 2,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  delivery_address text NOT NULL,
  pickup_address text NOT NULL,
  delivery_date date NOT NULL,
  pickup_date date NOT NULL,
  package_id uuid NOT NULL REFERENCES packages(id),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view packages"
  ON packages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO packages (name, price, num_totes, rental_weeks) VALUES
  ('Studio', 99, 20, 2),
  ('1-Bedroom', 119, 30, 2),
  ('2-Bedroom', 149, 40, 2),
  ('3-Bedroom+', 189, 55, 2)
ON CONFLICT DO NOTHING;