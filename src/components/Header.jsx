import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Home, FileText, PenLine, Search, BarChart, BookOpen, CirclePlus, BarChart3, Menu, X } from "lucide-react";
import { supabase } from "../lib/supabase";

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
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#09264d] hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            {logoUrl && <img src={logoUrl} alt="Logo" className="h-10 md:h-14 w-auto object-contain" />}
            <span className="text-2xl md:text-3xl font-black text-[#09264d] tracking-tighter group-hover:text-blue-900 transition-colors">حضرميديا</span>
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
        
        {/* LEFT: Date */}
        <div className="hidden lg:flex items-center">
          <div className="text-slate-500 font-bold text-[11px] whitespace-nowrap">
            {currentDate}
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
