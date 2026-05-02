import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  BarChart3, Bell, ChevronLeft, Clock, Eye, FileText, 
  Share2, MessageSquare, Filter, ChevronDown, CheckSquare, Calendar,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const StatisticsPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [featuredSurvey, setFeaturedSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('category', 'إحصائيات')
          .eq('status', 'منشور')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setFeaturedSurvey(data[0]);
          setSurveys(data.slice(1));
        }
      } catch (err) {
        console.error("Error fetching surveys:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] flex items-center justify-center font-cairo" dir="rtl">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4 mb-10">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
              <ChevronLeft size={14} />
              <span className="text-slate-600">استطلاعات</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#e00013] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">الاستطلاعات والآراء</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {/* Featured Survey Report */}
            {featuredSurvey && (
              <Link to={`/statistics/${featuredSurvey.id}`} className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden h-[300px] md:h-[540px] group shadow-2xl block">
                <img src={featuredSurvey.main_image || "images/hero.png"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09264d] via-[#09264d]/40 to-transparent" />
                
                <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12 text-white">
                  <span className="bg-[#e00013] px-4 md:px-5 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black mb-4 md:mb-6 inline-block shadow-lg uppercase tracking-widest">{featuredSurvey.category}</span>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight max-w-4xl drop-shadow-lg group-hover:text-red-400 transition-colors line-clamp-2">{featuredSurvey.title}</h2>
                  <p className="hidden md:block text-gray-200 text-lg mb-8 max-w-3xl leading-relaxed font-bold opacity-90 line-clamp-2">
                    {featuredSurvey.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 md:gap-8 text-[10px] md:text-xs font-black text-gray-300 border-t border-white/10 pt-6 md:pt-8">
                     <div className="flex items-center gap-2 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/10">
                        <CheckSquare size={14} className="text-red-600" />
                        <span>المشاركين: {featuredSurvey.views_count || 0}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-red-600" />
                        <span>{new Date(featuredSurvey.created_at).toLocaleDateString('ar-YE')}</span>
                     </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Surveys List */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                  <h2 className="text-2xl font-black text-slate-800">تقارير الاستطلاعات</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {surveys.length > 0 ? surveys.map((survey) => (
                    <Link to={`/statistics/${survey.id}`} key={survey.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col block">
                       <div className="relative h-64 overflow-hidden">
                          <img src={survey.main_image || "images/image.jpg"} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                          <span className="absolute top-5 right-5 bg-[#09264d] text-white text-[9px] font-black py-2 px-5 rounded-xl shadow-lg uppercase tracking-widest">{survey.category}</span>
                       </div>
                       <div className="p-10 flex-1 flex flex-col">
                          <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{survey.title}</h3>
                          <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8 line-clamp-3 italic">
                            "{survey.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}..."
                          </p>
                          
                          <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                             <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-red-600">المشاركين: {survey.views_count || 0}</span>
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold mt-1">
                                   <span className="flex items-center gap-1"><Clock size={12} /> {new Date(survey.created_at).toLocaleDateString('ar-YE')}</span>
                                </div>
                             </div>
                             <span className="flex items-center gap-1 text-[11px] font-black text-[#09264d] group-hover:text-red-600 transition-colors">
                                عرض التقرير <ChevronLeft size={16} />
                             </span>
                          </div>
                       </div>
                    </Link>
                  )) : (
                    <div className="col-span-2 py-20 text-center text-slate-400 font-bold">لا توجد استطلاعات حالياً</div>
                  )}
               </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
            {/* Participation Box */}
            <div className="bg-[#09264d] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <BarChart3 className="text-red-600" size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-4">شارك برأيك</h3>
                  <p className="text-blue-100 text-xs font-bold leading-relaxed mb-8 opacity-80">رأيك يهمنا ويساهم في تسليط الضوء على القضايا التي تمس حياتك اليومية. شارك في استطلاعاتنا القادمة.</p>
                  <button className="w-full bg-[#e00013] text-white font-black py-4 rounded-xl text-sm hover:bg-red-700 transition-all shadow-lg">انضم للمشاركين</button>
               </div>
               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
