import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [urgentNews, setUrgentNews] = useState([]);
  const [tickerText, setTickerText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // 1. جلب النص العاجل من الإعدادات
      const { data: settings } = await supabase
        .from('settings')
        .select('breaking_news')
        .single();
      
      if (settings?.breaking_news) {
        setTickerText(settings.breaking_news);
      }

      // 2. جلب الأخبار المميزة كعاجل
      const { data: news } = await supabase
        .from('news')
        .select('title')
        .eq('is_urgent', true)
        .eq('status', 'منشور')
        .order('created_at', { ascending: false });
      
      if (news) setUrgentNews(news.map(n => n.title));
    };

    fetchData();
  }, []);

  if (!tickerText && urgentNews.length === 0) return null;

  return (
    <div className="bg-[#e00013] h-9 w-full flex items-center overflow-hidden relative shadow-md z-30" dir="rtl">
      <div className="max-w-7xl mx-auto px-2 md:px-6 w-full h-full flex items-center relative">
        {/* Label fixed on the right (First in JSX for RTL) */}
        <div className="bg-[#c00010] h-full flex items-center px-6 text-white font-black text-base relative z-20 whitespace-nowrap shadow-[5px_0_15px_rgba(0,0,0,0.3)]">
          عـاجـل
        </div>
        
        {/* Moving content container */}
        <div 
          className="flex-1 text-white font-bold px-6 overflow-hidden whitespace-nowrap text-sm relative z-10 h-full flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="inline-block animate-marquee-rtl"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* النسخة الأولى */}
            {tickerText && tickerText.split('\n').map((text, idx) => (
              <React.Fragment key={`ticker-${idx}`}>
                <span className="mx-10 text-yellow-300 font-black">{text.trim()}</span>
                <span className="mx-10 font-black opacity-30">|</span>
              </React.Fragment>
            ))}
            {urgentNews.map((title, i) => (
              <React.Fragment key={`urgent-${i}`}>
                <span className="mx-10">{title}</span>
                {i < urgentNews.length - 1 && <span className="mx-10 font-black opacity-30">|</span>}
              </React.Fragment>
            ))}

            <span className="mx-10 font-black opacity-30">|</span>

            {/* النسخة الثانية (مكررة للحلقة السلسة) */}
            {tickerText && tickerText.split('\n').map((text, idx) => (
              <React.Fragment key={`ticker2-${idx}`}>
                <span className="mx-10 text-yellow-300 font-black">{text.trim()}</span>
                <span className="mx-10 font-black opacity-30">|</span>
              </React.Fragment>
            ))}
            {urgentNews.map((title, i) => (
              <React.Fragment key={`urgent2-${i}`}>
                <span className="mx-10">{title}</span>
                {i < urgentNews.length - 1 && <span className="mx-10 font-black opacity-30">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee-rtl {
          display: inline-block;
          animation: marquee-rtl 90s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default NewsTicker;

