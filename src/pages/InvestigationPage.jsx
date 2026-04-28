import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Search, Bell, ChevronLeft, Clock, User, Eye, FileSearch, 
  Image as ImageIcon, Share2, Filter, ChevronDown, ShieldAlert
} from 'lucide-react';

// Image Assets
const heroImg = "images/hero.png";
const portImg = "images/port.png";
const defaultImg = "images/image.jpg";

const categories = [
  { name: 'الكل', active: true },
  { name: 'سياسة' },
  { name: 'اقتصاد' },
  { name: 'مجتمع' },
  { name: 'أمن وقضاء' },
  { name: 'حقوق الإنسان' },
];

const investigations = [
  { 
    title: 'شبكات تهريب الوقود في المحافظات الشرقية', 
    category: 'اقتصاد', 
    date: '12 مايو 2024', 
    readTime: '22 دقيقة', 
    author: 'وحدة التحقيقات',
    excerpt: 'تحقيق استقصائي يكشف عن الطرق السرية والشبكات المعقدة لتهريب المشتقات النفطية وكيف تؤثر على الاقتصاد المحلي.',
    image: portImg 
  },
  { 
    title: 'أزمة المياه في حضرموت.. من المتسبب؟', 
    category: 'بيئة', 
    date: '8 مايو 2024', 
    readTime: '18 دقيقة', 
    author: 'سالم بن علي',
    excerpt: 'بحث ميداني استمر لثلاثة أشهر يكشف عن تجاوزات في حفر الآبار العشوائية وتهديد المخزون الجوفي للمياه.',
    image: defaultImg 
  },
  { 
    title: 'فاتورة الفساد في المشاريع المتعثرة', 
    category: 'سياسة', 
    date: '5 مايو 2024', 
    readTime: '25 دقيقة', 
    author: 'فريق العمل',
    excerpt: 'جرد شامل للمشاريع التي لم تكتمل رغم استلام الميزانيات المخصصة لها والجهات المسؤولة عن ذلك.',
    image: heroImg 
  },
];

const InvestigationPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4 mb-10">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
              <ChevronLeft size={14} />
              <span className="text-slate-600">تحقيق</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#09264d] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">التحقيقات الاستقصائية</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {/* Featured Investigation */}
            <Link to="/investigation/1" className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden h-[300px] md:h-[540px] group shadow-2xl block">
              <img src="images/port.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09264d] via-[#09264d]/40 to-transparent" />
              
              <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12 text-white">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                   <span className="bg-red-600 px-4 md:px-5 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black shadow-lg uppercase tracking-widest">تحقيق رئيسي</span>
                   <span className="bg-white/20 backdrop-blur-md px-4 md:px-5 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black shadow-lg uppercase tracking-widest">ملف خاص</span>
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight max-w-4xl drop-shadow-lg group-hover:text-blue-200 transition-colors">أين تذهب أموال النظافة؟.. كشف المستور في ملف الخدمات العامة</h2>
                <p className="hidden md:block text-gray-200 text-lg mb-8 max-w-3xl leading-relaxed font-bold opacity-90">تحقيق ميداني يكشف عن تجاوزات في عقود النظافة والنقل، وتقصير رقابي خلف ملايين الدولارات دون تحسن في الخدمة.</p>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-8 text-[10px] md:text-xs font-black text-gray-300 border-t border-white/10 pt-6 md:pt-8">
                   <div className="flex items-center gap-2 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/10">
                      <User size={14} className="text-red-600" />
                      <span>بواسطة: فريق التحقيق</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Clock size={14} className="text-red-600" />
                      <span>28 دقيقة</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Eye size={14} className="text-red-600" />
                      <span>3.2K</span>
                   </div>
                </div>
              </div>

            </Link>

            {/* Investigations List */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                  <h2 className="text-2xl font-black text-slate-800">تحقيقات مميزة</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {investigations.map((inv, i) => (
                    <Link to={`/investigation/${i + 2}`} key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col block">
                       <div className="relative h-64 overflow-hidden">
                          <img src={inv.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                          <span className="absolute top-5 right-5 bg-red-600 text-white text-[9px] font-black py-2 px-5 rounded-xl shadow-lg uppercase tracking-widest">{inv.category}</span>
                       </div>
                       <div className="p-10 flex-1 flex flex-col">
                          <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors">{inv.title}</h3>
                          <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8 line-clamp-3 italic">"{inv.excerpt}"</p>
                          
                          <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                             <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-slate-400">بقلم: {inv.author}</span>
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                                   <span className="flex items-center gap-1"><Clock size={12} /> {inv.readTime}</span>
                                   <span className="flex items-center gap-1"><Search size={12} /> {inv.date}</span>
                                </div>
                             </div>
                             <span className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-[#09264d] group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                                <ChevronLeft size={20} />
                             </span>
                          </div>
                       </div>
                    </Link>
                  ))}
               </div>
            </section>

            <button className="w-full py-6 bg-white border border-gray-200 rounded-[2rem] text-[#09264d] font-black hover:bg-slate-50 hover:shadow-xl transition-all text-sm shadow-sm">تصفح كافة التحقيقات</button>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
            {/* Category Box */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                 <Filter size={18} className="text-red-600" />
                 تصنيفات الملفات
               </h3>
               <div className="space-y-2">
                 {categories.map((cat, i) => (
                   <button key={i} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${cat.active ? 'bg-[#09264d] text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <span className="text-sm">{cat.name}</span>
                     {cat.active && <ChevronLeft size={16} />}
                   </button>
                 ))}
               </div>
            </div>

            {/* Important Alert Box */}
            <div className="bg-red-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-red-600/20">
               <div className="relative z-10">
                  <ShieldAlert size={40} className="mb-6 opacity-50" />
                  <h3 className="text-xl font-black mb-4">أرسل لنا بلاغاً</h3>
                  <p className="text-red-100 text-xs font-bold leading-relaxed mb-8 opacity-80">إذا كان لديك وثائق أو معلومات حول ملف فساد، يمكنك مراسلتنا بسرية تامة عبر القنوات المشفرة.</p>
                  <button className="w-full bg-white text-red-600 font-black py-4 rounded-xl text-sm hover:bg-red-50 transition-all">تواصل مع وحدة التحقيق</button>
               </div>
               <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>

            {/* Popular Sidebar */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">الأكثر تفاعلاً</h3>
              <div className="space-y-8">
                {[1, 2, 3, 4].map((id) => (
                  <Link to={`/investigation/${id}`} key={id} className="group cursor-pointer block">
                    <div className="flex items-center gap-3 mb-2 text-[10px] font-black text-red-600">
                       <FileSearch size={14} />
                       <span>ملف فساد</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-800 leading-snug group-hover:text-red-600 transition-colors">تحقيق: شبكات تهريب الوقود.. من المستفيد؟</h4>
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold">
                       <span>14 مايو 2024</span>
                       <span className="flex items-center gap-1"><Eye size={12} /> 1.5K</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default InvestigationPage;
