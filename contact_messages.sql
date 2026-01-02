-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Everyone can insert (send message)
CREATE POLICY "Everyone can send messages" 
ON contact_messages FOR INSERT 
TO public 
WITH CHECK (true);

-- 2. Only authenticated users (admins - for now all auth users) can view/update
CREATE POLICY "Admins can view messages" 
ON contact_messages FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admins can update messages" 
ON contact_messages FOR UPDATE 
TO authenticated 
USING (true);
