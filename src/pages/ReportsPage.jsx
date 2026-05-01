import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  PlayCircle, Image as ImageIcon, Map, FileText, Bell, ChevronLeft, 
  Clock, Eye, BarChart2, Video, MousePointer2, Building2, Users, Leaf, 
  Book, Settings, ChevronDown, Loader2 
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const categories = [
  { name: 'الكل', active: true, icon: MousePointer2 },
  { name: 'سياسة', icon: Building2 },
  { name: 'اقتصاد', icon: BarChart2 },
  { name: 'مجتمع', icon: Users },
  { name: 'بيئة', icon: Leaf },
  { name: 'ثقافة', icon: Book },
];

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('الكل');

  useEffect(() => {
    fetchReports();
  }, [activeCategory]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('news')
        .select('*')
        .eq('is_cross_media', true)
        .eq('status', 'منشور')
        .order('created_at', { ascending: false });

      if (activeCategory !== 'الكل') {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setReports(data || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const featuredReport = reports.length > 0 ? reports[0] : null;
  const otherReports = reports.length > 1 ? reports.slice(1) : [];

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
                  <button 
                    key={i} 
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${activeCategory === cat.name ? 'bg-[#09264d] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} />
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    {activeCategory === cat.name ? <ChevronDown size={16} /> : <ChevronLeft size={16} className="opacity-30" />}
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
            
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
              </div>
            ) : reports.length > 0 ? (
              <>
                {/* Featured Report */}
                {featuredReport && (
                  <Link to={`/cross-media/${featuredReport.id}`} className="relative rounded-[2.5rem] overflow-hidden h-[540px] group shadow-2xl block">
                    <img src={featuredReport.main_image || "images/port.png"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09264d] via-[#09264d]/20 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white hover:scale-110 hover:bg-red-600 transition-all shadow-2xl group/play">
                          <PlayCircle size={48} fill="currentColor" className="text-white group-hover/play:text-white" />
                       </div>
                    </div>

                    <div className="absolute bottom-0 right-0 left-0 p-12 text-white">
                      <span className="bg-[#e00013] px-4 py-2 rounded-lg text-[10px] font-black mb-6 inline-block shadow-lg uppercase tracking-widest">{featuredReport.category || 'تقرير تفاعلي'}</span>
                      <h2 className="text-4xl font-black mb-6 leading-tight max-w-3xl drop-shadow-lg group-hover:text-red-400 transition-colors">{featuredReport.title}</h2>
                      <div className="text-gray-300 text-base mb-8 max-w-2xl leading-relaxed font-bold opacity-90 line-clamp-2" dangerouslySetInnerHTML={{ __html: featuredReport.content.substring(0, 200) + '...' }} />
                      
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
                )}

                {/* Reports Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherReports.map((report) => (
                      <Link to={`/cross-media/${report.id}`} key={report.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group block">
                         <div className="relative h-56 overflow-hidden">
                            <img src={report.main_image || "images/image.jpg"} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                            <span className="absolute top-4 right-4 bg-[#09264d] text-white text-[9px] font-black py-1.5 px-4 rounded-lg shadow-lg uppercase tracking-widest">{report.category}</span>
                         </div>
                         <div className="p-8">
                            <h3 className="text-lg font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{report.title}</h3>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                               <div className="flex items-center gap-1.5 text-[10px] font-black text-[#09264d]">
                                  <Video size={14} className="text-red-600" />
                                  <span>تقرير تفاعلي</span>
                               </div>
                               <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                                  <Clock size={12} />
                                  <span>{new Date(report.created_at).toLocaleDateString('ar-YE')}</span>
                               </div>
                            </div>
                         </div>
                      </Link>
                    ))}
                </section>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <h2 className="text-2xl font-black text-slate-400">لا توجد تقارير متاحة حالياً</h2>
              </div>
            )}

            {reports.length > 9 && (
              <button className="w-full py-5 bg-white border border-gray-100 rounded-3xl text-slate-600 font-black hover:bg-slate-50 hover:shadow-md transition-all text-sm shadow-sm">عرض المزيد من التقارير</button>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
