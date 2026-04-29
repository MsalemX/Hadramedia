import {
  Newspaper,
  FileText,
  PlayCircle,
  Users,
  Calendar,
  ChevronDown
} from 'lucide-react';

const StatsManagement = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إحصائيات وتقارير الموقع</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الإحصائيات</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-100 px-6 py-3 rounded-2xl font-black text-sm text-slate-600 flex items-center gap-2 shadow-sm">
            <Calendar size={18} />
            آخر 30 يوم
            <ChevronDown size={14} />
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-blue-600/20">
            تصدير تقرير PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'الأخبار / الأحداث', value: '128', trend: '+3.2%', icon: Newspaper, color: 'text-blue-600 bg-blue-50' },
          { label: 'المقالات', value: '64', trend: '+1.1%', icon: FileText, color: 'text-purple-600 bg-purple-50' },
          { label: 'الكروس ميديا', value: '42', trend: '+5.0%', icon: PlayCircle, color: 'text-green-600 bg-green-50' },
          { label: 'المستخدمون', value: '812', trend: '+2.5%', icon: Users, color: 'text-orange-600 bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
            <p className={`text-[10px] font-black mt-2 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {stat.trend} مقارنة بالشهر السابق
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-black text-slate-800 mb-8">توزيع المحتوى حسب الفئة</h3>
          <div className="space-y-6">
            {[
              { label: 'أخبار', value: '48%', color: 'bg-blue-600' },
              { label: 'مقالات', value: '24%', color: 'bg-purple-600' },
              { label: 'كروس ميديا', value: '16%', color: 'bg-green-600' },
              { label: 'قصص', value: '12%', color: 'bg-orange-600' },
            ].map((source, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-600">{source.label}</span>
                  <span className="text-slate-800">{source.value}</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full ${source.color}`} style={{ width: source.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-black text-slate-800 mb-8">أعضاء نشطون ومساهمون</h3>
          <div className="space-y-6">
            {[
              { name: 'أحمد المدير', posts: 48 },
              { name: 'سلمى المحررة', posts: 32 },
              { name: 'فريق الكروس ميديا', posts: 21 },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-slate-800 font-black">{user.name.split(' ')[0].slice(0, 1)}</div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-400 font-bold">مساهمات: {user.posts}</p>
                  </div>
                </div>
                <div className="text-sm font-black text-slate-800">{user.posts}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsManagement;
