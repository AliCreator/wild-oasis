import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gpgkumjuzyvcpcowhvxd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwZ2t1bWp1enl2Y3Bjb3dodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0NzIzNzQsImV4cCI6MjAwMzA0ODM3NH0.A1oZjRnmBRixVq2hYn5Ppnh_PzeAvG5ulgsowyICJ5A";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
