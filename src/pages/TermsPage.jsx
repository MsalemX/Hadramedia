import React, { useState, useEffect } from 'react';
import { FileText, ShieldCheck, AlertTriangle, Scale } from 'lucide-react';
import { supabase } from '../lib/supabase';

const TermsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data: pageData } = await supabase
          .from('site_pages')
          .select('content')
          .eq('id', 'terms')
          .single();
        
        if (pageData) setData(pageData.content);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPageData();
  }, []);

  const title = data?.title || 'الشروط والأحكام';
  const content = data?.content || `باستخدامك لموقع حضرميديا، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها بعناية.

المحتوى المنشور في الموقع هو ملكية فكرية لحضرميديا ما لم يذكر خلاف ذلك. لا يجوز إعادة نشر المحتوى دون ذكر المصدر بشكل واضح.

نحن نسعى جاهدين لضمان دقة المعلومات المنشورة، ولكننا لا نتحمل المسؤولية عن أي أخطاء أو نتائج ناتجة عن استخدام المعلومات المتاحة في الموقع.

يُحظر استخدام الموقع لنشر محتوى يحرض على العنف أو الكراهية أو يخالف القوانين المحلية والدولية.

نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق.`;

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-[#09264d] text-white pt-24 pb-48 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-20 h-20 bg-red-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-xl border border-white/10">
            <Scale size={40} className="text-red-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{title}</h1>
          <p className="text-blue-100 text-lg md:text-xl font-bold opacity-80 leading-relaxed max-w-2xl mx-auto">
            اتفاقية استخدام الموقع والقواعد المنظمة لتصفح المحتوى والمشاركة في منصات حضرميديا.
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

export default TermsPage;
