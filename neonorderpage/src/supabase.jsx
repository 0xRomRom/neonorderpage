import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://unyegxpidukmsjvbisjm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVueWVneHBpZHVrbXNqdmJpc2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMjUwNzYsImV4cCI6MjAyNDgwMTA3Nn0.ktF82qtr_BzQiJk6Z7ZN7yiZD75EMrjcC_wdQbcUjEw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
