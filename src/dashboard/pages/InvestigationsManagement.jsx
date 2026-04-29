import React from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  FileSearch,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const InvestigationsManagement = () => {
  const data = [
    { id: 1, title: 'كواليس أزمة الكهرباء في المناطق الساحلية', author: 'سالم أحمد', status: 'منشور', date: '20 مايو 2024', views: '5,420', img: '/images/image.jpg' },
    { id: 2, title: 'تحقيق: مسارات تهريب الآثار اليمنية للخارج', author: 'هدى محمد', status: 'منشور', date: '18 مايو 2024', views: '12,210', img: '/images/image.jpg' },
    { id: 3, title: 'واقع السجون في المحافظات المحررة', author: 'علي باوزير', status: 'مسودة', date: '16 مايو 2024', views: '-', img: '/images/image.jpg' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة التحقيقات</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} التحقيقات</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة تحقيق جديد
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="بحث عن تحقيق..."
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
        <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5">
          <option>كل الحالات</option>
        </select>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المصغرة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">عنوان التحقيق</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الكاتب</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ النشر</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المشاهدات</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <img src={item.img} className="w-16 h-12 rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{item.title}</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-500">{item.author}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${item.status === 'منشور' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{item.date}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">{item.views}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg transition-all"><MoreVertical size={16} /></button>
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

export default InvestigationsManagement;
