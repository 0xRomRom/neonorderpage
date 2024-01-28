import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbmfvyxbtjvbjzdsutwk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibWZ2eXhidGp2Ymp6ZHN1dHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4OTY2OTIsImV4cCI6MjAyMTQ3MjY5Mn0.Tpq3kIq3cx_OOSX1DRBoWiGytALWNMIURQgtBinNbkE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
