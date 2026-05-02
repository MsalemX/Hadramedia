import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  BookOpen,
  FileText,
  PlayCircle,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  FileSearch,
  Users,
  ShieldCheck,
  Flag,
  MessageSquare,
  BarChart3,
  Settings,
  Mail,
  MessageCircle,
  Mic
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, badge, onClick }) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`
    }
  >
    <Icon size={20} className="shrink-0" />
    <span className="font-bold flex-1">{label}</span>
    {badge && (
      <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
        {badge}
      </span>
    )}
  </NavLink>
);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuGroups = [
    {
      title: "إدارة المحتوى",
      items: [
        { to: "/dashboard/news", icon: Newspaper, label: "الأخبار / الأحداث" },
        { to: "/dashboard/investigations", icon: FileSearch, label: "التحقيقات" },
        { to: "/dashboard/studies", icon: FileText, label: "الدراسات" },
        { to: "/dashboard/stories", icon: BookOpen, label: "القصص" },
        { to: "/dashboard/articles", icon: Newspaper, label: "المقالات" },
        { to: "/dashboard/cartoons", icon: TrendingUp, label: "الكاريكاتير" },
        { to: "/dashboard/cross-media", icon: PlayCircle, label: "الكروس ميديا" },
        { to: "/dashboard/podcasts", icon: Mic, label: "البودكاست" },
      ]
    },
    {
      title: "التصنيفات والوسوم",
      items: [
        { to: "/dashboard/categories", icon: Settings, label: "التصنيفات" },
        { to: "/dashboard/tags", icon: Settings, label: "الوسوم" },
      ]
    },
    {
      title: "إدارة المستخدمين",
      items: [
        { to: "/dashboard/users", icon: Users, label: "المستخدمين" },
      ]
    },
    {
      title: "التقارير والإعدادات",
      items: [
        { to: "/dashboard/ads", icon: Newspaper, label: "الإعلانات" },
        { to: "/dashboard/stats", icon: BarChart3, label: "الإحصائيات" },
        { to: "/dashboard/settings", icon: Settings, label: "إعدادات الموقع" },
        { to: "/dashboard/newsletter", icon: Mail, label: "النشرة البريدية" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fb] flex font-cairo overflow-x-hidden" dir="rtl">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-72 bg-[#09264d] text-white flex flex-col fixed inset-y-0 right-0 z-50 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-2xl">ح</div>
            <div>
              <h1 className="font-black text-xl tracking-tight">حضرميديا</h1>
              <p className="text-[10px] text-blue-300 font-bold opacity-70">لوحة التحكم</p>
            </div>
          </div>
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          <div className="space-y-6">
            <SidebarLink to="/dashboard" icon={LayoutDashboard} label="الرئيسية" onClick={() => setIsSidebarOpen(false)} />

            {menuGroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-[10px] uppercase tracking-widest text-white/30 font-black px-4 pt-4">
                  {group.title}
                </h3>
                {group.items.map((item, i) => (
                  <SidebarLink key={i} {...item} onClick={() => setIsSidebarOpen(false)} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-600/10 hover:text-red-500 transition-all font-bold group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 min-w-0 lg:pr-72">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2.5 bg-gray-50 text-slate-500 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div className="relative group hidden sm:block">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="بحث عن محتوى..."
                  className="bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all w-40 md:w-80 font-bold"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              <div className="h-10 w-[1px] bg-gray-100 hidden sm:block"></div>

              <div className="flex items-center gap-3">
                <div className="text-left hidden md:block">
                  <h4 className="text-sm font-black text-slate-800">أحمد المدير</h4>
                  <p className="text-[10px] text-slate-400 font-bold">مدير النظام</p>
                </div>
                <img
                  src="https://ui-avatars.com/api/?name=Ahmed+Manager&background=09264d&color=fff"
                  className="w-10 h-10 rounded-xl border-2 border-white shadow-sm"
                  alt="Profile"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-4 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
