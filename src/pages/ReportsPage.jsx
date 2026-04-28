import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  PlayCircle, Image as ImageIcon, Map, FileText, Bell, ChevronLeft, 
  Clock, Eye, BarChart2, Video, MousePointer2, Building2, Users, Leaf, 
  Book, Settings, ChevronDown 
} from 'lucide-react';

// Image Assets
const heroImg = "images/hero.png";
const adImg = "images/ad.png";
const portImg = "images/port.png";
const defaultImg = "images/image.jpg";

const categories = [
  { name: 'الكل', active: true, icon: MousePointer2 },
  { name: 'سياسة', icon: Building2 },
  { name: 'اقتصاد', icon: BarChart2 },
  { name: 'مجتمع', icon: Users },
  { name: 'بيئة', icon: Leaf },
  { name: 'ثقافة', icon: Book },
];

const reports = [
  {
    title: 'الموانئ اليمنية.. شرايين الاقتصاد ومفاتيح المستقبل',
    excerpt: 'تقرير تفاعلي يستعرض واقع الموانئ اليمنية وأهميتها الاقتصادية والتحديات التي تواجهها وفرص التطوير.',
    category: 'اقتصاد',
    date: 'منذ يومين',
    views: '12.5K',
    image: portImg,
    type: 'تحقيق تفاعلي'
  },
  {
    title: 'تنمية حضرموت: مشاريع جديدة لتعزيز التنمية',
    excerpt: 'تواصل الجهات الحكومية تنفيذ مشاريع تنموية في مختلف القطاعات تهدف لتحسين الخدمات وتوفير فرص العمل.',
    category: 'محلية',
    date: 'منذ 3 أيام',
    views: '8.4K',
    image: heroImg,
    type: 'قصة مصورة'
  },
  {
    title: 'أزمة المياه في المحافظات الشرقية',
    excerpt: 'بحث ميداني حول تحديات شح المياه وتأثيرها على الزراعة والحياة اليومية للمواطنين في أرياف حضرموت.',
    category: 'بيئة',
    date: 'منذ أسبوع',
    views: '5.2K',
    image: defaultImg,
    type: 'بيانات'
  },
];

const ReportsPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4 mb-10">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
              <ChevronLeft size={14} />
              <span className="text-slate-600">تقارير كرس ميديا</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#e00013] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">تقارير كروس ميديا</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            {/* Category Filter */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">تصنيف التقارير</h3>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <button key={i} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${cat.active ? 'bg-[#09264d] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} />
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    {cat.active ? <ChevronDown size={16} /> : <ChevronLeft size={16} className="opacity-30" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#09264d] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Bell className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-2">اشترك في النشرة</h3>
                  <p className="text-blue-200 text-[10px] font-bold mb-6">احصل على أفضل التقارير التفاعلية أسبوعياً</p>
                  <button className="w-full bg-[#e00013] hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-lg text-sm">اشترك الآن</button>
               </div>
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            
            {/* Featured Report */}
            <Link to="/report/1" className="relative rounded-[2.5rem] overflow-hidden h-[540px] group shadow-2xl block">
              <img src={portImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09264d] via-[#09264d]/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white hover:scale-110 hover:bg-red-600 transition-all shadow-2xl group/play">
                    <PlayCircle size={48} fill="currentColor" className="text-white group-hover/play:text-white" />
                 </div>
              </div>

              <div className="absolute bottom-0 right-0 left-0 p-12 text-white">
                <span className="bg-[#e00013] px-4 py-2 rounded-lg text-[10px] font-black mb-6 inline-block shadow-lg uppercase tracking-widest">تقرير تفاعلي</span>
                <h2 className="text-4xl font-black mb-6 leading-tight max-w-3xl drop-shadow-lg group-hover:text-red-400 transition-colors">الموانئ اليمنية.. شرايين الاقتصاد ومفاتيح المستقبل المفقودة</h2>
                <p className="text-gray-300 text-base mb-8 max-w-2xl leading-relaxed font-bold opacity-90">تحقيق معمق يستعرض واقع الموانئ وأهميتها الاقتصادية في ظل الظروف الراهنة وفرص التطوير والتحول.</p>
                
                <div className="flex items-center gap-8 text-xs font-black text-gray-400 border-t border-white/10 pt-8">
                   <div className="flex items-center gap-2">
                      <Map size={16} className="text-red-600" />
                      <span>خرائط تفاعلية</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <ImageIcon size={16} className="text-red-600" />
                      <span>معرض صور</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <BarChart2 size={16} className="text-red-600" />
                      <span>بيانات وتحليل</span>
                   </div>
                </div>
              </div>
            </Link>

            {/* Reports Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reports.map((report, i) => (
                  <Link to={`/report/${i + 2}`} key={i} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group block">
                     <div className="relative h-56 overflow-hidden">
                        <img src={report.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                        <span className="absolute top-4 right-4 bg-[#09264d] text-white text-[9px] font-black py-1.5 px-4 rounded-lg shadow-lg uppercase tracking-widest">{report.category}</span>
                     </div>
                     <div className="p-8">
                        <h3 className="text-lg font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors">{report.title}</h3>
                        <p className="text-slate-500 text-xs font-bold leading-relaxed mb-8 line-clamp-2">{report.excerpt}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                           <div className="flex items-center gap-1.5 text-[10px] font-black text-[#09264d]">
                              <Video size={14} className="text-red-600" />
                              <span>{report.type}</span>
                           </div>
                           <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                              <Clock size={12} />
                              <span>{report.date}</span>
                           </div>
                        </div>
                     </div>
                  </Link>
                ))}
            </section>

            {/* Load More */}
            <button className="w-full py-5 bg-white border border-gray-100 rounded-3xl text-slate-600 font-black hover:bg-slate-50 hover:shadow-md transition-all text-sm shadow-sm">عرض المزيد من التقارير</button>

          </main>

        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
