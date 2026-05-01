import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Loader2, Eye, Clock, ChevronLeft, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'منشور')
        .ilike('title', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex flex-col gap-4 mb-12">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
              <ChevronLeft size={14} />
              <span className="text-slate-600">نتائج البحث</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-red-600 rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">
                نتائج البحث عن: <span className="text-red-600">"{query}"</span>
              </h1>
           </div>
           <p className="text-slate-400 font-bold">تم العثور على {results.length} نتيجة</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
            <p className="text-slate-400 font-black">جاري البحث في الأرشيف...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((item) => (
              <Link 
                to={item.is_cross_media ? `/cross-media/${item.id}` : `/post/${item.id}`} 
                key={item.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.main_image || "images/image.jpg"} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-[#09264d] text-white text-[9px] font-black py-1.5 px-4 rounded-lg shadow-lg">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{new Date(item.created_at).toLocaleDateString('ar-YE')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={12} className="text-red-500" />
                        <span>{item.views || 0}</span>
                      </div>
                    </div>
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Search size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">عذراً، لم نجد أي نتائج</h2>
            <p className="text-slate-400 font-bold max-w-md mx-auto">تأكد من كتابة الكلمات بشكل صحيح أو حاول البحث بكلمات أخرى أكثر عمومية.</p>
            <Link to="/" className="inline-block mt-8 text-red-600 font-black hover:underline">العودة للرئيسية</Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchPage;
