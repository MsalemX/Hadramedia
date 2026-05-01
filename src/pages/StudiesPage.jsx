import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  FileText, Bell, Clock, User, Send, Tag, ChevronLeft, 
  Download, Eye, BookOpen, Filter, Search, ShieldCheck,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const StudiesPage = () => {
  const [studies, setStudies] = useState([]);
  const [featuredStudy, setFeaturedStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('category', 'دراسات')
          .eq('status', 'منشور')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setFeaturedStudy(data[0]);
          setStudies(data.slice(1));
        } else {
          setFeaturedStudy(null);
          setStudies([]);
        }
      } catch (err) {
        console.error("Error fetching studies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
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
          
          <main className="lg:col-span-9 space-y-12 order-1 lg:order-2">
            
            {featuredStudy && (
              <Link to={`/study/${featuredStudy.id}`} className="bg-[#09264d] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row group border border-white/5 block">
                <div className="md:w-2/5 relative overflow-hidden bg-white/5 p-12 flex items-center justify-center">
                   <div className="relative group-hover:scale-105 transition-transform duration-700 shadow-2xl shadow-black/50">
                      <img src={featuredStudy.main_image || "images/port.png"} className="w-64 h-80 object-cover rounded-lg border-l-8 border-red-600 shadow-2xl" alt="Study Cover" />
                   </div>
                </div>
                <div className="md:w-3/5 p-12 lg:p-16 flex flex-col justify-center text-white">
                   <span className="bg-red-600 px-4 py-1.5 rounded-lg text-[9px] font-black mb-6 inline-block uppercase tracking-widest self-start shadow-lg">إصدار حديث</span>
                   <h2 className="text-3xl lg:text-4xl font-black mb-8 leading-tight group-hover:text-red-400 transition-colors line-clamp-2">{featuredStudy.title}</h2>
                   <p className="text-blue-100 text-lg font-bold leading-relaxed mb-10 opacity-80 line-clamp-2">
                    {featuredStudy.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                   </p>
                   
                   <div className="flex flex-wrap items-center gap-8 text-xs font-black text-blue-300 border-t border-white/10 pt-10">
                      <div className="flex items-center gap-2">
                         <User size={16} className="text-red-600" />
                         <span>بواسطة: مركز الدراسات</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <FileText size={16} className="text-red-600" />
                         <span>{new Date(featuredStudy.created_at).toLocaleDateString('ar-YE')}</span>
                      </div>
                   </div>

                   <div className="mt-12 flex gap-4">
                      <span className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3 text-sm">
                         <Download size={20} /> عرض الدراسة التفصيلية
                      </span>
                   </div>
                </div>
              </Link>
            )}

            <section className="space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                  <h2 className="text-2xl font-black text-slate-800">أحدث الأبحاث والدراسات</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {studies.map((study) => (
                    <Link to={`/study/${study.id}`} key={study.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col p-6 block">
                       <div className="relative h-64 overflow-hidden rounded-[2rem] shadow-inner bg-slate-50 mb-8 border border-gray-50">
                          <img src={study.main_image || "images/image.jpg"} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       </div>
                       <div className="px-2 flex-1 flex flex-col">
                          <span className="text-[9px] font-black text-red-600 mb-3 uppercase tracking-widest">{study.category}</span>
                          <h3 className="text-lg font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors h-14 overflow-hidden">{study.title}</h3>
                          
                          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                             <div className="flex flex-col gap-1 text-[9px] font-black text-slate-400">
                                <div className="flex items-center gap-3">
                                   <span className="flex items-center gap-1"><Clock size={12} /> {new Date(study.created_at).toLocaleDateString('ar-YE')}</span>
                                   <span className="flex items-center gap-1 text-red-600"><Eye size={12} /> {study.views || 0}</span>
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
          </main>

          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <div className="bg-[#09264d] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Send className="text-red-600" size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-4">مركز الدراسات</h3>
                  <p className="text-blue-100 text-xs font-bold leading-relaxed mb-8 opacity-80">اشترك ليصلك تنبيه بكل دراسة أو بحث جديد يصدر عن المركز.</p>
                  <button className="w-full bg-red-600 text-white font-black py-4 rounded-xl text-sm hover:bg-red-700 transition-all shadow-lg">اشترك الآن</button>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StudiesPage;
