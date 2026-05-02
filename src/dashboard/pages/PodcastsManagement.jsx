import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Headphones,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  X,
  Upload,
  Mic,
  Music
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PodcastsManagement = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'عام',
    duration: '',
    thumbnail_url: '',
    media_url: '',
    media_type: 'audio', // 'audio' or 'video'
    source_type: 'link'  // 'link' or 'upload'
  });

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPodcasts(data || []);
    } catch (err) {
      console.error("Error fetching podcasts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const handleFileUpload = async (file, type) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `podcasts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('content')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      alert('Error uploading file');
      console.error(error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      
      // If upload mode is selected, we should have already handled the upload or we do it here
      // For simplicity in this UI, we expect URLs but I'll add the file handlers below
      
      const { error } = await supabase
        .from('podcasts')
        .insert([{
          title: formData.title,
          description: formData.description,
          category: formData.category,
          duration: formData.duration,
          thumbnail_url: formData.thumbnail_url,
          media_url: formData.media_url,
          media_type: formData.media_type,
          source_type: formData.source_type
        }]);

      if (error) throw error;
      
      setIsModalOpen(false);
      setFormData({ 
        title: '', 
        description: '', 
        category: 'عام', 
        duration: '', 
        thumbnail_url: '', 
        media_url: '',
        media_type: 'audio',
        source_type: 'link'
      });
      fetchPodcasts();
    } catch (err) {
      alert('خطأ أثناء الحفظ: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const onFileSelect = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await handleFileUpload(file);
    if (url) {
      setFormData(prev => ({ ...prev, [field]: url }));
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الحلقة؟')) {
      try {
        const { error } = await supabase.from('podcasts').delete().eq('id', id);
        if (error) throw error;
        setPodcasts(podcasts.filter(p => p.id !== id));
      } catch (err) {
        alert('خطأ أثناء الحذف');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 font-cairo">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة البودكاست</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} البودكاست</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#09264d] hover:bg-blue-900 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة حلقة جديدة
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : podcasts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الغلاف</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المدة</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {podcasts.map((podcast) => (
                  <tr key={podcast.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <img src={podcast.thumbnail_url || 'https://via.placeholder.com/150'} className="w-16 h-12 rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{podcast.title}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-600">
                        {podcast.duration}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleDelete(podcast.id)}
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
            <Headphones className="w-12 h-12 text-slate-300" />
            <p className="text-slate-400 font-bold">لا توجد حلقات بودكاست حالياً</p>
          </div>
        )}
      </div>

      {/* Add Podcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Mic size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">إضافة حلقة بودكاست</h3>
                  <p className="text-xs font-bold text-slate-400">املأ البيانات أدناه لإضافة حلقة جديدة</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-400">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">العنوان</label>
                  <input 
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="عنوان الحلقة..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">النوع والمدد</label>
                  <div className="flex gap-2">
                    <select 
                      value={formData.media_type}
                      onChange={(e) => setFormData({...formData, media_type: e.target.value})}
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-sm font-bold focus:outline-none"
                    >
                      <option value="audio">صوت (Audio)</option>
                      <option value="video">فيديو (Video)</option>
                    </select>
                    <input 
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="00:00"
                      className="w-24 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 text-sm text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">مصدر المحتوى</label>
                <div className="flex gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, source_type: 'link'})}
                    className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${formData.source_type === 'link' ? 'bg-[#09264d] text-white shadow-md' : 'text-slate-400 hover:bg-white'}`}
                  >
                    رابط خارجي (YouTube/URL)
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, source_type: 'upload'})}
                    className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${formData.source_type === 'upload' ? 'bg-[#09264d] text-white shadow-md' : 'text-slate-400 hover:bg-white'}`}
                  >
                    رفع ملف محلي (Local)
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">رابط أو ملف الميديا</label>
                {formData.source_type === 'link' ? (
                  <input 
                    required
                    type="url"
                    value={formData.media_url}
                    onChange={(e) => setFormData({...formData, media_url: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
                  />
                ) : (
                  <div className="flex items-center gap-4">
                    <input 
                      type="text"
                      readOnly
                      value={formData.media_url}
                      placeholder="لم يتم اختيار ملف..."
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-400"
                    />
                    <label className="bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl font-black text-xs cursor-pointer hover:bg-blue-100 transition-all">
                      <input type="file" className="hidden" accept={formData.media_type === 'audio' ? 'audio/*' : 'video/*'} onChange={(e) => onFileSelect(e, 'media_url')} />
                      {uploading ? <Loader2 size={16} className="animate-spin" /> : 'اختر ملف'}
                    </label>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">صورة الغلاف</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="text"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                      placeholder="رابط الصورة..."
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold"
                    />
                    <label className="bg-slate-100 text-slate-600 p-4 rounded-2xl font-black text-xs cursor-pointer hover:bg-slate-200">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => onFileSelect(e, 'thumbnail_url')} />
                      <Upload size={18} />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">الوصف</label>
                  <input 
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="وصف مختصر..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold"
                  />
                </div>
              </div>

              <button 
                disabled={uploading}
                type="submit"
                className="w-full bg-[#09264d] hover:bg-blue-900 text-white py-5 rounded-2xl font-black shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {uploading ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
                إضافة الحلقة الآن
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastsManagement;
