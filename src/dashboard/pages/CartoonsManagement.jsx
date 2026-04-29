import React from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Download,
  Eye
} from 'lucide-react';

const CartoonsManagement = () => {
  const data = [
    { id: 1, title: 'الواقع الاقتصادي والمعيشي', artist: 'رشاد السامعي', date: '20 مايو 2024', views: '2,450', img: '/images/image.jpg' },
    { id: 2, title: 'أزمة الكهرباء وصيف حضرموت', artist: 'فهد باسالم', date: '18 مايو 2024', views: '1,890', img: '/images/image.jpg' },
    { id: 3, title: 'التعليم في زمن التكنولوجيا', artist: 'سالم بن علي', date: '16 مايو 2024', views: '1,320', img: '/images/image.jpg' },
    { id: 4, title: 'التنمية والبناء', artist: 'رشاد السامعي', date: '14 مايو 2024', views: '3,100', img: '/images/image.jpg' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الكاريكاتير</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الكاريكاتير</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة كاريكاتير جديد
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="بحث عن كاريكاتير..."
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500">
            <div className="relative aspect-square overflow-hidden">
              <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="p-3 bg-white rounded-xl text-slate-800 hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={20} /></button>
                <button className="p-3 bg-white rounded-xl text-slate-800 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={20} /></button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-black text-slate-800 text-sm mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-slate-400 text-[10px] font-bold mb-4">بواسطة: {item.artist}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                  <Eye size={14} className="text-blue-500" />
                  <span>{item.views}</span>
                </div>
                <span className="text-[10px] text-slate-300 font-bold">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartoonsManagement;
