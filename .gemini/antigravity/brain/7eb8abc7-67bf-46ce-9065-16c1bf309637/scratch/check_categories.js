import { supabase } from './src/lib/supabase';

async function checkTable() {
  const { data, error } = await supabase.from('categories').select('*').limit(1);
  if (error) {
    console.log('Error or table missing:', error.message);
  } else {
    console.log('Table exists, data:', data);
  }
}

checkTable();
