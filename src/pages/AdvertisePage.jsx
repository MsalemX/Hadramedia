import React from 'react';
import {
   BarChart,
   Users,
   Monitor,
   MousePointer,
   CheckCircle,
   Mail,
   Phone,
   MessageSquare,
   Download,
} from 'lucide-react';

const AdvertisePage = () => {
   const stats = [
      {
         icon: BarChart,
         title: 'وصول واسع',
         desc: 'استهدف آلاف القراء المهتمين بالأخبار والمحتوى المحلي يومياً.',
         color: 'bg-red-600',
      },
      {
         icon: Users,
         title: 'جمهور مستهدف',
         desc: 'إعلاناتك تصل للجمهور المناسب داخل حضرموت واليمن.',
         color: 'bg-[#09264d]',
      },
      {
         icon: MousePointer,
         title: 'تفاعل أعلى',
         desc: 'مساحات إعلانية واضحة تزيد من فرص النقر والتحويل.',
         color: 'bg-blue-600',
      },
   ];

   const ads = [
      {
         title: 'بنر الصفحة الرئيسية (Header)',
         size: '728x90',
         price: 'ابتداءً من $150',
         features: ['ظهور دائم في أعلى الصفحة', 'قابل للنقر المباشر', 'متوافق مع الجوال'],
      },
      {
         title: 'إعلان داخل المقالات (Mid-Content)',
         size: '300x250',
         price: 'ابتداءً من $100',
         features: ['ظهور وسط المحتوى للقراء', 'تفاعل عالي جداً', 'استهداف أقسام محددة'],
      },
      {
         title: 'مقال ترويجي (Sponsored Post)',
         size: 'مقال كامل',
         price: 'ابتداءً من $200',
         features: ['محتوى تحريري احترافي', 'مشاركة عبر منصات التواصل', 'أرشفة دائمة في الموقع'],
      },
      {
         title: 'إعلان الشريط الجانبي (Sidebar)',
         size: '300x600',
         price: 'ابتداءً من $80',
         features: ['ظهور في كافة الصفحات الداخلية', 'تصميم طولي ملفت', 'مثالي للعروض والمنتجات'],
      },
   ];

   return (
      <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
         {/* Hero Section */}
         <div className="bg-[#09264d] text-white pt-24 pb-48 px-6 text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
               <span className="bg-red-600 px-5 py-2 rounded-full text-xs font-black mb-8 inline-block uppercase tracking-widest shadow-lg">
                  نمو وتوسع
               </span>

               <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                  صل إلى جمهورك المستهدف في حضرموت واليمن
               </h1>

               <p className="text-blue-100 text-lg md:text-xl font-bold opacity-80 leading-relaxed mb-12">
                  منصة حضرميديا توفر لك مساحات إعلانية متنوعة وحلول تسويقية ذكية تصل بعلامتك التجارية إلى آلاف القراء يومياً.
               </p>

               <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-red-900/40">
                     اطلب عرض سعر
                  </button>

                  <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all border border-white/10 flex items-center gap-3">
                     <Download size={20} />
                     تحميل دليل الإعلان
                  </button>
               </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
         </div>

         <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
            {/* Why Advertise With Us */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
               {stats.map((item, index) => {
                  const Icon = item.icon;

                  return (
                     <div
                        key={index}
                        className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 group"
                     >
                        <div
                           className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform`}
                        >
                           <Icon size={32} />
                        </div>

                        <h3 className="text-2xl font-black text-[#09264d] mb-4">
                           {item.title}
                        </h3>

                        <p className="text-slate-500 font-bold leading-relaxed">
                           {item.desc}
                        </p>
                     </div>
                  );
               })}
            </div>

            {/* Ad Placements */}
            <div className="mb-24">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-black text-[#09264d] mb-4">
                     خيارات الإعلان المتاحة
                  </h2>
                  <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full" />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {ads.map((ad, i) => (
                     <div
                        key={i}
                        className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center group hover:border-red-100 transition-all"
                     >
                        <div className="w-full md:w-48 h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group-hover:border-red-200 group-hover:text-red-200 transition-colors">
                           <Monitor size={32} />
                           <span className="text-xs font-black mt-2">{ad.size}</span>
                        </div>

                        <div className="flex-1 w-full">
                           <h3 className="text-xl font-black text-[#09264d] mb-4">
                              {ad.title}
                           </h3>

                           <ul className="space-y-3 mb-6">
                              {ad.features.map((feature, j) => (
                                 <li
                                    key={j}
                                    className="flex items-center gap-3 text-slate-500 font-bold"
                                 >
                                    <CheckCircle size={18} className="text-red-600" />
                                    {feature}
                                 </li>
                              ))}
                           </ul>

                           <div className="flex items-center justify-between">
                              <span className="text-red-600 font-black">{ad.price}</span>

                              <button className="text-[#09264d] font-black text-sm flex items-center gap-1 hover:text-red-600">
                                 اطلب الآن
                                 <MousePointer size={16} />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Contact Form Area */}
            <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="lg:col-span-5">
                  <h2 className="text-3xl md:text-4xl font-black text-[#09264d] mb-8 leading-tight">
                     ابدأ حملتك الإعلانية اليوم
                  </h2>

                  <p className="text-slate-500 font-bold leading-relaxed mb-12">
                     فريق التسويق لدينا جاهز لمساعدتك في اختيار الخطة الأمثل التي تحقق أهدافك التجارية. تواصل معنا للحصول على استشارة مجانية.
                  </p>

                  <div className="space-y-6">
                     <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                           <Mail size={24} />
                        </div>

                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase">
                              البريد الإلكتروني
                           </p>
                           <p className="font-bold text-[#09264d]">
                              ads@hadramedia.com
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                           <Phone size={24} />
                        </div>

                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase">
                              واتساب للأعمال
                           </p>
                           <p className="font-bold text-[#09264d]">
                              +967 770 000 000
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-7">
                  <form className="space-y-6 bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-gray-100">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                           type="text"
                           placeholder="الاسم الكامل"
                           className="bg-white border-none rounded-xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none"
                        />

                        <input
                           type="email"
                           placeholder="البريد الإلكتروني"
                           className="bg-white border-none rounded-xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none"
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                           type="text"
                           placeholder="اسم الشركة"
                           className="bg-white border-none rounded-xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none"
                        />

                        <select className="bg-white border-none rounded-xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none text-slate-400">
                           <option>نوع الإعلان المطلوب</option>
                           <option>بنر رئيسي</option>
                           <option>مقال ترويجي</option>
                           <option>إعلان جوال</option>
                        </select>
                     </div>

                     <textarea
                        placeholder="تفاصيل إضافية عن طلبك..."
                        rows={5}
                        className="w-full bg-white border-none rounded-xl px-6 py-5 text-sm font-bold focus:ring-4 focus:ring-red-600/5 transition-all outline-none"
                     />

                     <button className="w-full bg-[#09264d] hover:bg-blue-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 text-xl flex items-center justify-center gap-3">
                        <MessageSquare size={24} />
                        إرسال الطلب
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdvertisePage;