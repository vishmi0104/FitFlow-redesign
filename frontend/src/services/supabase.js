import { createClient } from '@supabase/supabase-js';

// Supabase URL සහ Anon Key එක .env එකෙන් ලබා ගැනීම
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);