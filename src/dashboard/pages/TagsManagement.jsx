import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Tag,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const TagsManagement = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchTags = async () => {
    try {
      setLoading(true);
      // جلب الوسوم من جدول tags
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error("Error fetching tags:", error);
        setTags([]);
        return;
      }

      setTags(data || []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      setSaving(true);
      const cleanedTag = newTagName.replace('#', '').trim();
      const { error } = await supabase
        .from('tags')
        .insert([{ name: cleanedTag }]);

      if (error) throw error;
      
      setNewTagName('');
      setIsModalOpen(false);
      fetchTags();
    } catch (err) {
      alert(`خطأ في الإضافة: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`هل أنت متأكد من حذف الوسم #${name}؟`)) {
      try {
        const { error } = await supabase
          .from('tags')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        fetchTags();
      } catch (err) {
        alert(`خطأ في الحذف: ${err.message}`);
      }
    }
  };

  const filteredTags = tags.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الوسوم (Tags)</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الوسوم</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة وسم جديد
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث عن وسم..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : filteredTags.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {filteredTags.map((item) => (
            <div key={item.id} className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-blue-600/30 transition-all cursor-default">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Tag size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-700">#{item.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold">{item.count || 0} مقال</p>
              </div>
              <button 
                onClick={() => handleDelete(item.id, item.name)}
                className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-4 bg-white rounded-[40px] border border-gray-100 shadow-sm">
          <AlertCircle className="w-12 h-12 text-slate-300" />
          <p className="text-slate-400 font-bold">لا توجد وسوم حالياً</p>
        </div>
      )}

      {/* Modal إضافة وسم */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-[#09264d] mb-6 flex items-center gap-2">
              <Tag className="text-blue-600" size={24} /> إضافة وسم جديد
            </h3>
            <form onSubmit={handleAddTag} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">اسم الوسم (بدون #)</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="مثال: حضرموت، أخبار_اليمن..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  {saving ? 'جاري الحفظ...' : 'حفظ الوسم'}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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

export default TagsManagement;
