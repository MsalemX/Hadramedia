import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const NewsManagement = () => {
  const newsData = [
    { id: 1, title: 'بدء العمل في مشروع طريق ساحلي جديد يربط المكلا بالشحر', category: 'أخبار محلية', region: 'حضرموت', status: 'منشور', date: '20 مايو 2024', views: '2,450', img: '/images/image.jpg' },
    { id: 2, title: 'ارتفاع أسعار النفط عالمياً بعد توقعات بزيادة الطلب', category: 'اقتصاد', region: 'حضرموت', status: 'منشور', date: '20 مايو 2024', views: '1,890', img: '/images/image.jpg' },
    { id: 3, title: 'وزارة التعليم تعلن عن خطة تطوير شاملة للمناهج الدراسية', category: 'تعليم', region: 'حضرموت', status: 'منشور', date: '20 مايو 2024', views: '1,320', img: '/images/image.jpg' },
    { id: 4, title: 'فريق الهلال الحضرمي يفوز في المباراة النهائية للبطولة', category: 'رياضة', region: 'حضرموت', status: 'منشور', date: '19 مايو 2024', views: '3,210', img: '/images/image.jpg' },
    { id: 5, title: 'تقرير خاص: التحولات الاقتصادية في حضرموت 2024', category: 'تقارير', region: 'حضرموت', status: 'مسودة', date: '19 مايو 2024', views: '1,150', img: '/images/image.jpg' },
    { id: 6, title: 'افتتاح مستشفى بروم الجديد لخدمة أهالي المديرية', category: 'صحة', region: 'المهرة', status: 'منشور', date: '18 مايو 2024', views: '980', img: '/images/image.jpg' },
    { id: 7, title: 'مهرجان البلدة السياحي يجذب آلاف الزوار هذا العام', category: 'مجتمع', region: 'حضرموت', status: 'منشور', date: '18 مايو 2024', views: '1,780', img: '/images/image.jpg' },
    { id: 8, title: 'توقعات بأمطار غزيرة على سواحل حضرموت خلال الأيام القادمة', category: 'الطقس', region: 'حضرموت', status: 'مسودة', date: '17 مايو 2024', views: '650', img: '/images/image.jpg' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الأخبار / الأحداث</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الأخبار</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة خبر جديد
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث عن خبر..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
        <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5">
          <option>كل الحالات</option>
          <option>منشور</option>
          <option>مسودة</option>
        </select>
        <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5">
          <option>كل التصنيفات</option>
        </select>
        <button className="p-3 bg-gray-50 text-slate-500 rounded-2xl hover:bg-gray-100 transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الصورة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المحافظة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ النشر</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المشاهدات</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {newsData.map((news) => (
                <tr key={news.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <img src={news.img} className="w-16 h-12 rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{news.title}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      news.category === 'أخبار محلية' ? 'bg-blue-50 text-blue-600' :
                      news.category === 'اقتصاد' ? 'bg-green-50 text-green-600' :
                      news.category === 'تعليم' ? 'bg-purple-50 text-purple-600' :
                      news.category === 'رياضة' ? 'bg-orange-50 text-orange-600' :
                      news.category === 'صحة' ? 'bg-red-50 text-red-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {news.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-500">{news.region}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      news.status === 'منشور' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {news.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{news.date}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">{news.views}</td>
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
        
        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400">لكل صفحة</span>
            <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-black text-slate-600">
              <option>8</option>
              <option>16</option>
              <option>32</option>
            </select>
            <span className="text-sm font-bold text-slate-400">عرض 1 - 8 من 200 خبر</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600"><ChevronRight size={20} /></button>
            <button className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm shadow-lg shadow-blue-600/20">1</button>
            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 text-slate-600 font-black text-sm">2</button>
            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 text-slate-600 font-black text-sm">3</button>
            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 text-slate-600 font-black text-sm">4</button>
            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 text-slate-600 font-black text-sm">5</button>
            <span className="text-slate-300">...</span>
            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 text-slate-600 font-black text-sm">25</button>
            <button className="p-2 text-slate-400 hover:text-blue-600"><ChevronLeft size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;
