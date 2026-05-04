import { supabase } from './src/lib/supabase';

async function checkAdsStatus() {
  const { data, error } = await supabase.from('ads').select('status').limit(10);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Ads status values:', data.map(d => d.status));
  }
}

checkAdsStatus();
