import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Home, FileText, PenLine, Search, BarChart, BookOpen, CirclePlus, BarChart3, Menu, X, LayoutGrid, Headphones } from "lucide-react";
import { supabase } from "../lib/supabase";

const navItems = [
  { label: "أحداث", icon: Home, to: "/events" },
  { label: "تقارير كروس ميديا", icon: CirclePlus, to: "/reports" },
  { label: "قصص", icon: BookOpen, to: "/stories" },
  { label: "تحقيق", icon: Search, to: "/investigation" },
  { label: "استطلاعات", icon: BarChart3, to: "/statistics" },
  { label: "كاريكاتير", icon: () => <span className="text-lg font-bold">®</span>, to: "/cartoons" },
  { label: "مقال", icon: PenLine, to: "/article" },
  { label: "الدراسات", icon: FileText, to: "/studies" },
  { label: "الأدوات", icon: LayoutGrid, to: "/tools" },
  { label: "البودكاست", icon: Headphones, to: "/podcasts" },
];

function TopHeader({ toggleMenu, isOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [topNewsLabel, setTopNewsLabel] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('settings')
        .select('top_news_label, logo_url')
        .single();
      if (data) {
        setTopNewsLabel(data.top_news_label);
        setLogoUrl(data.logo_url);
      }
    };
    fetchSettings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const [now, setNow] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('ar-YE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(now);

  const formattedTime = new Intl.DateTimeFormat('ar-YE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(now);

  return (
    <div className="bg-white border-b border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-24 flex items-center justify-between gap-4">
        {/* RIGHT: Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#09264d] hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link to="/" className="flex items-center group shrink-0">
            {logoUrl && <img src={logoUrl} alt="Logo" className="h-14 md:h-24 w-auto object-contain transition-transform group-hover:scale-105" />}
          </Link>
        </div>

        {/* MIDDLE: Top News Label */}
        <div className="hidden md:flex flex-1 justify-center items-center px-6">
          {topNewsLabel && (
            <div className="flex items-center gap-3 text-[#09264d] font-black text-base md:text-lg text-center leading-tight">
              <span className="w-3 h-3 bg-red-600 rounded-full shrink-0 shadow-[0_0_10px_rgba(220,38,38,0.3)]"></span>
              <p className="line-clamp-1">{topNewsLabel}</p>
            </div>
          )}
        </div>

        {/* LEFT: Search & Date */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative flex items-center">
            <div className={`overflow-hidden transition-all duration-300 flex items-center ${showSearch ? 'w-40 md:w-64 opacity-100 ml-2' : 'w-0 opacity-0'}`}>
              <form onSubmit={handleSearch} className="w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث هنا..."
                  className="w-full bg-slate-100 border-none rounded-full px-4 py-1.5 text-sm focus:ring-1 focus:ring-red-600 text-right font-bold"
                  dir="rtl"
                />
              </form>
            </div>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-[#09264d] hover:bg-slate-100 rounded-full transition-colors shrink-0"
            >
              {showSearch ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-slate-600 font-bold text-sm whitespace-nowrap border-r border-gray-100 pr-4">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="text-red-600 font-black">{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Mobile view spacing */}
      <div className="md:hidden h-2"></div>
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
                `flex items-center gap-2 px-5 h-full text-sm font-bold transition-all border-b-2 whitespace-nowrap hover:bg-white/5 ${isActive ? "border-red-600 bg-white/10 text-white" : "border-transparent text-gray-300"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] border-t border-white/5 shadow-2xl" : "max-h-0"
          }`}
      >
        <div className="flex flex-col py-4 bg-[#09264d]">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `flex items-center gap-4 px-8 py-4 text-sm font-bold transition-all border-r-4 ${isActive ? "border-red-600 bg-white/10 text-white" : "border-transparent text-gray-300 hover:bg-white/5"
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
