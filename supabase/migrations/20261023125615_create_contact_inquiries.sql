/*
# Create contact_inquiries table (single-tenant, no auth)

1. New Tables
- `contact_inquiries`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — the visitor's name
  - `email` (text, not null) — the visitor's email address
  - `service` (text, not null) — the photography service they're interested in
  - `preferred_date` (date, nullable) — optional preferred session date
  - `message` (text, not null) — the visitor's message
  - `is_read` (boolean, default false) — flag for the photographer to mark inquiries as read
  - `created_at` (timestamptz, default now()) — submission timestamp
  - `ip_hash` (text, nullable) — optional hashed IP for spam analysis (not populated by frontend)

2. Security
- Enable RLS on `contact_inquiries`.
- Grant INSERT to `anon, authenticated` so the public contact form can submit inquiries.
- Grant SELECT/UPDATE/DELETE to `authenticated` only — the photographer can view and manage
  inquiries after signing in. No anon SELECT: the public can submit but cannot read back.
- INSERT policy: allow anyone to insert (public contact form).
- No SELECT/UPDATE/DELETE policies for anon — inquiries are private to the photographer.

3. Notes
- This is a no-auth public contact form. The frontend inserts via the anon key.
- The photographer would need a Supabase dashboard or a signed-in admin view to read inquiries.
- A rate-limit policy could be added later if spam becomes an issue. The honeypot field in the
  frontend form provides basic spam prevention.
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  preferred_date date,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  ip_hash text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Grant INSERT to anon + authenticated (public contact form)
GRANT INSERT ON contact_inquiries TO anon, authenticated;

-- Grant SELECT/UPDATE/DELETE to authenticated only (photographer management)
GRANT SELECT, UPDATE, DELETE ON contact_inquiries TO authenticated;

-- INSERT policy: anyone can submit an inquiry
DROP POLICY IF EXISTS "anon_insert_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_inquiries"
ON contact_inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- SELECT policy: only authenticated users can read inquiries
DROP POLICY IF EXISTS "authenticated_select_inquiries" ON contact_inquiries;
CREATE POLICY "authenticated_select_inquiries"
ON contact_inquiries FOR SELECT
TO authenticated USING (true);

-- UPDATE policy: only authenticated users can update inquiries
DROP POLICY IF EXISTS "authenticated_update_inquiries" ON contact_inquiries;
CREATE POLICY "authenticated_update_inquiries"
ON contact_inquiries FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

-- DELETE policy: only authenticated users can delete inquiries
DROP POLICY IF EXISTS "authenticated_delete_inquiries" ON contact_inquiries;
CREATE POLICY "authenticated_delete_inquiries"
ON contact_inquiries FOR DELETE
TO authenticated USING (true);
