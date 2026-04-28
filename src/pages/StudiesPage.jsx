import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  FileText, Bell, Clock, User, Send, Tag, ChevronLeft, 
  Download, Eye, BookOpen, Filter, Search, ShieldCheck
} from 'lucide-react';

// Image Assets
const heroImg = "images/hero.png";
const portImg = "images/port.png";
const defaultImg = "images/image.jpg";

const studies = [
  {
    title: 'تأثير الموانئ البحرية على الاقتصاد المحلي في حضرموت',
    excerpt: 'دراسة تحليلية معمقة لأداء الموانئ البحرية ودورها في تعزيز التنمية الاقتصادية وخلق فرص العمل المستدامة.',
    category: 'دراسة اقتصادية',
    date: '20 مايو 2024',
    pages: '45 صفحة',
    author: 'د. عبدالله باطويل',
    image: portImg
  },
  {
    title: 'واقع التعليم الأساسي في المناطق الريفية.. تحديات وحلول',
    excerpt: 'تقييم شامل لجودة التعليم في المناطق النائية وتحديد المعوقات الأساسية التي تواجه الكادر التعليمي والطلاب.',
    category: 'دراسة اجتماعية',
    date: '18 مايو 2024',
    pages: '32 صفحة',
    author: 'أ. مريم الكثيري',
    image: defaultImg
  },
  {
    title: 'الطاقة المتجددة في اليمن.. الإمكانيات والفرص الضائعة',
    excerpt: 'دراسة فنية حول إمكانيات الطاقة الشمسية وطاقة الرياح في المحافظات الشرقية ودورها في حل أزمة الكهرباء.',
    category: 'طاقة وبيئة',
    date: '15 مايو 2024',
    pages: '28 صفحة',
    author: 'م. فوزي بن بريك',
    image: heroImg
  },
];

const StudiesPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4 mb-10">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
              <ChevronLeft size={14} />
              <span className="text-slate-600">الدراسات والأبحاث</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#09264d] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">مركز الدراسات</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {/* Featured Study Document */}
            <Link to="/study/1" className="bg-[#09264d] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row group border border-white/5 block">
               <div className="md:w-2/5 relative overflow-hidden bg-white/5 p-12 flex items-center justify-center">
                  <div className="relative group-hover:scale-105 transition-transform duration-700 shadow-2xl shadow-black/50">
                     <img src={portImg} className="w-64 h-80 object-cover rounded-lg border-l-8 border-red-600 shadow-2xl" alt="Study Cover" />
                     <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                  </div>
               </div>
               <div className="md:w-3/5 p-12 lg:p-16 flex flex-col justify-center text-white">
                  <span className="bg-red-600 px-4 py-1.5 rounded-lg text-[9px] font-black mb-6 inline-block uppercase tracking-widest self-start shadow-lg">إصدار حديث</span>
                  <h2 className="text-3xl lg:text-4xl font-black mb-8 leading-tight group-hover:text-red-400 transition-colors">التحديات الاقتصادية في اليمن وآفاق التعافي (2024)</h2>
                  <p className="text-blue-100 text-lg font-bold leading-relaxed mb-10 opacity-80">دراسة استراتيجية شاملة تحلل الواقع الاقتصادي الراهن وتضع خارطة طريق للحلول المستدامة والنمو المستقبلي.</p>
                  
                  <div className="flex flex-wrap items-center gap-8 text-xs font-black text-blue-300 border-t border-white/10 pt-10">
                     <div className="flex items-center gap-2">
                        <User size={16} className="text-red-600" />
                        <span>د. عبدالله بن حريز</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <FileText size={16} className="text-red-600" />
                        <span>68 صفحة (PDF)</span>
                     </div>
                  </div>

                  <div className="mt-12 flex gap-4">
                     <span className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3">
                        <Download size={20} /> تحميل الدراسة (PDF)
                     </span>
                     <button className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all border border-white/10" onClick={(e) => e.preventDefault()}>
                        <BookOpen size={24} />
                     </button>
                  </div>
               </div>
            </Link>

            {/* Studies List Grid */}
            <section className="space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                  <h2 className="text-2xl font-black text-slate-800">أحدث الأبحاث والدراسات</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {studies.map((study, i) => (
                    <Link to={`/study/${i + 2}`} key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col p-6 block">
                       <div className="relative h-64 overflow-hidden rounded-[2rem] shadow-inner bg-slate-50 mb-8 border border-gray-50">
                          <img src={study.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                             <button className="bg-white text-[#09264d] p-4 rounded-full shadow-2xl hover:bg-red-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500" onClick={(e) => e.preventDefault()}>
                                <Download size={24} />
                             </button>
                          </div>
                       </div>
                       <div className="px-2 flex-1 flex flex-col">
                          <span className="text-[9px] font-black text-red-600 mb-3 uppercase tracking-widest">{study.category}</span>
                          <h3 className="text-lg font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors h-14 overflow-hidden">{study.title}</h3>
                          <p className="text-slate-400 text-xs font-bold leading-relaxed mb-8 line-clamp-3 italic">"{study.excerpt}"</p>
                          
                          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                             <div className="flex flex-col gap-1 text-[9px] font-black text-slate-400">
                                <span>الباحث: {study.author}</span>
                                <div className="flex items-center gap-3">
                                   <span className="flex items-center gap-1"><Clock size={12} /> {study.date}</span>
                                   <span className="flex items-center gap-1 text-red-600"><FileText size={12} /> {study.pages}</span>
                                </div>
                             </div>
                             <span className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#09264d] group-hover:bg-red-600 group-hover:text-white transition-all">
                                <ChevronLeft size={18} />
                             </span>
                          </div>
                       </div>
                    </Link>
                  ))}
               </div>
            </section>

            <button className="w-full py-6 bg-white border border-gray-100 rounded-[2rem] text-[#09264d] font-black hover:bg-slate-50 hover:shadow-xl transition-all text-sm shadow-sm">تصفح كافة الدراسات في الأرشيف</button>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
            {/* Search Box */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                 <Search size={18} className="text-red-600" />
                 بحث في الدراسات
               </h3>
               <div className="relative">
                 <input type="text" placeholder="اسم الدراسة أو الباحث..." className="w-full bg-slate-50 border border-gray-100 rounded-xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-red-600/5 transition-all" />
               </div>
            </div>

            {/* Popular Sidebar */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">الأكثر تحميلاً</h3>
              <div className="space-y-8">
                {[1, 2, 3, 4].map((id) => (
                  <Link to={`/study/${id}`} key={id} className="group cursor-pointer block">
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-red-600">
                       <ShieldCheck size={14} />
                       <span>دراسة محكمة</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-800 leading-snug group-hover:text-red-600 transition-colors">مستقبل الطاقة المتجددة في المحافظات الشرقية</h4>
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold">
                       <span className="flex items-center gap-1"><Download size={12} /> 1.2K تحميل</span>
                       <span className="flex items-center gap-1"><Eye size={12} /> 3.5K</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#09264d] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Send className="text-red-600" size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-4">كن أول من يعلم</h3>
                  <p className="text-blue-100 text-xs font-bold leading-relaxed mb-8 opacity-80">اشترك ليصلك تنبيه بكل دراسة أو بحث جديد يصدر عن المركز.</p>
                  <button className="w-full bg-[#e00013] text-white font-black py-4 rounded-xl text-sm hover:bg-red-700 transition-all shadow-lg">اشترك الآن</button>
               </div>
               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default StudiesPage;
