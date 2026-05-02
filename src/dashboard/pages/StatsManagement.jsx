import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  FileText,
  PlayCircle,
  Users,
  Calendar,
  ChevronDown,
  Loader2,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const StatsManagement = () => {
  const [stats, setStats] = useState({
    newsCount: 0,
    articlesCount: 0,
    crossMediaCount: 0,
    totalViews: 0,
    subscribersCount: 0,
    commentsCount: 0,
    categoryDistribution: []
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch news categorized
      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('category, is_cross_media, views');

      if (newsError) throw newsError;

      // Fetch newsletter count
      const { count: newsletterCount, error: nlError } = await supabase
        .from('newsletter')
        .select('*', { count: 'exact', head: true });

      if (nlError) throw nlError;

      // Fetch comments count
      const { count: commentsCount, error: commError } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true });

      if (commError) throw commError;

      const counts = {
        news: 0,
        articles: 0,
        crossMedia: 0,
        stories: 0,
        studies: 0,
        totalViews: 0
      };

      const catMap = {};

      newsData.forEach(item => {
        counts.totalViews += (item.views || 0);
        
        if (item.is_cross_media) counts.crossMedia++;
        
        if (item.category === 'مقالات' || item.category === 'مقال') counts.articles++;
        else if (item.category === 'أخبار' || item.category === 'أحداث') counts.news++;
        else if (item.category === 'قصص') counts.stories++;
        else if (item.category === 'دراسات') counts.studies++;

        catMap[item.category] = (catMap[item.category] || 0) + 1;
      });

      const totalItems = newsData.length || 1;
      const distribution = Object.entries(catMap).map(([label, count]) => ({
        label,
        value: `${Math.round((count / totalItems) * 100)}%`,
        percentage: (count / totalItems) * 100,
        color: label === 'أخبار' ? 'bg-blue-600' : label === 'مقالات' ? 'bg-purple-600' : label === 'كروس ميديا' ? 'bg-green-600' : 'bg-orange-600'
      })).sort((a, b) => b.percentage - a.percentage);

      setStats({
        newsCount: counts.news,
        articlesCount: counts.articles,
        crossMediaCount: counts.crossMedia,
        totalViews: counts.totalViews,
        subscribersCount: newsletterCount || 0,
        commentsCount: commentsCount || 0,
        categoryDistribution: distribution
      });

    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csvRows = [
      ['Category', 'Count'],
      ['Total News', stats.newsCount],
      ['Total Articles', stats.articlesCount],
      ['Cross Media', stats.crossMediaCount],
      ['Total Views', stats.totalViews],
      ['Subscribers', stats.subscribersCount],
      ['Comments', stats.commentsCount],
      [''],
      ['Category Distribution', 'Percentage'],
      ...stats.categoryDistribution.map(c => [c.label, c.value])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Hardmedia_Stats_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إحصائيات وتقارير الموقع</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الإحصائيات</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            تصدير التقرير (Excel)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'أخبار / أحداث', value: stats.newsCount, icon: Newspaper, color: 'text-blue-600 bg-blue-50' },
          { label: 'المقالات', value: stats.articlesCount, icon: FileText, color: 'text-purple-600 bg-purple-50' },
          { label: 'الكروس ميديا', value: stats.crossMediaCount, icon: PlayCircle, color: 'text-green-600 bg-green-50' },
          { label: 'إجمالي المشاهدات', value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-black text-slate-800 mb-8">توزيع المحتوى حسب الفئة</h3>
          <div className="space-y-6">
            {stats.categoryDistribution.map((source, i) => (
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

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <MessageSquare size={32} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">إجمالي التعليقات</h3>
          <p className="text-4xl font-black text-blue-600 mb-4">{stats.commentsCount}</p>
          <p className="text-slate-400 font-bold max-w-xs">مستوى التفاعل العام على الموقع من خلال التعليقات الواردة من المستخدمين</p>
          
          <div className="mt-12 w-full grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-4 rounded-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">المشتركين</p>
                <p className="text-xl font-black text-slate-800">{stats.subscribersCount}</p>
             </div>
             <div className="bg-gray-50 p-4 rounded-3xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">نسبة التفاعل</p>
                <p className="text-xl font-black text-slate-800">{Math.round((stats.commentsCount / (stats.totalViews || 1)) * 1000) / 10}%</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsManagement;
