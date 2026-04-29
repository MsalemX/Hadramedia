import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  Video,
  FileBarChart,
  Clock
} from 'lucide-react';

const CrossMediaManagement = () => {
  const mediaData = [
    { id: 1, title: 'رحلة النفط من الاستخراج إلى التصدير', type: 'فيديو تفاعلي', status: 'منشور', date: '20 مايو 2024', views: '24,560', clicks: '3,240', img: '/images/image.jpg' },
    { id: 2, title: 'خريطة تفاعلية: التوزيع السكاني في اليمن', type: 'خرائط تفاعلية', status: 'منشور', date: '19 مايو 2024', views: '18,230', clicks: '2,150', img: '/images/image.jpg' },
    { id: 3, title: 'إنفوجرافيك: مؤشرات الاقتصاد اليمني 2024', type: 'إنفوجرافيك', status: 'منشور', date: '18 مايو 2024', views: '15,890', clicks: '1,980', img: '/images/image.jpg' },
    { id: 4, title: 'تحديات المياه في حضرموت', type: 'فيديو تفاعلي', status: 'منشور', date: '17 مايو 2024', views: '12,450', clicks: '1,780', img: '/images/image.jpg' },
    { id: 5, title: 'تطورات الصراع في اليمن (2015 - 2024)', type: 'خرائط تفاعلية', status: 'منشور', date: '16 مايو 2024', views: '10,320', clicks: '1,240', img: '/images/image.jpg' },
    { id: 6, title: 'التعليم في اليمن بالأرقام', type: 'إنفوجرافيك', status: 'منشور', date: '15 مايو 2024', views: '8,760', clicks: '950', img: '/images/image.jpg' },
    { id: 7, title: 'ثروات البحر الأحمر', type: 'فيديو تفاعلي', status: 'مسودة', date: '14 مايو 2024', views: '-', clicks: '-', img: '/images/image.jpg' },
    { id: 8, title: 'مستقبل المدن الذكية في اليمن', type: 'فيديو تفاعلي', status: 'مسودة', date: '13 مايو 2024', views: '-', clicks: '-', img: '/images/image.jpg' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الكروس ميديا</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الكروس ميديا</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة كروس ميديا جديد
        </button>
      </div>

      {/* Stats row for CrossMedia */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { label: 'إجمالي الكروس ميديا', value: '87', trend: '+18.7%', color: 'bg-red-50 text-red-600' },
          { label: 'إجمالي المشاهدات', value: '125,430', trend: '+22.4%', color: 'bg-green-50 text-green-600' },
          { label: 'إجمالي النقرات', value: '18,620', trend: '+15.3%', color: 'bg-blue-50 text-blue-600' },
          { label: 'متوسط مدة التفاعل', value: '04:32', trend: 'دقيقة لكل محتوى', color: 'bg-purple-50 text-purple-600' },
          { label: 'مسودة', value: '9', trend: 'لم يتم النشر', color: 'bg-orange-50 text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 mb-2 uppercase">{stat.label}</p>
            <h3 className="text-xl font-black text-slate-800">{stat.value}</h3>
            <p className={`text-[10px] font-bold mt-1 ${stat.color.split(' ')[1]}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث عن محتوى..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
        <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5">
          <option>كل الحالات</option>
        </select>
        <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5">
          <option>كل الأنواع</option>
        </select>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المصغرة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">نوع المحتوى</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ النشر</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المشاهدات</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">النقرات</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mediaData.map((media) => (
                <tr key={media.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="relative w-16 h-12">
                      <img src={media.img} className="w-full h-full rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl group-hover:bg-black/0 transition-all">
                        <PlayCircle size={20} className="text-white drop-shadow-md" />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{media.title}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      media.type === 'فيديو تفاعلي' ? 'bg-blue-50 text-blue-600' : 
                      media.type === 'خرائط تفاعلية' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {media.type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      media.status === 'منشور' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {media.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{media.date}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">{media.views}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">{media.clicks}</td>
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

export default CrossMediaManagement;
