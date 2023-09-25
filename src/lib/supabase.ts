import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://dbpeqkbuidwlvznanzph.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGVxa2J1aWR3bHZ6bmFuenBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMzEyNzgsImV4cCI6MTk4MzkwNzI3OH0.mQ_I7AqtkOhIJTNJAv167JUMiiDy5wsErs6jI6vzjnY')

export { supabase }
