import React from "react";
import { Eye, Clock, ChevronRight, ChevronLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";

// Image Assets
const heroImg = "images/hero.png";
const adImg = "images/ad.png";
const portImg = "images/port.png";
const defaultImg = "images/image.jpg";

function Hero() {
  const sidebarNews = [
    { category: "سياسة", title: "مجلس القيادة الرئاسي يقر حزمة من القرارات الهادفة", time: "منذ ساعة", color: "text-blue-600" },
    { category: "رياضة", title: "المنتخب الوطني يتأهل إلى نصف نهائي كأس الخليج", time: "منذ ساعتين", color: "text-green-600" },
    { category: "تقنية", title: "الذكاء الاصطناعي في التعليم فرص وتحديات المستقبل", time: "منذ 3 ساعات", color: "text-purple-600" },
    { category: "ثقافة", title: "افتتاح معرض الكتاب الدولي في المكلا بمشاركة واسعة", time: "منذ 4 ساعات", color: "text-orange-600" },
    { category: "محلي", title: "تدشين مشاريع مياه جديدة في أرياف حضرموت", time: "منذ 5 ساعات", color: "text-teal-600" },
  ];

  // Doubling the array for a seamless vertical marquee loop
  const duplicatedNews = [...sidebarNews, ...sidebarNews];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 lg:h-[540px]">
      {/* Animated Sidebar News (Downward Motion) */}
      <div className="lg:col-span-3 h-[300px] lg:h-full overflow-hidden relative bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

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
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer group min-h-[140px]">
              <span className={`text-[10px] font-black tracking-widest ${news.color}`}>{news.category}</span>
              <div className="flex gap-4">
                <h3 className="font-black text-sm leading-6 text-slate-800 flex-1 group-hover:text-red-600 transition-colors line-clamp-2">{news.title}</h3>
                <img src={defaultImg} className="w-16 h-12 rounded-lg object-cover shadow-sm" alt="" />
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold mt-1">
                <Clock size={10} />
                <span>{news.time}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Feature */}
      <div className="lg:col-span-9 relative rounded-3xl overflow-hidden h-[400px] lg:h-full group shadow-2xl order-first lg:order-last">
        <img src={heroImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Feature" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12 text-white">
          <span className="bg-[#e00013] px-4 py-2 rounded-lg text-[10px] md:text-xs font-black mb-4 md:mb-6 inline-block shadow-lg">أخبار وتحقيقات</span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-tight max-w-3xl drop-shadow-lg">تنمية حضرموت: مشاريع جديدة لتعزيز التنمية ودعم الاقتصاد المحلي</h1>
          <p className="hidden md:block text-gray-200 text-lg mb-8 max-w-2xl leading-relaxed font-bold opacity-90">تواصل الجهات الحكومية والجهات المحلية تنفيذ مشاريع تنموية في مختلف القطاعات تهدف لتحسين الخدمات وتوفير فرص العمل.</p>

          <div className="flex items-center gap-8 text-sm font-black text-gray-300 border-t border-white/10 pt-8">
            <span>20 مايو 2024</span>
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-red-500" />
              <span>1.2K</span>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 right-12 flex gap-3">
          <span className="w-3 h-3 rounded-full bg-white shadow-md" />
          <span className="w-3 h-3 rounded-full bg-red-600 shadow-md ring-4 ring-red-600/20" />
          <span className="w-3 h-3 rounded-full bg-white/30" />
          <span className="w-3 h-3 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}

function AdBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-48 md:h-40 mb-10 md:mb-16 shadow-2xl border border-white/5">
      <img src={adImg} className="absolute inset-0 w-full h-full object-cover" alt="Ad" />
      <div className="absolute inset-0 bg-[#09264d]/60 backdrop-blur-[2px] flex flex-col md:flex-row items-center px-6 md:px-16 justify-center md:justify-between text-center md:text-right gap-6">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">مساحة إعلانية</h2>
          <p className="text-blue-100 text-sm md:text-xl font-bold opacity-90">ضع إعلانك هنا ووصل إلى آلاف القراء يومياً</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative z-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black transition-all text-base md:text-lg shadow-xl shadow-blue-900/40">اعرف المزيد</button>
          <div className="hidden md:block text-white/20 text-sm font-mono self-end pb-2">728x90</div>
        </div>
      </div>
    </div>
  );
}

function NewsletterCard() {
  return (
    <div className="bg-[#09264d] rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 rotate-3">
          <Mail className="text-white" size={40} />
        </div>
        <h3 className="text-3xl font-black mb-4 leading-tight">اشترك في نشرتنا الإخبارية</h3>
        <p className="text-blue-200 text-base font-bold leading-relaxed mb-10 opacity-80">احصل على آخر الأخبار والتحديثات مباشرة إلى بريدك</p>
        <div className="space-y-4">
          <input type="email" placeholder="أدخل بريدك الإلكتروني" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-red-600/30 transition-all text-white placeholder:text-blue-300 font-bold" />
          <button className="w-full bg-[#e00013] hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-900/30 text-xl">اشترك الآن</button>
        </div>
      </div>
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
    </div>
  );
}

function SocialCard() {
  const socials = [
    { name: "فيسبوك", count: "125K", color: "bg-[#3b5998]", icon: "f" },
    { name: "تويتر", count: "89K", color: "bg-black", icon: "𝕏" },
    { name: "انستغرام", count: "74K", color: "bg-[#e1306c]", icon: "📸" },
    { name: "يوتيوب", count: "45K", color: "bg-[#ff0000]", icon: "▶" }
  ];
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg mt-10">
      <h3 className="text-2xl font-black text-slate-800 mb-8 border-r-8 border-red-600 pr-4">تابعونا</h3>
      <div className="grid grid-cols-2 gap-4">
        {socials.map((s) => (
          <button key={s.name} className={`${s.color} text-white rounded-2xl py-5 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-xl group`}>
            <span className="text-xl font-bold group-hover:scale-110 transition-transform">{s.icon}</span>
            <div className="text-center">
              <span className="text-[10px] font-black uppercase opacity-70 block">{s.name}</span>
              <span className="text-sm font-black">{s.count} متابع</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ReportCard({ big, label, title, time, views, image }) {
  return (
    <article className={`relative rounded-3xl overflow-hidden shadow-xl group bg-white ${big ? "h-[480px]" : "h-64"}`}>
      <img src={image || defaultImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
      <span className="absolute top-5 right-5 bg-[#e00013] text-white px-4 py-2 rounded-xl text-xs font-black z-10 shadow-lg">{label}</span>
      <div className="absolute bottom-0 right-0 left-0 p-8 text-white z-10">
        <h3 className={`${big ? "text-3xl" : "text-xl"} font-black leading-tight mb-4 group-hover:text-red-400 transition-colors drop-shadow-md`}>{title}</h3>
        <div className="flex items-center gap-6 text-[11px] font-black text-gray-300">
          <span>منذ {time}</span>
          <div className="flex items-center gap-1">
            <Eye size={14} className="text-red-500" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ReportsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-8 md:h-10 bg-red-600 rounded-full" />
          <h2 className="text-2xl md:text-4xl font-black text-slate-800">تقارير وتحقيقات</h2>
        </div>
        <a href="#" className="text-red-600 font-black text-sm hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={16} /></a>
      </div>
      <ReportCard big label="تقرير خاص" title="ميناء الضبة.. بوابة حضرموت نحو الاقتصاد العالمي" time="4 أيام" views="1.2K" image={portImg} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <ReportCard label="تحقيق" title="تحقيق خاص: أزمة المشتقات النفطية في المحافظات" time="يومين" views="1.1K" image={defaultImg} />
        <ReportCard label="تقرير" title="الكهرباء في حضرموت.. بين الواقع والمأمول" time="يوم" views="1.2K" image={defaultImg} />
      </div>
    </section>
  );
}


const HomePage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen font-cairo text-right overflow-x-hidden pb-20" dir="rtl">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Hero />
        <AdBanner />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3 lg:sticky lg:top-24 order-2 lg:order-1">
            <NewsletterCard />
            <SocialCard />
          </div>
          <div className="lg:col-span-9">
            <ReportsSection />
            <button className="mt-16 w-full py-5 bg-white border border-gray-200 rounded-3xl text-slate-700 font-black hover:bg-gray-50 hover:shadow-md transition-all text-lg shadow-sm">عرض كل المحافظات</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
