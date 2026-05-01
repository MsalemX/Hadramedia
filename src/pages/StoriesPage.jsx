import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  BookOpen, Bell, ChevronLeft, Clock, User, Share2, Eye, Star, Users, Leaf, 
  Home, Camera, Palette, Info, HelpCircle, Image as ImageIcon, ChevronDown,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [featuredStory, setFeaturedStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('category', 'قصص')
          .eq('status', 'منشور') // الفلترة هنا
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setFeaturedStory(data[0]);
          setStories(data.slice(1));
        } else {
          setFeaturedStory(null);
          setStories([]);
        }
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
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
              <span className="text-slate-600">قصص ميديا</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-red-600 rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">قصص ميديا</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">أكثر القصص تفاعلاً</h3>
              <div className="space-y-6">
                {stories.slice(0, 5).map((story, i) => (
                  <Link to={`/story/${story.id}`} key={story.id} className="flex gap-4 items-center group cursor-pointer">
                    <div className="text-2xl font-black text-slate-200 group-hover:text-red-600 transition-colors shrink-0">0{i + 1}</div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{story.title}</h4>
                      <span className="text-[9px] text-slate-400 font-bold mt-1 block">{new Date(story.created_at).toLocaleDateString('ar-YE')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            
            {/* Featured Story */}
            {featuredStory ? (
              <Link to={`/story/${featuredStory.id}`} className="relative rounded-[3rem] overflow-hidden h-[540px] group shadow-2xl block">
                <img src={featuredStory.main_image || "images/hero.png"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 right-0 left-0 p-12 text-white">
                  <span className="bg-red-600 px-5 py-2 rounded-xl text-[10px] font-black mb-6 inline-block shadow-lg uppercase tracking-widest">{featuredStory.category}</span>
                  <h2 className="text-5xl font-black mb-6 leading-tight max-w-3xl drop-shadow-lg group-hover:text-red-400 transition-colors line-clamp-2">{featuredStory.title}</h2>
                  <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed font-bold opacity-90 line-clamp-2">
                    {featuredStory.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center gap-10 text-xs font-black text-gray-400 border-t border-white/10 pt-8">
                     <div className="flex items-center gap-2">
                        <Clock size={18} className="text-red-600" />
                        <span>{new Date(featuredStory.created_at).toLocaleDateString('ar-YE')}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Eye size={18} className="text-red-600" />
                        <span>{featuredStory.views || 0} مشاهدة</span>
                     </div>
                  </div>
                </div>
              </Link>
            ) : (
               <div className="h-64 bg-white rounded-[3rem] flex items-center justify-center border-2 border-dashed border-gray-100">
                  <p className="text-slate-400 font-bold text-xl">لا توجد قصص منشورة حالياً</p>
               </div>
            )}

            {/* Stories Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {stories.map((story) => (
                 <Link to={`/story/${story.id}`} key={story.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                       <img src={story.main_image || "images/image.jpg"} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                       <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#09264d] text-[9px] font-black py-2 px-5 rounded-xl shadow-lg uppercase tracking-widest">{story.category}</span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                       <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{story.title}</h3>
                       <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8 line-clamp-3">
                        {story.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                       </p>
                       
                       <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                             <Clock size={14} />
                             <span>{new Date(story.created_at).toLocaleDateString('ar-YE')}</span>
                          </div>
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-[#09264d] group-hover:text-red-600 transition-colors uppercase tracking-widest">
                             اقرأ القصة <ChevronLeft size={14} />
                          </span>
                       </div>
                    </div>
                 </Link>
               ))}
            </section>

          </main>

        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
