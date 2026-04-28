import React from 'react';
import { 
  Eye, 
  Users, 
  FileText, 
  AlertCircle, 
  TrendingUp, 
  Calendar,
  ChevronLeft,
  Clock,
  ExternalLink,
  LayoutDashboard,
  MessageSquare,
  MessageCircle,
  Layout
} from 'lucide-react';

const StatCard = ({ label, value, trend, trendValue, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
      <Icon size={28} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-black mb-1">{label}</p>
      <h3 className="text-2xl font-black text-slate-800">{value}</h3>
      <div className="flex items-center gap-1 mt-1">
        <TrendingUp size={12} className={trend === 'up' ? 'text-green-500' : 'text-red-500'} />
        <span className={`text-[10px] font-black ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trendValue} من الشهر الماضي
        </span>
      </div>
    </div>
  </div>
);

const MainDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">لوحة التحكم الرئيسية</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} لوحة التحكم</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <Calendar size={18} className="text-slate-400" />
          <span className="text-sm font-black text-slate-700">20 مايو 2024</span>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-[#eef2ff] p-8 rounded-[40px] relative overflow-hidden flex items-center justify-between border border-blue-100/50">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-[#09264d] mb-2">مرحباً بك، أحمد 👋 المدير</h2>
          <p className="text-slate-500 font-bold">إليك ملخص أداء الموقع اليوم</p>
        </div>
        <div className="absolute left-10 -bottom-10 opacity-10">
          <LayoutDashboard size={200} className="text-[#09264d]" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="إجمالي المشاهدات" 
          value="245,890" 
          trend="up" 
          trendValue="+18.6%" 
          icon={Eye} 
          color="bg-orange-500" 
        />
        <StatCard 
          label="إجمالي المستخدمين" 
          value="12,450" 
          trend="up" 
          trendValue="+5.4%" 
          icon={Users} 
          color="bg-purple-500" 
        />
        <StatCard 
          label="إجمالي المقالات" 
          value="1,248" 
          trend="up" 
          trendValue="+8.7%" 
          icon={FileText} 
          color="bg-green-500" 
        />
        <StatCard 
          label="البلاغات الجديدة" 
          value="23" 
          trend="down" 
          trendValue="-4%" 
          icon={AlertCircle} 
          color="bg-red-500" 
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Featured News & Distribution */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-800">أكثر الأخبار مشاهدة</h3>
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div className="rounded-3xl overflow-hidden relative group">
              <img src="/images/hero.png" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" alt="News" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <span className="bg-blue-600 text-[10px] px-2 py-1 rounded-md text-white font-black w-fit mb-2">أخبار محلية</span>
                <h4 className="text-white font-black text-sm leading-6">تنمية حضرموت: مشاريع جديدة لتعزيز البنية التحتية ودعم الاقتصاد</h4>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
                <Eye size={14} className="text-blue-600" />
                <span>24,560 مشاهدة</span>
              </div>
              <span className="text-slate-300 text-[11px] font-bold">20 مايو 2024</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8">توزيع المشاهدات</h3>
            <div className="flex flex-col items-center">
               {/* Simplified SVG Donut Chart */}
               <svg viewBox="0 0 36 36" className="w-48 h-48">
                  <path className="text-gray-100 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-600 stroke-current" strokeWidth="3" strokeDasharray="45, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-orange-500 stroke-current" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-45" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
               <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-[10px] font-black text-slate-600">أخبار محلية (45%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-[10px] font-black text-slate-600">اقتصاد (25%)</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Section: Recent Articles */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">آخر الأخبار المضافة</h3>
              <button className="text-blue-600 text-xs font-black flex items-center gap-1 hover:underline">عرض الكل <ChevronLeft size={16} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src="/images/image.jpg" className="w-12 h-10 rounded-lg object-cover shadow-sm" alt="" />
                          <span className="text-sm font-black text-slate-700 line-clamp-1">بدء العمل في مشروع طريق ساحلي جديد يربط المكلا بالشحر</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black">أخبار محلية</span>
                      </td>
                      <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">20 مايو 2024</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-center gap-2">
                           <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><ExternalLink size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Reports Summary */}
          <div className="bg-white mt-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">البلاغات والتقارير الأخيرة</h3>
              <AlertCircle size={20} className="text-red-500" />
            </div>
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-700">مقال: عنوان مضلل وغير صحيح</h4>
                      <p className="text-[10px] text-slate-400 font-bold">محتوى غير لائق</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[11px] text-slate-400 font-bold">20 مايو 2024</span>
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black">جديد</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
