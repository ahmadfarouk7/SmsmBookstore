import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qgecloxlzorpbbhtgocf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZWNsb3hsem9ycGJiaHRnb2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTIxNzEsImV4cCI6MjA5NDc4ODE3MX0.4pHoa32fr8ZpB4Bvg6RYilCh6TLEAyKq0AhcQcu85zM";

export const supabase = createClient(supabaseUrl, supabaseKey);
