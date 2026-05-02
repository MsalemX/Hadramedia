import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Send
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 8;

  const fetchNews = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('news')
        .select('*', { count: 'exact' });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      setNews(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, statusFilter, categoryFilter]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      fetchNews();
    }
  };

  const handlePublish = async (id) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ status: 'منشور' })
        .eq('id', id);

      if (error) throw error;
      
      setNews(news.map(item => 
        item.id === id ? { ...item, status: 'منشور' } : item
      ));
    } catch (err) {
      alert('خطأ أثناء النشر');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
      try {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        setNews(news.filter(n => n.id !== id));
        setTotalCount(prev => prev - 1);
      } catch (err) {
        alert('خطأ أثناء الحذف');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الأخبار / الأحداث</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الأخبار</p>
        </div>
        <NavLink 
          to="/dashboard/content/add?type=news"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة خبر جديد
        </NavLink>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="بحث عن خبر (اضغط Enter)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5"
        >
          <option value="all">كل الحالات</option>
          <option value="مسودة">مسودة</option>
          <option value="منشور">منشور</option>
          <option value="مؤرشف">مؤرشف</option>
        </select>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5"
        >
          <option value="all">كل التصنيفات</option>
          <option value="أخبار">أخبار</option>
          <option value="تحقيقات">تحقيقات</option>
          <option value="تقارير">تقارير</option>
          <option value="قصص">قصص</option>
          <option value="دراسات">دراسات</option>
          <option value="مقالات">مقالات</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : news.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الصورة</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ النشر</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <img src={item.main_image || '/images/image.jpg'} className="w-16 h-12 rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{item.title}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${item.status === 'منشور' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">
                      {new Date(item.created_at).toLocaleDateString('ar-YE')}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        {item.status === 'مؤرشف' && (
                           <button 
                             onClick={() => handlePublish(item.id)}
                             className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all flex items-center gap-1 text-[10px] font-black"
                             title="نشر الآن"
                           >
                             <Send size={14} className="rotate-180" />
                             نشر
                           </button>
                        )}
                        <NavLink 
                          to={`/dashboard/content/edit/${item.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </NavLink>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <AlertCircle className="w-12 h-12 text-slate-300" />
            <p className="text-slate-400 font-bold">لا توجد نتائج مطابقة</p>
          </div>
        )}

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400">عدد النتائج الكلي: {totalCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
            <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              {page}
            </span>
            <button 
              disabled={page * pageSize >= totalCount}
              onClick={() => setPage(p => p + 1)}
              className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;
