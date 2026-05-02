import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkStatus() {
  const { data, error } = await supabase
    .from('news')
    .select('status');

  if (error) {
    console.error(error);
    return;
  }

  const counts = data.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  console.log('Status counts:', counts);
}

checkStatus();
