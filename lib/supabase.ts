import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

import { Database } from "./database.types.js";

dotenv.config();

const client = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export default client;
