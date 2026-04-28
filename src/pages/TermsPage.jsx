import React from 'react';
import { Gavel, CheckCircle2, AlertTriangle, FileWarning, HelpCircle } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
           <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Gavel size={40} />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-[#09264d] mb-6">شروط الاستخدام</h1>
           <p className="text-slate-500 text-lg font-bold">يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-gray-100 space-y-12">
          
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <CheckCircle2 size={24} className="text-teal-600" /> قبول الشروط
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              بمجرد دخولك إلى موقع حضرميديا، فإنك توافق على الالتزام بشروط الاستخدام هذه، وجميع القوانين واللوائح المعمول بها، وتتحمل المسؤولية عن الامتثال لأي قوانين محلية سارية.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <AlertTriangle size={24} className="text-orange-500" /> حقوق الملكية الفكرية
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              جميع المحتويات المنشورة على حضرميديا من أخبار، تقارير، صور، فيديوهات، وتصاميم هي ملك حصري للمنصة ما لم يذكر خلاف ذلك. يمنع نسخ أو إعادة توزيع أي محتوى دون إذن كتابي مسبق أو ذكر المصدر بوضوح.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <FileWarning size={24} className="text-red-600" /> إخلاء المسؤولية
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              يتم تقديم المواد الموجودة على موقعنا "كما هي". لا تقدم حضرميديا أي ضمانات، صريحة أو ضمنية، وتخلي مسؤوليتها بموجب هذا من جميع الضمانات الأخرى بما في ذلك الضمانات المتعلقة بصحة المعلومات أو دقتها.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-[#09264d] flex items-center gap-3">
              <HelpCircle size={24} className="text-blue-600" /> سلوك المستخدم
            </h2>
            <p className="text-slate-600 font-bold leading-loose">
              يلتزم المستخدم بعدم استخدام الموقع لإرسال أو نشر أي محتوى غير قانوني، تهديدي، مسيء، أو ينتهك حقوق الآخرين بأي شكل من الأشكال. نحتفظ بالحق في حذف أي تعليقات أو مساهمات تخالف هذه الشروط.
            </p>
          </section>

          <div className="bg-red-50 p-8 rounded-3xl border border-red-100 text-center mt-12">
             <p className="text-red-800 font-black">أي استفسار قانوني؟</p>
             <p className="text-red-600 text-sm font-bold mt-2 mb-6">يرجى التواصل مع القسم القانوني عبر البريد الإلكتروني المخصص</p>
             <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-red-700 transition-all shadow-lg">legal@hadramedia.com</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
