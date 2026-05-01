import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Plus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Download,
  Eye,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CartoonsManagement = () => {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCartoons = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('news')
        .select('*')
        .eq('category', 'كاريكاتير');

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setCartoons(data || []);
    } catch (err) {
      console.error("Error fetching cartoons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartoons();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchCartoons();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الكاريكاتير؟')) {
      try {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
        setCartoons(cartoons.filter(c => c.id !== id));
      } catch (err) {
        alert('خطأ أثناء الحذف');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الكاريكاتير</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الكاريكاتير</p>
        </div>
        <NavLink 
          to="/dashboard/content/add?type=cartoons"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة كاريكاتير جديد
        </NavLink>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="بحث عن كاريكاتير (اضغط Enter)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : cartoons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cartoons.map((item) => (
            <div key={item.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500">
              <div className="relative aspect-square overflow-hidden">
                <img src={item.main_image || '/images/image.jpg'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <NavLink 
                    to={`/dashboard/content/edit/${item.id}`}
                    className="p-3 bg-white rounded-xl text-slate-800 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Edit3 size={20} />
                  </NavLink>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-white rounded-xl text-slate-800 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-slate-800 text-sm mb-2 line-clamp-1">{item.title}</h3>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                    <Eye size={14} className="text-blue-500" />
                    <span>{item.views_count || 0}</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-bold">
                    {new Date(item.created_at).toLocaleDateString('ar-YE')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <AlertCircle className="w-12 h-12 text-slate-300" />
          <p className="text-slate-400 font-bold">لا توجد نتائج مطابقة</p>
        </div>
      )}
    </div>
  );
};

export default CartoonsManagement;
