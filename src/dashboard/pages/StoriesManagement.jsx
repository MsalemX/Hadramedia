import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Clock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const StoriesManagement = () => {
  const storiesData = [
    { id: 1, title: 'صياد الثمانين عاماً الذي لا يزال يحلم بالبحر', category: 'إنسانية', readTime: '7 دقيقة', status: 'منشور', date: '20 مايو 2024', views: '24,560', img: '/images/image.jpg' },
    { id: 2, title: 'أطفال يحلمون بمستقبل أفضل رغم قسوة الظروف', category: 'أطفال', readTime: '5 دقيقة', status: 'منشور', date: '18 مايو 2024', views: '18,320', img: '/images/image.jpg' },
    { id: 3, title: 'من ربة منزل إلى صاحبة مشروع', category: 'ملهمة', readTime: '6 دقيقة', status: 'منشور', date: '16 مايو 2024', views: '16,780', img: '/images/image.jpg' },
    { id: 4, title: 'مبادرة شبابية ترسم الابتسامة على وجوه المحتاجين', category: 'مجتمع', readTime: '8 دقيقة', status: 'منشور', date: '15 مايو 2024', views: '12,450', img: '/images/image.jpg' },
    { id: 5, title: 'رحلة تحدي .. قصة أمل بعد المرض', category: 'ملهمة', readTime: '9 دقيقة', status: 'مسودة', date: '14 مايو 2024', views: '-', img: '/images/image.jpg' },
    { id: 6, title: 'قرية صغيرة.. حكايات كبيرة', category: 'تراث', readTime: '6 دقيقة', status: 'منشور', date: '13 مايو 2024', views: '9,860', img: '/images/image.jpg' },
    { id: 7, title: 'جدي وحكايات الماضي الجميل', category: 'إنسانية', readTime: '5 دقيقة', status: 'مسودة', date: '12 مايو 2024', views: '-', img: '/images/image.jpg' },
    { id: 8, title: 'المعلم الذي غير حياة قرية بأكملها', category: 'ملهمة', readTime: '7 دقيقة', status: 'منشور', date: '10 مايو 2024', views: '8,450', img: '/images/image.jpg' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة القصص</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} القصص</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة قصة جديدة
        </button>
      </div>

      {/* Stats row for Stories */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { label: 'إجمالي القصص', value: '78', trend: '+16.7%', color: 'bg-red-50 text-red-600' },
          { label: 'منشورة', value: '62', trend: '+14.3%', color: 'bg-green-50 text-green-600' },
          { label: 'مسودة', value: '12', trend: '-8.3%', color: 'bg-orange-50 text-orange-600' },
          { label: 'إجمالي المشاهدات', value: '124,580', trend: '+22.1%', color: 'bg-purple-50 text-purple-600' },
          { label: 'متوسط مدة القراءة', value: '6:45', trend: 'دقيقة لكل قصة', color: 'bg-blue-50 text-blue-600' },
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
            placeholder="بحث عن قصة..." 
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
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">مدة القراءة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ النشر</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المشاهدات</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {storiesData.map((story) => (
                <tr key={story.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <img src={story.img} className="w-16 h-12 rounded-xl object-cover shadow-sm border-2 border-white" alt="" />
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{story.title}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black">{story.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                      <Clock size={14} className="text-slate-300" />
                      <span>{story.readTime}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      story.status === 'منشور' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {story.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{story.date}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-700">{story.views}</td>
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

export default StoriesManagement;
