import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PrivacyPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data: pageData } = await supabase
          .from('site_pages')
          .select('content')
          .eq('id', 'privacy')
          .single();
        
        if (pageData) setData(pageData.content);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPageData();
  }, []);

  const title = data?.title || 'سياسة الخصوصية';
  const content = data?.content || `نحن في حضرميديا نولي أهمية قصوى لخصوصية زوارنا ومتابعينا. توضح هذه الصفحة أنواع المعلومات الشخصية التي نجمعها وكيفية استخدامها وحمايتها.

نقوم بجمع المعلومات التي تقدمها لنا طواعية عند الاشتراك في النشرة البريدية أو التواصل معنا عبر نماذج الموقع. تشمل هذه المعلومات الاسم والبريد الإلكتروني.

نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم وتحليل حركة المرور على الموقع. يمكنك تعطيل هذه الملفات من إعدادات متصفحك في أي وقت.

نطبق معايير تقنية وإدارية صارمة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح.`;

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-[#09264d] text-white pt-24 pb-48 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-20 h-20 bg-blue-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-xl border border-white/10">
            <Shield size={40} className="text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{title}</h1>
          <p className="text-blue-100 text-lg md:text-xl font-bold opacity-80 leading-relaxed max-w-2xl mx-auto">
            نلتزم بحماية بياناتك وخصوصيتك وتوفير تجربة تصفح آمنة وموثوقة لكافة مستخدمينا.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-10">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-gray-100">
           <div className="prose prose-lg max-w-none prose-slate prose-headings:font-black prose-p:font-bold prose-p:text-slate-600 prose-p:leading-loose">
              <div className="whitespace-pre-wrap font-bold text-slate-600 leading-loose">
                {content}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
