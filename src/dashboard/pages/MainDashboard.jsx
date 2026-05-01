import React, { useState, useEffect } from 'react';
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
  Layout,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
  const [stats, setStats] = useState({
    totalViews: 0,
    totalUsers: 0,
    totalNews: 0,
    newComments: 0
  });
  const [latestNews, setLatestNews] = useState([]);
  const [mostViewed, setMostViewed] = useState(null);
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch Total News Count
        const { count: newsCount } = await supabase
          .from('news')
          .select('*', { count: 'exact', head: true });

        // Fetch Total Views
        const { data: viewsData } = await supabase
          .from('news')
          .select('views_count');
        const totalViews = viewsData?.reduce((acc, curr) => acc + (curr.views_count || 0), 0) || 0;

        // Fetch Total Subscribers (as "Users" for dashboard)
        const { count: subscribersCount } = await supabase
          .from('newsletter')
          .select('*', { count: 'exact', head: true });

        // Fetch Total Comments
        const { count: commentsCount } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalViews: totalViews.toLocaleString(),
          totalUsers: (subscribersCount || 0).toLocaleString(),
          totalNews: (newsCount || 0).toLocaleString(),
          newComments: (commentsCount || 0).toLocaleString()
        });

        // Fetch Latest News
        const { data: newsData } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        setLatestNews(newsData || []);

        // Fetch Most Viewed News
        const { data: viewedData } = await supabase
          .from('news')
          .select('*')
          .order('views_count', { ascending: false })
          .limit(1);
        if (viewedData && viewedData.length > 0) setMostViewed(viewedData[0]);

        // Fetch Recent Comments
        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        setRecentComments(commentsData || []);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

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
          <span className="text-sm font-black text-slate-700">{new Date().toLocaleDateString('ar-YE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-[#eef2ff] p-8 rounded-[40px] relative overflow-hidden flex items-center justify-between border border-blue-100/50">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-[#09264d] mb-2">مرحباً بك في لوحة التحكم 👋</h2>
          <p className="text-slate-500 font-bold">إليك ملخص أداء الموقع اليوم من Supabase</p>
        </div>
        <div className="absolute left-10 -bottom-10 opacity-10">
          <LayoutDashboard size={200} className="text-[#09264d]" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="إجمالي المشاهدات" 
          value={stats.totalViews} 
          trend="up" 
          trendValue="+12%" 
          icon={Eye} 
          color="bg-orange-500" 
        />
        <StatCard 
          label="المشتركون" 
          value={stats.totalUsers} 
          trend="up" 
          trendValue="+5%" 
          icon={Users} 
          color="bg-purple-500" 
        />
        <StatCard 
          label="إجمالي المنشورات" 
          value={stats.totalNews} 
          trend="up" 
          trendValue="+8%" 
          icon={FileText} 
          color="bg-green-500" 
        />
        <StatCard 
          label="إجمالي التعليقات" 
          value={stats.newComments} 
          trend="up" 
          trendValue="+15%" 
          icon={MessageSquare} 
          color="bg-blue-500" 
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Featured News & Distribution */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-800">الأكثر مشاهدة</h3>
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            {mostViewed ? (
              <div className="rounded-3xl overflow-hidden relative group">
                <img src={mostViewed.main_image || "/images/hero.png"} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" alt="News" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                  <span className="bg-blue-600 text-[10px] px-2 py-1 rounded-md text-white font-black w-fit mb-2">{mostViewed.category}</span>
                  <h4 className="text-white font-black text-sm leading-6 line-clamp-2">{mostViewed.title}</h4>
                </div>
              </div>
            ) : (
              <div className="h-48 bg-gray-50 rounded-3xl flex items-center justify-center text-slate-300 font-bold">لا توجد بيانات</div>
            )}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
                <Eye size={14} className="text-blue-600" />
                <span>{mostViewed?.views_count || 0} مشاهدة</span>
              </div>
              <span className="text-slate-300 text-[11px] font-bold">{mostViewed ? new Date(mostViewed.created_at).toLocaleDateString('ar-YE') : ''}</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8">إحصائيات سريعة</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-black text-slate-600">المشتركون الجدد</span>
                <span className="text-lg font-black text-blue-600">{stats.totalUsers}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-black text-slate-600">التعليقات الكلية</span>
                <span className="text-lg font-black text-green-600">{stats.newComments}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Recent Articles */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">آخر المنشورات المضافة</h3>
              <a href="/dashboard/news" className="text-blue-600 text-xs font-black flex items-center gap-1 hover:underline">عرض الكل <ChevronLeft size={16} /></a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {latestNews.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={item.main_image || "/images/image.jpg"} className="w-12 h-10 rounded-lg object-cover shadow-sm" alt="" />
                          <span className="text-sm font-black text-slate-700 line-clamp-1">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black">{item.category}</span>
                      </td>
                      <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{new Date(item.created_at).toLocaleDateString('ar-YE')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Comments Summary */}
          <div className="bg-white mt-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">آخر التعليقات</h3>
              <MessageCircle size={20} className="text-blue-500" />
            </div>
            <div className="p-4 space-y-4">
              {recentComments.length > 0 ? recentComments.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-700 line-clamp-1">{comment.content}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">بواسطة: {comment.author_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[11px] text-slate-400 font-bold">{new Date(comment.created_at).toLocaleDateString('ar-YE')}</span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black">جديد</span>
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center text-slate-300 font-bold">لا توجد تعليقات حالياً</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
