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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    link_url: '',
    position: 'sidebar',
    status: 'نشط'
  });

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

  const uploadFile = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
    const filePath = `ads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const toggleStatus = async (ad) => {
    try {
      const newStatus = ad.status === 'نشط' ? 'متوقف' : 'نشط';
      const { error } = await supabase
        .from('ads')
        .update({ status: newStatus })
        .eq('id', ad.id);

      if (error) throw error;
      fetchAds();
    } catch (err) {
      alert('خطأ في تغيير الحالة');
    }
  };

  const handleEdit = (ad) => {
    setFormData({
      id: ad.id,
      title: ad.title,
      link_url: ad.link_url || '',
      position: ad.placement || ad.position || 'sidebar',
      status: ad.status || 'نشط'
    });
    setImageFile(null); // لا نغير الصورة إلا إذا اختار المستخدم صورة جديدة
    setIsModalOpen(true);
  };

  const handleAddAd = async (e) => {
    e.preventDefault();
    if (!formData.title || (!formData.id && !imageFile)) {
      alert('يرجى إدخال العنوان واختيار صورة الإعلان');
      return;
    }

    try {
      setSaving(true);
      let image_url = formData.id ? ads.find(a => a.id === formData.id)?.image : '';
      
      if (imageFile) {
        image_url = await uploadFile(imageFile);
      }

      const adData = {
        title: formData.title,
        link_url: formData.link_url,
        position: formData.position,
        placement: formData.position,
        status: formData.status,
        image: image_url,
        image_url: image_url
      };

      let error;
      if (formData.id) {
        const { error: updateError } = await supabase
          .from('ads')
          .update(adData)
          .eq('id', formData.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('ads')
          .insert([adData]);
        error = insertError;
      }

      if (error) throw error;
      
      setFormData({ title: '', link_url: '', position: 'sidebar', status: 'نشط' });
      setImageFile(null);
      setIsModalOpen(false);
      fetchAds();
    } catch (err) {
      alert(`خطأ في العملية: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      try {
        const { error } = await supabase.from('ads').delete().eq('id', id);
        if (error) throw error;
        fetchAds();
      } catch (err) {
        console.error("Delete error:", err);
        alert(`خطأ أثناء الحذف: ${err.message || 'فشل في العملية'}`);
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
        <button 
          onClick={() => {
             setFormData({ title: '', link_url: '', position: 'sidebar', status: 'نشط' });
             setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة إعلان جديد
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
                <img src={item.image || item.image_url || '/images/ad.png'} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => toggleStatus(item)}
                    className={`px-3 py-1 rounded-full text-[10px] font-black shadow-lg transition-all active:scale-95 ${
                      item.status === 'نشط' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.status === 'نشط' ? 'نشط (إيقاف)' : 'متوقف (تشغيل)'}
                  </button>
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
                    <p className="text-xs font-black text-slate-700">{item.placement || item.position}</p>
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
                  <button 
                    onClick={() => handleEdit(item)}
                    className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
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

      {/* Modal إضافة إعلان */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-[#09264d] mb-6 flex items-center gap-2">
              <Plus className="text-blue-600" size={24} /> {formData.id ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}
            </h3>
            <form onSubmit={handleAddAd} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">عنوان الإعلان</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="مثال: عرض رمضان..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">رابط الإعلان (اختياري)</label>
                  <input 
                    type="url" 
                    value={formData.link_url}
                    onChange={(e) => setFormData({...formData, link_url: e.target.value})}
                    placeholder="https://example.com" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">مكان الظهور</label>
                  <select 
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none"
                  >
                    <option value="sidebar">القائمة الجانبية (Sidebar)</option>
                    <option value="top">أعلى الصفحة (Header)</option>
                    <option value="content">داخل المحتوى (Content)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">الحالة</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none"
                  >
                    <option value="نشط">نشط</option>
                    <option value="متوقف">متوقف</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">صورة الإعلان</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required={!formData.id}
                  />
                  <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group-hover:border-blue-600/30 transition-all">
                    {imageFile ? (
                      <p className="text-blue-600 font-black text-sm">{imageFile.name}</p>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                          <Plus size={24} />
                        </div>
                        <p className="text-slate-400 font-bold text-sm text-center">اضغط لرفع صورة الإعلان</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  {saving ? 'جاري الحفظ...' : (formData.id ? 'تحديث الإعلان' : 'حفظ الإعلان')}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ title: '', link_url: '', position: 'sidebar', status: 'نشط' });
                  }}
                  className="px-8 bg-gray-50 hover:bg-gray-100 text-slate-500 font-black py-4 rounded-2xl transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsManagement;
