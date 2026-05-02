import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  FileText,
  ChevronRight,
  ChevronLeft,
  Download,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const StudiesManagement = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 8;

  const fetchStudies = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('news')
        .select('*', { count: 'exact' })
        .eq('category', 'دراسات');

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      setStudies(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error fetching studies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, [page, statusFilter]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      fetchStudies();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الدراسة؟')) {
      try {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        setStudies(studies.filter(s => s.id !== id));
        setTotalCount(prev => prev - 1);
      } catch (err) {
        alert('خطأ أثناء الحذف');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الدراسات</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الدراسات</p>
        </div>
        <NavLink 
          to="/dashboard/content/add?type=studies"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة دراسة جديدة
        </NavLink>
      </div>

      {/* Stats row for Studies */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الدراسات', value: totalCount, color: 'bg-blue-50 text-blue-600' },
          { label: 'دراسات منشورة', value: studies.filter(s => s.status === 'منشور').length, color: 'bg-green-50 text-green-600' },
          { label: 'دراسات مؤرشفة', value: studies.filter(s => s.status === 'مؤرشف').length, color: 'bg-orange-50 text-orange-600' },
          { label: 'إجمالي المشاهدات', value: studies.reduce((acc, curr) => acc + (curr.views_count || 0), 0), color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 mb-2 uppercase">{stat.label}</p>
            <h3 className="text-xl font-black text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="بحث عن دراسة (اضغط Enter)..."
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
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : studies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الصورة</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {studies.map((study) => (
                  <tr key={study.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <img src={study.main_image || '/images/image.jpg'} className="w-16 h-12 rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{study.title}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${study.status === 'منشور' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                        {study.status === 'منشور' ? 'منشور' : 'مؤرشف'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <NavLink 
                          to={`/dashboard/content/edit/${study.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </NavLink>
                        <button 
                          onClick={() => handleDelete(study.id)}
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
            <p className="text-slate-400 font-bold">لا توجد دراسات مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudiesManagement;
