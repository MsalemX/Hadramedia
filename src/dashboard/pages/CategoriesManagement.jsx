import React from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Grid,
  CheckCircle2
} from 'lucide-react';

const CategoriesManagement = () => {
  const data = [
    { id: 1, name: 'أخبار محلية', count: '456', status: 'نشط', color: 'bg-blue-600' },
    { id: 2, name: 'اقتصاد', count: '124', status: 'نشط', color: 'bg-green-600' },
    { id: 3, name: 'رياضة', count: '89', status: 'نشط', color: 'bg-orange-600' },
    { id: 4, name: 'ثقافة وفن', count: '67', status: 'غير نشط', color: 'bg-purple-600' },
    { id: 5, name: 'تكنولوجيا', count: '34', status: 'نشط', color: 'bg-cyan-600' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة التصنيفات</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} التصنيفات</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة تصنيف جديد
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث عن تصنيف..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">#</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">اسم التصنيف</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">عدد المقالات</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5 text-center text-slate-400 font-black">{item.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-black text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">{item.count}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      item.status === 'نشط' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagement;
