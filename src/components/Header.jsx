import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Home, FileText, PenLine, Search, BarChart, BookOpen, CirclePlus, BarChart3, Menu, X } from "lucide-react";

const navItems = [
  { label: "أحداث", icon: Home, to: "/events" },
  { label: "تقارير كرس ميديا", icon: CirclePlus, to: "/reports" },
  { label: "قصص", icon: BookOpen, to: "/stories" },
  { label: "تحقيق", icon: Search, to: "/investigation" },
  { label: "استطلاعات", icon: BarChart3, to: "/statistics" },
  { label: "كاريكاتير", icon: () => <span className="text-lg font-bold">®</span>, to: "/cartoons" },
  { label: "مقال", icon: PenLine, to: "/article" },
  { label: "الدراسات", icon: FileText, to: "/studies" },
];

function TopHeader({ toggleMenu, isOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const currentDate = new Intl.DateTimeFormat('ar-YE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="bg-white border-b border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-24 flex items-center justify-between gap-4">
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
        
        {/* MIDDLE: Search Bar (Global) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أخبار، تقارير، مقالات..."
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pr-12 pl-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white focus:border-blue-600/20 transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
        </form>
        
        {/* LEFT: Date & Login */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:block font-bold text-slate-500 text-[10px] whitespace-nowrap shrink-0 text-left">
            <div className="text-slate-400 uppercase tracking-widest mb-1 text-[8px]">تاريخ اليوم</div>
            {currentDate}
          </div>
          <Link 
            to="/login" 
            className="bg-[#09264d] text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            دخول المشرف
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث هنا..."
            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-xs font-bold focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </form>
      </div>
    </div>
  );
}

function Navbar({ isOpen, toggleMenu }) {
  return (
    <nav className="bg-[#09264d] text-white sticky top-0 z-50 w-full shadow-lg">
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
