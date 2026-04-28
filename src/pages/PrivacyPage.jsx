import React from 'react';
import { Shield, Lock, Eye, File, Bell } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
           <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Shield size={40} />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-[#09264d] mb-6">سياسة الخصوصية</h1>
           <p className="text-slate-500 text-lg font-bold">آخر تحديث: 25 مايو 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100 space-y-12">
          
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <Lock size={24} className="text-red-600" /> مقدمة
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              نحن في حضرميديا نولي أهمية قصوى لخصوصية زوارنا. توضح وثيقة سياسة الخصوصية هذه أنواع المعلومات الشخصية التي يتم استلامها وجمعها وكيفية استخدامها.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <File size={24} className="text-red-600" /> جمع المعلومات
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              مثل العديد من المواقع الأخرى، نجمع معلومات معينة تلقائياً ونخزنها في ملفات السجل. تشمل هذه المعلومات عناوين بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طابع التاريخ والوقت، صفحات الإحالة/الخروج، وعدد النقرات.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <Eye size={24} className="text-red-600" /> الكوكيز (Cookies)
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              نستخدم الكوكيز لتخزين معلومات عن تفضيلات الزوار، وتسجيل معلومات محددة عن الصفحات التي يصل إليها المستخدم أو يزورها، وتخصيص محتوى صفحة الويب بناءً على نوع متصفح الزوار أو معلومات أخرى يرسلها الزائر عبر المتصفح.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <Bell size={24} className="text-red-600" /> التعديلات
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. ننصحك بمراجعة هذه الصفحة دورياً.
            </p>
          </section>

          <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 text-center mt-12">
             <p className="text-[#09264d] font-black mb-4">هل لديك استفسار حول خصوصيتك؟</p>
             <button className="bg-[#09264d] text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-900 transition-all shadow-lg">تواصل مع مسؤول الخصوصية</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
