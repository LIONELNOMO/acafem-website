import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kwhcnmzpcyfnbuvjaulk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aGNubXpwY3lmbmJ1dmphdWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NTM0MzIsImV4cCI6MjA4MjEyOTQzMn0.zRl6eivG27eGlS1iHpB4kB5FFx0zKKUPPWZYfU0NZjQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
