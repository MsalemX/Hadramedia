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

  const fetchTags = async () => {
    try {
      setLoading(true);
      // Fetch news to extract tags if no dedicated tags table exists
      const { data: newsData, error } = await supabase
        .from('news')
        .select('tags');

      if (error) throw error;

      const tagCounts = {};
      newsData.forEach(item => {
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach(t => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
          });
        }
      });

      const formatted = Object.entries(tagCounts).map(([name, count], index) => ({
        id: index + 1,
        name,
        count
      })).sort((a, b) => b.count - a.count);

      setTags(formatted);
    } catch (err) {
      console.error("Error fetching tags:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = (name) => {
    if (window.confirm(`هل أنت متأكد من حذف الوسم #${name}؟ سيتم إزالته من جميع الأخبار المرتبطة.`)) {
      setTags(tags.filter(t => t.name !== name));
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
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
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
                <p className="text-[10px] text-slate-400 font-bold">{item.count} مقال</p>
              </div>
              <button 
                onClick={() => handleDelete(item.name)}
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
    </div>
  );
};

export default TagsManagement;
