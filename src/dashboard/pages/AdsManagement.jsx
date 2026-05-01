import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  ExternalLink,
  Edit3, 
  Trash2, 
  Calendar,
  MousePointer2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdsManagement = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (err) {
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      try {
        const { error } = await supabase.from('ads').delete().eq('id', id);
        if (error) throw error;
        setAds(ads.filter(a => a.id !== id));
      } catch (err) {
        alert('خطأ أثناء الحذف');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الإعلانات والمساحات</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الإعلانات</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة مساحة إعلانية
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ads.map((item) => (
            <div key={item.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group">
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img src={item.image_url || '/images/ad.png'} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                    item.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {item.status === 'active' ? 'نشط' : 'متوقف'}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-sm font-black text-slate-800 mb-2">{item.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold mb-6 flex items-center gap-2">
                  <Calendar size={14} className="text-blue-600" />
                  تاريخ الانتهاء: {item.end_date ? new Date(item.end_date).toLocaleDateString('ar-YE') : 'غير محدد'}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">الموضع</p>
                    <p className="text-xs font-black text-slate-700">{item.position}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">النقرات</p>
                    <div className="flex items-center gap-2">
                      <MousePointer2 size={12} className="text-blue-600" />
                      <p className="text-xs font-black text-slate-700">{item.clicks_count || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Edit3 size={16} /> تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-4 bg-white rounded-[40px] border border-gray-100 shadow-sm">
          <AlertCircle className="w-12 h-12 text-slate-300" />
          <p className="text-slate-400 font-bold">لا توجد إعلانات حالياً</p>
        </div>
      )}
    </div>
  );
};

export default AdsManagement;
