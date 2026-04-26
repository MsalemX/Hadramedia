import React from 'react';
import { NavLink } from 'react-router-dom';
import { Filter, Calendar, Bell, ChevronLeft, Clock, Eye, ChevronDown } from 'lucide-react';

// Image Assets
const heroImg = "images/hero.png";
const defaultImg = "images/image.jpg";

const events = [
  {
    id: 1,
    title: 'ارتفاع أسعار النفط عالمياً وسط توقعات بزيادة الطلب',
    excerpt: 'ارتفعت أسعار النفط الخام بنسبة 2% في التعاملات المبكرة اليوم وسط توقعات بزيادة الطلب العالمي على الطاقة خلال الربع القادم.',
    category: 'اقتصاد',
    date: 'منذ ساعة',
    views: '2.4K',
    image: defaultImg
  },
  {
    id: 2,
    title: 'أجهزة الأمن تضبط عصابة متورطة في عمليات سطو مسلح',
    excerpt: 'تمكنت الأجهزة الأمنية في المكلا من ضبط عصابة تتكون من 5 أشخاص متورطة في عدة عمليات سطو على محلات تجارية.',
    category: 'أمن',
    date: 'منذ 3 ساعات',
    views: '1.8K',
    image: defaultImg
  },
  {
    id: 3,
    title: 'منظمات إغاثية توزع مساعدات غذائية في مخيمات النازحين',
    excerpt: 'تواصل المنظمات الإغاثية توزيع المساعدات الغذائية والطبية على الأسر النازحة في مخيمات متعددة بدعم من جهات مانحة.',
    category: 'مجتمع',
    date: 'منذ 5 ساعات',
    views: '1.5K',
    image: defaultImg
  },
  {
    id: 4,
    title: 'التعليم تعلن عن خطة تطوير شاملة للمناهج الدراسية',
    excerpt: 'أعلنت وزارة التربية والتعليم عن خطة شاملة لتطوير المناهج الدراسية لجميع المراحل التعليمية بما يواكب التطورات الحديثة.',
    category: 'تعليم',
    date: 'منذ 8 ساعات',
    views: '1.2K',
    image: defaultImg
  },
];

const popularEvents = [
  { id: 1, title: 'انطلاق مشروع مياه جديد في مدينة تريم بتكلفة 1.5 مليار ريال', date: '19 مايو 2024', image: defaultImg },
  { id: 2, title: 'حملة أمنية واسعة في سيئون لمكافحة الجريمة المنظمة', date: '18 مايو 2024', image: defaultImg },
  { id: 3, title: 'تدشين البرنامج التدريبي للشباب في مجال ريادة الأعمال', date: '16 مايو 2024', image: defaultImg },
  { id: 4, title: 'وفد أممي يزور حضرموت للاطلاع على الأوضاع الإنسانية', date: '15 مايو 2024', image: defaultImg },
  { id: 5, title: 'افتتاح معرض الكتاب بمشاركة أكثر من 30 دار نشر', date: '15 مايو 2024', image: defaultImg },
];

const provinces = [
  { name: 'المكلا', count: '128 حدث', image: defaultImg },
  { name: 'سيئون', count: '96 حدث', image: defaultImg },
  { name: 'تريم', count: '74 حدث', image: defaultImg },
  { name: 'غيل باوزير', count: '65 حدث', image: defaultImg },
  { name: 'الشحر', count: '53 حدث', image: defaultImg },
  { name: 'أرياف حضرموت', count: '112 حدث', image: defaultImg },
];

const EventsPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4 mb-8">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
              <ChevronLeft size={14} />
              <span className="text-slate-600">أحداث</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#09264d] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">أحداث</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR (Left in Screenshot, Last in RTL JSX) */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
            {/* Filter Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                <Filter size={18} className="text-blue-600" />
                تصفية الأحداث
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-wider">تصنيف الحدث</label>
                  <div className="relative group">
                    <select className="w-full bg-slate-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-blue-600/5 transition-all outline-none">
                      <option>كل التصنيفات</option>
                      <option>محلية</option>
                      <option>اقتصادية</option>
                      <option>أمنية</option>
                    </select>
                    <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-wider">المحافظة</label>
                  <div className="relative group">
                    <select className="w-full bg-slate-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-blue-600/5 transition-all outline-none">
                      <option>كل المحافظات</option>
                      <option>حضرموت</option>
                      <option>المهرة</option>
                      <option>شبوة</option>
                    </select>
                    <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-wider">التاريخ</label>
                  <div className="relative group">
                    <input type="text" placeholder="اختيار التاريخ" className="w-full bg-slate-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none" />
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors pointer-events-none" />
                  </div>
                </div>

                <button className="w-full bg-[#09264d] hover:bg-blue-900 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-blue-900/20 text-lg">بـحـث</button>
              </div>
            </div>

            {/* Popular Events */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">الأكثر قراءة في الأحداث</h3>
              <div className="space-y-6">
                {popularEvents.map((event, i) => (
                  <div key={event.id} className="flex gap-4 items-center group cursor-pointer">
                    <div className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 w-6">{i + 1}</div>
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-slate-800 leading-5 group-hover:text-blue-600 transition-colors line-clamp-2">{event.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 block">{event.date}</span>
                    </div>
                    <img src={event.image} alt="" className="w-16 h-12 object-cover rounded-lg shadow-sm shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex-1 pr-2">
                    <h3 className="font-black text-slate-800 mb-1">اشعارات الأحداث</h3>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">اشترك لتصلك تنبيهات بالأحداث الجديدة فور حدوثها</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 border border-gray-100 shrink-0">
                    <Bell size={20} />
                  </div>
               </div>
               <button className="w-full bg-[#09264d] hover:bg-blue-900 text-white font-black py-4 rounded-xl transition-all shadow-lg text-sm relative z-10">اشترك الآن</button>
               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl" />
            </div>
          </aside>

          {/* MAIN CONTENT (Right in Screenshot, First in RTL JSX) */}
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {/* Featured Hero */}
            <section className="relative rounded-[2.5rem] overflow-hidden h-[480px] group shadow-2xl">
              <img src={heroImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 right-0 left-0 p-12 text-white">
                <span className="bg-blue-600 px-4 py-2 rounded-lg text-[10px] font-black mb-6 inline-block shadow-lg">أحداث محلية</span>
                <h2 className="text-4xl font-black mb-6 leading-tight max-w-3xl drop-shadow-lg group-hover:text-blue-200 transition-colors">تنمية حضرموت: مشاريع جديدة لتعزيز البنية التحتية ودعم الاقتصاد المحلي</h2>
                <p className="text-gray-300 text-base mb-8 max-w-2xl leading-relaxed font-bold opacity-90">تواصل الجهات الحكومية والجهات المحلية تنفيذ مشاريع تنموية في مختلف القطاعات تهدف إلى تحسين الخدمات وتوفير فرص العمل.</p>
                
                <div className="flex items-center gap-8 text-xs font-black text-gray-400 border-t border-white/10 pt-8">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-blue-500" /> 20 مايو 2024</span>
                  <span className="flex items-center gap-2"><Eye size={16} className="text-blue-500" /> 12.5K مشاهدة</span>
                </div>
              </div>
            </section>

            {/* Latest Events List */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                <h2 className="text-2xl font-black text-slate-800">آخر الأحداث</h2>
              </div>
              
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 hover:shadow-md transition-all group cursor-pointer">
                    <div className="flex-1 order-2 md:order-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-slate-100 text-[#09264d] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">{event.category}</span>
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">{event.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm font-bold leading-relaxed mb-6 line-clamp-2">{event.excerpt}</p>
                      <div className="flex items-center gap-6 text-[11px] font-black text-slate-400 border-t border-gray-50 pt-4">
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {event.date}</span>
                        <span className="flex items-center gap-1.5"><Eye size={14} className="text-blue-500" /> {event.views} مشاهدة</span>
                      </div>
                    </div>
                    <div className="w-full md:w-56 h-40 shrink-0 order-1 md:order-2 overflow-hidden rounded-2xl shadow-inner">
                      <img src={event.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-12 py-5 bg-white border border-gray-200 rounded-3xl text-slate-600 font-black hover:bg-slate-50 hover:shadow-md transition-all text-sm shadow-sm">عرض المزيد</button>
            </section>

            {/* Province Events */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                <h2 className="text-2xl font-black text-slate-800">أحداث المحافظات</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {provinces.map((prov, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="h-24 relative">
                       <img src={prov.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                    </div>
                    <div className="p-4 text-center">
                      <h4 className="font-black text-xs text-slate-800 mb-1">{prov.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{prov.count}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-10 py-4 bg-white border border-gray-100 rounded-2xl text-slate-500 font-black hover:bg-slate-50 transition-all text-xs shadow-sm">عرض كل المحافظات</button>
            </section>
          </main>

        </div>
      </div>
    </div>
  );
};

export default EventsPage;
