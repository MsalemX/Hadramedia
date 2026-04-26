import React, { useState } from "react";

function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-[#e00013] h-9 w-full flex items-center overflow-hidden relative shadow-md z-30" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 w-full h-full flex items-center relative">
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
            <span className="mx-10">مجلس القيادة الرئاسي يقر حزمة من القرارات الهادفة إلى تحسين الأوضاع الاقتصادية والخدمية في العاصمة المؤقتة عدن والمحافظات المحررة</span>
            <span className="mx-10 font-black opacity-30">|</span>
            <span className="mx-10">إطلاق مبادرة لدعم المشاريع الصغيرة في حضرموت وتوفير فرص عمل للشباب وتدشين المرحلة الأولى من مشروع مياه تريم</span>
            <span className="mx-10 font-black opacity-30">|</span>
            <span className="mx-10">وصول شحنات الوقود المخصصة لمحطات الكهرباء في ساحل حضرموت لتعزيز استقرار الخدمة وتخفيف معاناة المواطنين</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-rtl {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-rtl {
          display: inline-block;
          animation: marquee-rtl 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default NewsTicker;
