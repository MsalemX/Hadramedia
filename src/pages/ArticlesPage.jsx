import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Newspaper, TrendingUp, Bell, ChevronLeft, Clock, User, 
  Share2, Quote, PenTool, MessageSquare, Filter, ChevronDown
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
  { name: 'ثقافة وفنون' },
  { name: 'تقنية' },
];

const articles = [
  {
    title: 'الإدارة المحلية في حضرموت.. نحو نموذج تنموي فاعل',
    excerpt: 'تطوير أداء الإدارة المحلية وتفعيل دور السلطات المحلية يمثل ركيزة أساسية لتحقيق التنمية المستدامة وتحسين مستوى الخدمات.',
    category: 'تنمية',
    date: '20 مايو 2024',
    author: 'د. عبدالله بن حريز',
    image: heroImg
  },
  {
    title: 'التحول الرقمي في القطاع الحكومي.. ضرورة ملحة',
    excerpt: 'يشكل التحول الرقمي في الخدمات الحكومية خطوة مهمة نحو رفع الكفاءة والشفافية وتسهيل حياة المواطنين.',
    category: 'تقنية',
    date: '19 مايو 2024',
    author: 'م. فادي باحميش',
    image: defaultImg
  },
  {
    title: 'الهوية الحضرمية في زمن العولمة والتغيير',
    excerpt: 'في ظل التغيرات المتسارعة، تبرز أهمية الحفاظ على الهوية الثقافية وتعزيزها كعامل تماسك مجتمعي ومنطلقاً للمستقبل.',
    category: 'ثقافة',
    date: '17 مايو 2024',
    author: 'أ. فائزة الكثيري',
    image: portImg
  },
];

const ArticlesPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4 mb-10">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
              <ChevronLeft size={14} />
              <span className="text-slate-600">مقالات الرأي</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#09264d] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">أقلام حضرميديا</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {/* Featured Opinion Piece */}
            <Link to="/article/1" className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl flex flex-col md:flex-row min-h-[480px] group block">
               <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-8">
                     <Quote size={40} className="text-red-600 opacity-20" />
                     <span className="bg-slate-100 text-[#09264d] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">رأي وتحليل</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-[#09264d] mb-8 leading-tight group-hover:text-red-600 transition-colors">حضرموت.. فرصة استراتيجية نحو مستقبل مزدهر ومستدام</h2>
                  <p className="text-slate-500 text-lg font-bold leading-relaxed mb-10 italic">"تمتلك حضرموت مقومات طبيعية وبشرية واقتصادية تؤهلها لتكون مركزاً تنموياً رائداً إذا ما توفرت الرؤية والتخطيط السليم."</p>
                  
                  <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
                     <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border-2 border-red-600 overflow-hidden">
                        <User size={32} className="text-slate-300 mt-2" />
                     </div>
                     <div>
                        <h4 className="font-black text-[#09264d]">د. سالم باوزير</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">كاتب ومحلل استراتيجي</p>
                     </div>
                  </div>
               </div>
               <div className="md:w-1/2 relative overflow-hidden">
                  <img src={heroImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Author" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden md:block" />
               </div>
            </Link>

            {/* Articles List */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                  <h2 className="text-2xl font-black text-slate-800">أحدث المقالات</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {articles.map((art, i) => (
                    <Link to={`/article/${i + 2}`} key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col block">
                       <div className="relative h-64 overflow-hidden">
                          <img src={art.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                          <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#09264d] text-[9px] font-black py-2 px-5 rounded-xl shadow-lg">{art.category}</span>
                       </div>
                       <div className="p-10 flex-1 flex flex-col">
                          <h3 className="text-xl font-black text-slate-800 mb-6 leading-tight group-hover:text-red-600 transition-colors h-14 overflow-hidden">{art.title}</h3>
                          
                          <div className="flex items-center gap-3 mb-8">
                             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 overflow-hidden">
                                <User size={18} className="text-slate-300 mt-1" />
                             </div>
                             <span className="text-xs font-black text-slate-600">{art.author}</span>
                          </div>

                          <p className="text-slate-500 text-sm font-bold leading-relaxed mb-10 line-clamp-2">{art.excerpt}</p>
                          
                          <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                             <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold">
                                <span className="flex items-center gap-1"><Clock size={14} /> 6 دقائق قراءة</span>
                                <span>{art.date}</span>
                             </div>
                             <button className="text-[#09264d] hover:text-red-600 transition-colors" onClick={(e) => e.preventDefault()}>
                                <Share2 size={18} />
                             </button>
                          </div>
                       </div>
                    </Link>
                  ))}
               </div>
            </section>

            <button className="w-full py-6 bg-white border border-gray-200 rounded-[2rem] text-[#09264d] font-black hover:bg-slate-50 hover:shadow-xl transition-all text-sm shadow-sm">عرض المزيد من المقالات</button>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
            {/* Author Sidebar */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                 <PenTool size={18} className="text-red-600" />
                 كتابنا
               </h3>
               <div className="space-y-6">
                 {[1, 2, 3, 4].map((id) => (
                   <div key={id} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-slate-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:border-red-600 transition-all">
                         <User size={28} className="text-slate-300 mt-2" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-slate-800 group-hover:text-red-600">عبدالله بن حريز</h4>
                         <p className="text-[9px] text-slate-400 font-bold uppercase">12 مقال</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#09264d] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <MessageSquare className="text-red-600" size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-4">آراء تهمك</h3>
                  <p className="text-blue-100 text-xs font-bold leading-relaxed mb-8 opacity-80">اشترك ليصلك تحليل الخبراء وأهم مقالات الرأي يومياً على بريدك.</p>
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

export default ArticlesPage;
