import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Newspaper, TrendingUp, Bell, ChevronLeft, Clock, User, 
  Share2, Quote, PenTool, MessageSquare, Filter, ChevronDown,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// Image Assets
const heroImg = "images/hero.png";
const defaultImg = "images/image.jpg";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('category', 'مقالات')
          .eq('status', 'منشور')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setFeaturedArticle(data[0]);
          setArticles(data.slice(1));
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
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
            {featuredArticle && (
              <Link to={`/post/${featuredArticle.id}`} className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl flex flex-col md:flex-row min-h-[480px] group block">
                <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-8">
                      <Quote size={40} className="text-red-600 opacity-20" />
                      <span className="bg-slate-100 text-[#09264d] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">رأي وتحليل</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-black text-[#09264d] mb-8 leading-tight group-hover:text-red-600 transition-colors line-clamp-3">{featuredArticle.title}</h2>
                    <p className="text-slate-500 text-lg font-bold leading-relaxed mb-10 italic line-clamp-3">
                      "{featuredArticle.content?.replace(/<[^>]*>?/gm, '').substring(0, 200)}..."
                    </p>
                    
                    <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border-2 border-red-600 overflow-hidden">
                          <User size={32} className="text-slate-300 mt-2" />
                      </div>
                      <div>
                          <h4 className="font-black text-[#09264d]">كاتب حضرميديا</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">محلل استراتيجي</p>
                      </div>
                    </div>
                </div>
                <div className="md:w-1/2 relative overflow-hidden">
                    <img src={featuredArticle.main_image || heroImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Author" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden md:block" />
                </div>
              </Link>
            )}

            {/* Articles List */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-1.5 h-6 bg-[#09264d] rounded-full" />
                  <h2 className="text-2xl font-black text-slate-800">أحدث المقالات</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {articles.length > 0 ? articles.map((art, i) => (
                    <Link to={`/post/${art.id}`} key={art.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col block">
                       <div className="relative h-64 overflow-hidden">
                          <img src={art.main_image || defaultImg} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                          <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#09264d] text-[9px] font-black py-2 px-5 rounded-xl shadow-lg">{art.category}</span>
                       </div>
                       <div className="p-10 flex-1 flex flex-col">
                          <h3 className="text-xl font-black text-slate-800 mb-6 leading-tight group-hover:text-red-600 transition-colors h-14 overflow-hidden">{art.title}</h3>
                          
                          <div className="flex items-center gap-3 mb-8">
                             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 overflow-hidden">
                                <User size={18} className="text-slate-300 mt-1" />
                             </div>
                             <span className="text-xs font-black text-slate-600">كاتب حضرميديا</span>
                          </div>

                          <p className="text-slate-500 text-sm font-bold leading-relaxed mb-10 line-clamp-2">
                            {art.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                          </p>
                          
                          <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                             <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold">
                                <span className="flex items-center gap-1"><Clock size={14} /> 5 دقائق قراءة</span>
                                <span>{new Date(art.created_at).toLocaleDateString('ar-YE')}</span>
                             </div>
                             <button className="text-[#09264d] hover:text-red-600 transition-colors" onClick={(e) => e.preventDefault()}>
                                <Share2 size={18} />
                             </button>
                          </div>
                       </div>
                    </Link>
                  )) : (
                    <div className="col-span-2 py-20 text-center text-slate-400 font-bold">لا توجد مقالات حالياً</div>
                  )}
               </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            
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
