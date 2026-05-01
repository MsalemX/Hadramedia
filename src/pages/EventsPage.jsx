import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Filter, Calendar, Bell, ChevronLeft, Clock, Eye, ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [popularEvents, setPopularEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('news')
          .select('*')
          .eq('category', 'أخبار') // Events are often tagged as news in the DB, or specifically 'أحداث'
          .order('created_at', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;

        if (data && data.length > 0) {
          setFeaturedEvent(data[0]);
          setEvents(data.slice(1));
          
          // Sort by views for popular events
          const popular = [...data].sort((a, b) => (b.views_count || 0) - (a.views_count || 0)).slice(0, 5);
          setPopularEvents(popular);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
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
          
          {/* SIDEBAR */}
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

                <button className="w-full bg-[#09264d] hover:bg-blue-900 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-blue-900/20 text-lg">بـحـث</button>
              </div>
            </div>

            {/* Popular Events */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">الأكثر قراءة</h3>
              <div className="space-y-6">
                {popularEvents.map((event, i) => (
                  <Link to={`/post/${event.id}`} key={event.id} className="flex gap-4 items-center group cursor-pointer">
                    <div className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 w-6">{i + 1}</div>
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-slate-800 leading-5 group-hover:text-blue-600 transition-colors line-clamp-2">{event.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 block">{new Date(event.created_at).toLocaleDateString('ar-YE')}</span>
                    </div>
                    <img src={event.main_image || 'images/image.jpg'} alt="" className="w-16 h-12 object-cover rounded-lg shadow-sm shrink-0" />
                  </Link>
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

          {/* MAIN CONTENT */}
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {/* Featured Hero */}
            {featuredEvent && (
              <Link to={`/post/${featuredEvent.id}`} className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden h-[300px] md:h-[480px] group shadow-2xl block">
                <img src={featuredEvent.main_image || 'images/hero.png'} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                
                <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12 text-white">
                  <span className="bg-blue-600 px-4 py-2 rounded-lg text-[10px] font-black mb-4 md:mb-6 inline-block shadow-lg">{featuredEvent.category}</span>
                  <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 leading-tight max-w-3xl drop-shadow-lg group-hover:text-blue-200 transition-colors line-clamp-2">{featuredEvent.title}</h2>
                  <p className="hidden md:block text-gray-300 text-base mb-8 max-w-2xl leading-relaxed font-bold opacity-90 line-clamp-2">
                    {featuredEvent.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs font-black text-gray-400 border-t border-white/10 pt-6 md:pt-8">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-blue-500" /> {new Date(featuredEvent.created_at).toLocaleDateString('ar-YE')}</span>
                    <span className="flex items-center gap-2"><Eye size={14} className="text-blue-500" /> {featuredEvent.views_count || 0} مشاهدة</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Latest Events List */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                <h2 className="text-2xl font-black text-slate-800">آخر الأحداث</h2>
              </div>
              
              <div className="space-y-6">
                {events.length > 0 ? events.map((event) => (
                  <Link to={`/post/${event.id}`} key={event.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 hover:shadow-md transition-all group cursor-pointer block">
                    <div className="flex-1 order-2 md:order-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-slate-100 text-[#09264d] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">{event.category}</span>
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">{event.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm font-bold leading-relaxed mb-6 line-clamp-2">
                        {event.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-6 text-[11px] font-black text-slate-400 border-t border-gray-50 pt-4">
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {new Date(event.created_at).toLocaleDateString('ar-YE')}</span>
                        <span className="flex items-center gap-1.5"><Eye size={14} className="text-blue-500" /> {event.views_count || 0} مشاهدة</span>
                      </div>
                    </div>
                    <div className="w-full md:w-56 h-40 shrink-0 order-1 md:order-2 overflow-hidden rounded-2xl shadow-inner">
                      <img src={event.main_image || 'images/image.jpg'} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  </Link>
                )) : (
                  <div className="py-20 text-center text-slate-400 font-bold">لا توجد أحداث حالياً</div>
                )}
              </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
};

export default EventsPage;

