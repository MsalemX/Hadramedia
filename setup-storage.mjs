import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value.length > 0) {
    envVars[key.trim()] = value.join('=').trim().replace(/(^"|"$)/g, '');
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    // 1. List buckets to see if 'content' exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;

    const contentBucketExists = buckets.some(b => b.name === 'content');

    if (!contentBucketExists) {
      console.log("Bucket 'content' does not exist. Creating it...");
      // 2. Create the 'content' bucket and make it public
      const { data, error: createError } = await supabase.storage.createBucket('content', {
        public: true,
        allowedMimeTypes: null, // Allow all
        fileSizeLimit: null     // No limit
      });
      if (createError) throw createError;
      console.log("Bucket 'content' created successfully.");
    } else {
      console.log("Bucket 'content' already exists.");
      // Ensure it's public
      const { data, error: updateError } = await supabase.storage.updateBucket('content', {
        public: true
      });
      if (updateError) throw updateError;
      console.log("Bucket 'content' is confirmed to be public.");
    }

    console.log("Setup complete!");
  } catch (error) {
    console.error("Error setting up storage:", error);
  }
}

setupStorage();
