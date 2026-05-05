import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [urgentNews, setUrgentNews] = useState([]);
  const [tickerText, setTickerText] = useState("");
  const [animationDuration, setAnimationDuration] = useState("15s");

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

  useEffect(() => {
    let totalChars = 0;
    if (tickerText) {
      totalChars += tickerText.split('\n').map(t => t.trim()).join(' ').length;
    }
    if (urgentNews.length > 0) {
      totalChars += urgentNews.join(' ').length;
    }
    
    // Add extra padding for the separators to character count
    const separatorsCount = (tickerText ? tickerText.split('\n').length : 0) + urgentNews.length;
    totalChars += separatorsCount * 15; // approximate width equivalent in chars
    
    // 0.08s per character makes it faster.
    // Ensure it doesn't go too fast for short strings by setting a minimum of 10 seconds
    const calculatedDuration = Math.max(10, totalChars * 0.08);
    setAnimationDuration(`${calculatedDuration}s`);
  }, [tickerText, urgentNews]);

  if (!tickerText && urgentNews.length === 0) return null;

  const renderItems = (keyPrefix) => {
    const items = [];
    if (tickerText) {
      tickerText.split('\n').forEach((text, idx) => {
        if (text.trim()) {
          items.push(
            <React.Fragment key={`${keyPrefix}-ticker-${idx}`}>
              <span className="mx-10 text-white font-black">{text.trim()}</span>
              <span className="mx-10 font-black opacity-30">|</span>
            </React.Fragment>
          );
        }
      });
    }
    urgentNews.forEach((title, i) => {
      items.push(
        <React.Fragment key={`${keyPrefix}-urgent-${i}`}>
          <span className="mx-10">{title}</span>
          <span className="mx-10 font-black opacity-30">|</span>
        </React.Fragment>
      );
    });
    return items;
  };

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
            style={{ 
              animationDuration: animationDuration,
              animationPlayState: isPaused ? 'paused' : 'running' 
            }}
          >
            {/* النسخة الأولى */}
            {renderItems('first')}

            {/* النسخة الثانية (مكررة للحلقة السلسة) */}
            {renderItems('second')}
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
          animation-name: marquee-rtl;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

export default NewsTicker;

