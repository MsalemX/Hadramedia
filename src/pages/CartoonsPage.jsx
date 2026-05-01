import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutGrid, TrendingUp, Bell, ChevronLeft, Clock, User, 
  Share2, Calendar, Filter, ChevronDown, Download, Heart,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const CartoonsPage = () => {
  const [cartoons, setCartoons] = useState([]);
  const [featuredCartoon, setFeaturedCartoon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartoons = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('category', 'كاريكاتير')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setFeaturedCartoon(data[0]);
          setCartoons(data.slice(1));
        }
      } catch (err) {
        console.error("Error fetching cartoons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartoons();
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
              <span className="text-slate-600">كاريكاتير</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#e00013] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">كاريكاتير حضرميديا</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {/* Featured Caricature */}
            {featuredCartoon && (
              <Link to={`/cartoon/${featuredCartoon.id}`} className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl p-6 md:p-8 lg:p-12 block group/main">
                 <div className="relative rounded-[2rem] overflow-hidden bg-slate-50 border-8 border-slate-100 shadow-inner group">
                    <img src={featuredCartoon.main_image || "images/hero.png"} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" alt="Featured Caricature" />
                    <div className="absolute top-6 left-6 flex gap-3">
                       <button className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg text-[#09264d] hover:bg-red-600 hover:text-white transition-all">
                          <Download size={20} />
                       </button>
                       <button className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg text-[#09264d] hover:bg-red-600 hover:text-white transition-all">
                          <Share2 size={20} />
                       </button>
                    </div>
                 </div>
                  <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <span className="bg-red-600 px-4 py-1.5 rounded-lg text-[9px] font-black text-white mb-3 inline-block uppercase tracking-widest">كاريكاتير اليوم</span>
                      <h2 className="text-2xl md:text-3xl font-black text-[#09264d] leading-tight group-hover/main:text-red-600 transition-colors line-clamp-2">{featuredCartoon.title}</h2>
                      <p className="text-slate-500 font-bold text-xs md:text-sm mt-3">بريشة: فريق حضرميديا - {new Date(featuredCartoon.created_at).toLocaleDateString('ar-YE')}</p>
                    </div>

                    <div className="flex items-center gap-6">
                       <div className="flex flex-col items-center gap-1">
                          <span className="text-2xl font-black text-[#09264d]">{featuredCartoon.views_count || 0}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">مشاهدة</span>
                       </div>
                    </div>
                 </div>
              </Link>
            )}

            {/* Caricatures Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {cartoons.length > 0 ? cartoons.map((cartoon) => (
                 <Link to={`/cartoon/${cartoon.id}`} key={cartoon.id} className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group block">
                    <div className="relative rounded-[2rem] overflow-hidden bg-slate-50 border-4 border-slate-50 shadow-sm mb-6 aspect-[4/3]">
                       <img src={cartoon.main_image || "images/image.jpg"} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all" />
                       <span className="absolute top-4 right-4 bg-[#09264d]/90 backdrop-blur-md text-white text-[9px] font-black py-1.5 px-4 rounded-lg shadow-lg">{cartoon.category}</span>
                    </div>
                    <div className="px-4">
                       <h3 className="text-lg font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{cartoon.title}</h3>
                       <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                             <Calendar size={14} />
                             <span>{new Date(cartoon.created_at).toLocaleDateString('ar-YE')}</span>
                          </div>
                          <div className="flex items-center gap-4">
                             <button className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-red-600 transition-colors">
                                <Heart size={16} /> <span>{cartoon.views_count || 0}</span>
                             </button>
                          </div>
                       </div>
                    </div>
                 </Link>
               )) : (
                <div className="col-span-2 py-20 text-center text-slate-400 font-bold">لا توجد أعمال فنية حالياً</div>
               )}
            </section>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
            {/* Newsletter */}
            <div className="bg-[#09264d] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Bell className="text-red-600" size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-4">اشترك في معرضنا</h3>
                  <p className="text-blue-100 text-xs font-bold leading-relaxed mb-8 opacity-80">احصل على كاريكاتير اليوم فور صدوره مباشرة عبر بريدك الإلكتروني.</p>
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

export default CartoonsPage;

