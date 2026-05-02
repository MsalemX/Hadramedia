import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdBanner = ({ position = 'sidebar', className = '' }) => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        // البحث في كلاً من position و placement
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .or(`position.eq.${position},placement.eq.${position}`)
          .eq('status', 'نشط')
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        setAd(data);
      } catch (err) {
        console.error("Error fetching ad:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [position]);

  if (loading || !ad) return null;

  return (
    <div className={`ad-banner overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white ${className}`}>
      <a 
        href={ad.link_url || '#'} 
        target={ad.link_url ? "_blank" : "_self"} 
        rel="noopener noreferrer"
        className="block group"
      >
        <img 
          src={ad.image || ad.image_url} 
          alt={ad.title} 
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>
    </div>
  );
};

export default AdBanner;
