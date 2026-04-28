import React from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Tag
} from 'lucide-react';

const TagsManagement = () => {
  const data = [
    { id: 1, name: 'حضرموت', count: '1,240' },
    { id: 2, name: 'اليمن', count: '890' },
    { id: 3, name: 'المكلا', count: '560' },
    { id: 4, name: 'أخبار العاجل', count: '320' },
    { id: 5, name: 'تقارير خاصة', count: '210' },
    { id: 6, name: 'اقتصاد يمني', count: '180' },
    { id: 7, name: 'ثقافة حضرمية', count: '150' },
    { id: 8, name: 'مشاريع تنموية', count: '120' },
  ];

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
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-blue-600/30 transition-all cursor-default">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Tag size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-700">#{item.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold">{item.count} مقال</p>
            </div>
            <button className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsManagement;
