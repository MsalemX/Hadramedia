import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ContactPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      const { data: pageData } = await supabase
        .from('site_pages')
        .select('content')
        .eq('id', 'contact')
        .single();
      
      if (pageData) setData(pageData.content);
    };
    fetchPageData();
  }, []);

  const title = data?.title || 'تواصل معنا';
  const description = data?.description || 'نحن هنا للاستماع إليك. سواء كان لديك خبر، استفسار، أو اقتراح، لا تتردد في مراسلتنا عبر أي من قنوات التواصل المتاحة.';
  const cards = data?.cards || [
    { label: 'راسلنا بريدياً', info: 'info@hadramedia.com', icon: 'Mail' },
    { label: 'اتصل بنا', info: '+967 5 300 000', icon: 'Phone' },
    { label: 'مكتبنا', info: 'المكلا، شارع الميناء، برج الخير', icon: 'MapPin' }
  ];

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-[#09264d] text-white pt-24 pb-48 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{title}</h1>
          <p className="text-blue-100 text-lg md:text-xl font-bold opacity-80 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('images/hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            {cards.map((card, i) => {
              const Icon = card.icon === 'Mail' ? Mail : card.icon === 'Phone' ? Phone : MapPin;
              const colorClass = card.icon === 'Mail' ? 'blue' : card.icon === 'Phone' ? 'red' : 'teal';
              return (
                <div key={i} className={`bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-${colorClass}-100 transition-all`}>
                  <div className={`w-16 h-16 bg-${colorClass}-50 text-${colorClass}-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-${colorClass}-600 group-hover:text-white transition-all`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-[#09264d] mb-2">{card.label}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-4">{card.label === 'اتصل بنا' ? 'متاحون من السبت إلى الخميس' : 'المقر الرئيسي - حضرموت'}</p>
                  <span className="text-[#09264d] font-black" dir={card.icon === 'Phone' ? 'ltr' : 'rtl'}>{card.info}</span>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl border border-gray-100">
             <div className="flex items-center gap-4 mb-12">
                <div className="w-2 h-10 bg-red-600 rounded-full" />
                <h2 className="text-3xl font-black text-[#09264d]">أرسل لنا رسالة مباشرة</h2>
             </div>
             
             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">الاسم الكامل</label>
                      <input type="text" placeholder="مثال: أحمد سالم" className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">البريد الإلكتروني</label>
                      <input type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none" />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">الموضوع</label>
                      <select className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none text-slate-500">
                         <option>استفسار عام</option>
                         <option>إرسال خبر أو معلومة</option>
                         <option>بلاغ عن خطأ تقني</option>
                         <option>طلب إعلان</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">رقم الهاتف (اختياري)</label>
                      <input type="text" placeholder="+967..." className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none" />
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">نص الرسالة</label>
                   <textarea placeholder="اكتب رسالتك هنا بالتفصيل..." rows={6} className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none resize-none"></textarea>
                </div>

                <button className="bg-[#09264d] hover:bg-blue-900 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 w-full md:w-auto">
                   <Send size={24} /> إرسال الرسالة
                </button>
             </form>
          </div>
        </div>

        {/* Operating Hours Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'أوقات العمل', desc: 'السبت - الخميس: 9ص - 9م', icon: Clock },
             { title: 'الانتشار', desc: 'تغطية كاملة لمديريات حضرموت', icon: Globe },
             { title: 'سرعة الاستجابة', desc: 'نرد على كافة الاستفسارات خلال 24 ساعة', icon: MessageSquare },
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-5 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-slate-50 text-red-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                   <item.icon size={28} />
                </div>
                <div>
                   <h4 className="text-lg font-black text-[#09264d]">{item.title}</h4>
                   <p className="text-slate-400 text-sm font-bold">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
