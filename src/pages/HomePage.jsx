import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Clock, ChevronRight, ChevronLeft, Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import AdBanner from "../components/AdBanner";

// Image Assets
const heroImg = "images/hero.png";
const adImg = "images/ad.png";
const portImg = "images/port.png";
const defaultImg = "images/image.jpg";

// Helper for time formatting
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "الآن";
  if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
  if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
  return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;
};

function Hero({ sidebarNews, featuredNews }) {
  const duplicatedNews = sidebarNews.length > 0 ? [...sidebarNews, ...sidebarNews] : [];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 lg:h-[540px]">
      <div className="lg:col-span-3 h-[300px] lg:h-full overflow-hidden relative bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

        {duplicatedNews.length > 0 ? (
          <motion.div
            className="p-4 space-y-4"
            initial={{ y: "-50%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ display: "flex", flexDirection: "column" }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedNews.map((news, i) => (
              <Link to={`/post/${news.id}`} key={i} className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer group min-h-[140px] block">
                <span className={`text-[10px] font-black tracking-widest text-blue-600`}>{news.category}</span>
                <div className="flex gap-4">
                  <h3 className="font-black text-sm leading-6 text-slate-800 flex-1 group-hover:text-red-600 transition-colors line-clamp-2">{news.title}</h3>
                  <img src={news.main_image || defaultImg} className="w-16 h-12 rounded-lg object-cover shadow-sm" alt="" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold mt-1">
                  <Clock size={10} />
                  <span>{formatTime(news.created_at)}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-300 font-bold">لا توجد أخبار</div>
        )}
      </div>

      <div className="lg:col-span-9 relative rounded-3xl overflow-hidden h-[400px] lg:h-full group shadow-2xl order-first lg:order-last">
        {featuredNews ? (
          <Link to={`/post/${featuredNews.id}`} className="block h-full relative">
            <img src={featuredNews.main_image || heroImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Feature" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-0 right-0 left-0 p-4 sm:p-8 md:p-12 text-white">
              <span className="bg-[#e00013] px-4 py-2 rounded-lg text-[10px] md:text-xs font-black mb-4 md:mb-6 inline-block shadow-lg">{featuredNews.category || "أخبار"}</span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight max-w-3xl drop-shadow-lg">{featuredNews.title}</h1>
              <p className="hidden md:block text-gray-200 text-lg mb-8 max-w-2xl leading-relaxed font-bold opacity-90 line-clamp-2">{featuredNews.content?.replace(/<[^>]*>?/gm, '').substring(0, 150)}...</p>

              <div className="flex items-center gap-8 text-sm font-black text-gray-300 border-t border-white/10 pt-8">
                <span>{new Date(featuredNews.created_at).toLocaleDateString('ar-YE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-red-500" />
                  <span>{featuredNews.views || 0}</span>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">جاري تحميل المحتوى المميز...</div>
        )}
      </div>
    </section>
  );
}



function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from('newsletter').insert([{ email }]);
      if (error) {
        if (error.code === '23505') {
          alert('هذا البريد مشترك بالفعل');
          setStatus("error");
        } else throw error;
      } else {
        setStatus("success");
        setEmail("");
        alert('تم الاشتراك بنجاح!');
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      alert('حدث خطأ أثناء الاشتراك');
    }
  };

  return (
    <div className="bg-[#09264d] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 rotate-3">
          <Mail className="text-white" size={40} />
        </div>
        <h3 className="text-3xl font-black mb-4 leading-tight">اشترك في نشرتنا الإخبارية</h3>
        <p className="text-blue-200 text-base font-bold leading-relaxed mb-10 opacity-80">احصل على آخر الأخبار والتحديثات مباشرة إلى بريدك</p>
        <div className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني" 
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-red-600/30 transition-all text-white placeholder:text-blue-300 font-bold" 
          />
          <button 
            onClick={handleSubscribe}
            disabled={status === "loading"}
            className="w-full bg-[#e00013] hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-900/30 text-xl disabled:opacity-50"
          >
            {status === "loading" ? "جاري الاشتراك..." : status === "success" ? "تم الاشتراك بنجاح!" : "اشترك الآن"}
          </button>
        </div>
      </div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
    </div>
  );
}

function SocialCard() {
  const [socialLinks, setSocialLinks] = useState({
    facebook_url: '#',
    twitter_url: '#',
    instagram_url: '#',
    youtube_url: '#'
  });

  useEffect(() => {
    const fetchSocial = async () => {
      const { data } = await supabase
        .from('settings')
        .select('facebook_url, twitter_url, instagram_url, youtube_url')
        .single();
      if (data) setSocialLinks(data);
    };
    fetchSocial();
  }, []);

  const socials = [
    { name: "فيسبوك", count: "125K", color: "bg-[#3b5998]", icon: "f", url: socialLinks.facebook_url },
    { name: "تويتر", count: "89K", color: "bg-black", icon: "𝕏", url: socialLinks.twitter_url },
    { name: "انستغرام", count: "74K", color: "bg-[#e1306c]", icon: "📸", url: socialLinks.instagram_url },
    { name: "يوتيوب", count: "45K", color: "bg-[#ff0000]", icon: "▶", url: socialLinks.youtube_url }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg mt-10">
      <h3 className="text-2xl font-black text-slate-800 mb-8 border-r-8 border-red-600 pr-4">تابعونا</h3>
      <div className="grid grid-cols-2 gap-4">
        {socials.map((s) => (
          <a 
            key={s.name} 
            href={s.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${s.color} text-white rounded-2xl py-5 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-xl group block`}
          >
            <span className="text-xl font-bold group-hover:scale-110 transition-transform">{s.icon}</span>
            <div className="text-center">
              <span className="text-[10px] font-black uppercase opacity-70 block">{s.name}</span>
              <span className="text-sm font-black">{s.count} متابع</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ReportCard({ id, big, label, title, time, views, image, is_cross_media }) {
  const path = is_cross_media ? `/cross-media/${id}` : `/post/${id}`;
  return (
    <Link to={path} className="block">
      <article className={`relative rounded-3xl overflow-hidden shadow-xl group bg-white ${big ? "h-[480px]" : "h-64"}`}>
        <img src={image || defaultImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
        <span className="absolute top-5 right-5 bg-[#e00013] text-white px-4 py-2 rounded-xl text-xs font-black z-10 shadow-lg">{label}</span>
        <div className="absolute bottom-0 right-0 left-0 p-8 text-white z-10">
          <h3 className={`${big ? "text-3xl" : "text-xl"} font-black leading-tight mb-4 group-hover:text-red-400 transition-colors drop-shadow-md line-clamp-2`}>{title}</h3>
          <div className="flex items-center gap-6 text-[11px] font-black text-gray-300">
            <span>{formatTime(time)}</span>
            <div className="flex items-center gap-1">
              <Eye size={14} className="text-red-500" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ReportsSection({ reports }) {
  const mainReport = reports[0];
  const subReports = reports.slice(1, 3);

  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 md:h-10 bg-red-600 rounded-full" />
          <h2 className="text-2xl md:text-4xl font-black text-slate-800">تقارير وتحقيقات</h2>
        </div>
        <Link to="/reports" className="text-red-600 font-black text-sm hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={16} /></Link>
      </div>
      
      {mainReport && (
        <ReportCard 
          id={mainReport.id}
          big 
          label={mainReport.category || "تقرير خاص"} 
          title={mainReport.title} 
          time={mainReport.created_at} 
          views={mainReport.views || 0} 
          image={mainReport.main_image} 
          is_cross_media={mainReport.is_cross_media}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {subReports.map((report, idx) => (
          <ReportCard 
            key={idx}
            id={report.id}
            label={report.category || "تقرير"} 
            title={report.title} 
            time={report.created_at} 
            views={report.views || 0} 
            image={report.main_image} 
            is_cross_media={report.is_cross_media}
          />
        ))}
      </div>
    </section>
  );
}


const HomePage = () => {
  const [sidebarNews, setSidebarNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Sidebar News (Latest 10)
        const { data: latestNews } = await supabase
          .from('news')
          .select('*')
          .eq('status', 'منشور')
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (latestNews) {
          setSidebarNews(latestNews);
          setFeaturedNews(latestNews[0]);
        }

        // Fetch Reports/Investigations
        const { data: reportsData } = await supabase
          .from('news')
          .select('*')
          .eq('status', 'منشور')
          .or('category.eq.تقارير,category.eq.تحقيقات,category.eq.كروس ميديا')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (reportsData) setReports(reportsData);

      } catch (err) {
        console.error("Error fetching home data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] flex items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          <p className="font-black text-slate-400 tracking-widest text-sm uppercase">جاري جلب البيانات الحية من Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fb] min-h-screen font-cairo text-right overflow-x-hidden pb-20" dir="rtl">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Hero sidebarNews={sidebarNews} featuredNews={featuredNews} />
        <AdBanner position="content" className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3 lg:sticky lg:top-24 order-2 lg:order-1 space-y-8">
            <NewsletterCard />
            <AdBanner position="sidebar" />
            <SocialCard />
          </div>
          <div className="lg:col-span-9">
            <ReportsSection reports={reports} />
            {/* View all governorates button removed as requested */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
