import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ptlkohsmxutekuvupwic.supabase.co';

const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bGtvaHNteHV0ZWt1dnVwd2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NjQ1MjcsImV4cCI6MjA0MTE0MDUyN30.dSjHBG4NQAmSEm3FAo1QsbBs8xMEE80uXkGu6NWJ8bo`;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
