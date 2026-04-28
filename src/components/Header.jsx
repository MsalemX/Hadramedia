import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Home, FileText, PenLine, Search, BarChart, BookOpen, CirclePlus, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

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

function TopHeader({ toggleMenu, isOpen }) {
  const currentDate = new Intl.DateTimeFormat('ar-YE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="bg-white border-b border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* RIGHT: Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#09264d] hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link to="/" className="text-3xl md:text-4xl font-black text-[#09264d] tracking-tighter shrink-0 hover:opacity-80 transition-opacity">
            حضرميديا
          </Link>
        </div>
        
        {/* MIDDLE: Featured News (Desktop Only) */}
        <Link to="/post/1" className="hidden lg:flex items-center gap-3 flex-1 justify-center px-10 overflow-hidden group cursor-pointer hover:opacity-90">
          <span className="font-black text-red-600 text-lg whitespace-nowrap">أهم الأخبار</span>
          <span className="text-slate-300 text-lg">|</span>
          <span className="font-black text-slate-900 truncate text-lg group-hover:text-blue-600 transition-colors">مجلس القيادة الرئاسي يقر حزمة من القرارات الهادفة إلى تحسين الأوضاع الاقتصادية والخدمية</span>
          <span className="w-3 h-3 rounded-full bg-red-600 shrink-0 ml-2" />
        </Link>
        
        {/* LEFT: Date & Login */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block font-bold text-slate-500 text-xs md:text-sm whitespace-nowrap shrink-0">
            {currentDate}
          </div>
          <Link 
            to="/login" 
            className="bg-[#09264d] text-white px-5 py-2 rounded-xl text-sm font-black hover:bg-blue-900 transition-all shadow-md shadow-blue-900/10"
          >
            دخول المشرف
          </Link>
        </div>
      </div>
    </div>
  );
}

function Navbar({ isOpen, toggleMenu }) {
  return (
    <nav className="bg-[#09264d] text-white sticky top-0 z-50 w-full shadow-lg">
      {/* Desktop & Tablet Menu (Visible on md and above) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 hidden md:block">
        <div className="flex items-center justify-start h-full overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 h-full text-sm font-bold transition-all border-b-2 whitespace-nowrap hover:bg-white/5 ${
                  isActive ? "border-red-600 bg-white/10 text-white" : "border-transparent text-gray-300"
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

      {/* Mobile Drawer (Visible on screens smaller than md when isOpen is true) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] border-t border-white/5 shadow-2xl" : "max-h-0"
        }`}
      >
        <div className="flex flex-col py-4 bg-[#09264d]">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 text-sm font-bold transition-all border-r-4 ${
                  isActive ? "border-red-600 bg-white/10 text-white" : "border-transparent text-gray-300 hover:bg-white/5"
                }`
              }
            >
              <span className="text-red-500">
                {typeof item.icon === "function" ? <item.icon /> : <item.icon size={20} />}
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
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full">
      <TopHeader isOpen={isOpen} toggleMenu={toggleMenu} />
      <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );
}

export default Header;
