import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Home, FileText, PenLine, Search, BarChart, BookOpen, CirclePlus, BarChart3 } from "lucide-react";

const navItems = [
  { label: "أحداث", icon: Home, to: "/events" },
  { label: "تقارير كرس ميديا", icon: CirclePlus, to: "/reports" },
  { label: "قصص", icon: BookOpen, to: "/stories" },
  { label: "تحقيق", icon: Search, to: "/investigation" },
  { label: "استطلاعات", icon: BarChart3, to: "/statistics" }, // Matching the 'استطلاعات' in the screenshot
  { label: "كاريكاتير", icon: () => <span className="text-lg font-bold">®</span>, to: "/cartoons" },
  { label: "مقال", icon: PenLine, to: "/article" },
  { label: "الدراسات", icon: FileText, to: "/studies" },
];

function TopHeader() {
  const currentDate = new Intl.DateTimeFormat('ar-YE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="bg-white border-b border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* RIGHT: Logo */}
        <Link to="/" className="text-4xl font-black text-[#09264d] tracking-tighter shrink-0 hover:opacity-80 transition-opacity">
          حضرميديا
        </Link>
        
        {/* MIDDLE: Featured News with "أهم الأخبار" label */}
        <div className="hidden lg:flex items-center gap-3 flex-1 justify-center px-10 overflow-hidden">
          <span className="font-black text-red-600 text-lg whitespace-nowrap">أهم الأخبار</span>
          <span className="text-slate-300 text-lg">|</span>
          <span className="font-black text-slate-900 truncate text-lg">مجلس القيادة الرئاسي يقر حزمة من القرارات الهادفة إلى تحسين الأوضاع الاقتصادية والخدمية</span>
          <span className="w-3 h-3 rounded-full bg-red-600 shrink-0 ml-2" />
        </div>
        
        {/* LEFT: Date */}
        <div className="font-bold text-slate-500 text-sm whitespace-nowrap shrink-0">
          {currentDate}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-[#09264d] text-white sticky top-0 z-50 w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-14">
        <div className="flex items-center justify-start h-full overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 h-full text-sm font-bold transition-all border-b-2 whitespace-nowrap hover:bg-white/5 ${
                  isActive ? "border-red-600 bg-white/10" : "border-transparent text-gray-300"
                }`
              }
            >
              <span className="text-red-500 shrink-0">
                {typeof item.icon === "function" ? <item.icon /> : <item.icon size={18} />}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Header() {
  return (
    <header className="w-full">
      <TopHeader />
      <Navbar />
    </header>
  );
}

export default Header;
