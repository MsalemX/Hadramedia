import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  FileText,
  ChevronRight,
  ChevronLeft,
  Download
} from 'lucide-react';

const StudiesManagement = () => {
  const studiesData = [
    { id: 1, title: 'مستقبل الاقتصاد اليمني في ظل التحديات الراهنة', author: 'محمد باوزير', category: 'اقتصاد', status: 'منشور', date: '20 مايو 2024', views: '5,420', img: '/images/image.jpg' },
    { id: 2, title: 'تطوير المناهج التعليمية في اليمن.. الواقع والمأمول', author: 'هدى باسالم', category: 'تعليم', status: 'مسودة', date: '18 مايو 2024', views: '3,210', img: '/images/image.jpg' },
    { id: 3, title: 'تقييم شامل للقطاع الصحي في اليمن بعد 2015', author: 'أحمد الكثيري', category: 'صحة', status: 'معلق', date: '16 مايو 2024', views: '2,890', img: '/images/image.jpg' },
    { id: 4, title: 'تحليل السياسات الخارجية اليمنية في العقد الأخير', author: 'سالم بن حريز', category: 'سياسة', status: 'منشور', date: '15 مايو 2024', views: '4,150', img: '/images/image.jpg' },
    { id: 5, title: 'التحول الرقمي في المؤسسات الحكومية اليمنية', author: 'مريم باطرفي', category: 'تقنية', status: 'منشور', date: '14 مايو 2024', views: '6,780', img: '/images/image.jpg' },
    { id: 6, title: 'تأثير التغيرات المناخية على الموارد المائية في اليمن', author: 'علي باحداد', category: 'بيئة', status: 'منشور', date: '13 مايو 2024', views: '2,350', img: '/images/image.jpg' },
    { id: 7, title: 'دراسة حول الشباب اليمني وسوق العمل', author: 'نورة السقاف', category: 'اجتماع', status: 'منشور', date: '12 مايو 2024', views: '1,980', img: '/images/image.jpg' },
    { id: 8, title: 'واقع السياحة في حضرموت وآفاق التطوير', author: 'فهد بن طالب', category: 'سياحة', status: 'منشور', date: '10 مايو 2024', views: '1,250', img: '/images/image.jpg' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الدراسات</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الدراسات</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة دراسة جديدة
        </button>
      </div>

      {/* Stats row for Studies */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { label: 'إجمالي الدراسات', value: '156', trend: '+18.4%', color: 'bg-blue-50 text-blue-600' },
          { label: 'دراسات ملفات PDF', value: '85', trend: '+12.6%', color: 'bg-purple-50 text-purple-600' },
          { label: 'تم نشرها', value: '132', trend: '+15.3%', color: 'bg-green-50 text-green-600' },
          { label: 'مسودة', value: '14', trend: '-6.2%', color: 'bg-orange-50 text-orange-600' },
          { label: 'معلقة', value: '10', trend: '+3.1%', color: 'bg-red-50 text-red-600' },
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
            placeholder="بحث عن دراسة..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
        <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5">
          <option>كل الحالات</option>
        </select>
        <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 text-sm font-black text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5">
          <option>كل التصنيفات</option>
        </select>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الصورة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">كاتب الدراسة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">حالة النشر</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ النشر</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">عدد المشاهدات</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">ملف PDF</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {studiesData.map((study) => (
                <tr key={study.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <img src={study.img} className="w-16 h-12 rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{study.title}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${study.author}&background=random`} className="w-8 h-8 rounded-full" alt="" />
                      <span className="text-sm font-bold text-slate-600">{study.author}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black">{study.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      study.status === 'منشور' ? 'bg-green-50 text-green-600' : 
                      study.status === 'مسودة' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {study.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{study.date}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">{study.views}</td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><FileText size={20} /></button>
                  </td>
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

export default StudiesManagement;
