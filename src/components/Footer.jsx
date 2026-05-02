import React, { useState, useEffect } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

// Custom SVG Icons for brands not available in current lucide version
export const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

export const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('newsletter').insert([{ email }]);
      if (error) {
        if (error.code === '23505') alert('هذا البريد مشترك بالفعل');
        else throw error;
      } else {
        alert('تم الاشتراك بنجاح!');
        setEmail("");
      }
    } catch (err) {
      alert('حدث خطأ أثناء الاشتراك');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="أدخل بريدك الإلكتروني" 
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:text-blue-100/30 font-bold" 
        />
      </div>
      <button 
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50"
      >
        {loading ? 'جاري الاشتراك...' : 'اشتراك'}
      </button>
    </form>
  );
};

function Footer() {
  const [socialLinks, setSocialLinks] = useState({
    facebook_url: '#',
    twitter_url: '#',
    youtube_url: '#',
    instagram_url: '#'
  });

  useEffect(() => {
    const fetchSocial = async () => {
      const { data } = await supabase
        .from('settings')
        .select('facebook_url, twitter_url, youtube_url, instagram_url')
        .single();
      if (data) setSocialLinks(data);
    };
    fetchSocial();
  }, []);

  const socialItems = [
    { icon: FacebookIcon, color: "hover:bg-[#3b5998]", url: socialLinks.facebook_url },
    { icon: XIcon, color: "hover:bg-black", url: socialLinks.twitter_url },
    { icon: YoutubeIcon, color: "hover:bg-[#ff0000]", url: socialLinks.youtube_url },
    { icon: InstagramIcon, color: "hover:bg-[#e1306c]", url: socialLinks.instagram_url }
  ];

  return (
    <footer className="bg-[#09264d] text-white pt-20 pb-10 mt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Column 1: About */}
          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tighter">حضرميديا</h2>
            <p className="text-blue-100/70 text-base leading-8 font-bold">
              منصة إخبارية حضرمية مستقلة تهتم بنقل الخبر والتحقيقات المعمقة في حضرموت والمهجر واليمن والعالم.
            </p>
            <div className="flex gap-4">
              {socialItems.map((item, i) => (
                <a 
                  key={i} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center transition-all ${item.color} hover:border-transparent group`}
                >
                  <item.icon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-black border-r-4 border-red-600 pr-4">روابط سريعة</h3>
            <ul className="space-y-5 text-blue-100/60 font-bold">
              {[
                { label: "الرئيسية", to: "/" },
                { label: "أحداث", to: "/events" },
                { label: "تقارير كرس ميديا", to: "/reports" },
                { label: "قصص", to: "/stories" },
                { label: "استطلاعات", to: "/statistics" },
                { label: "كاريكاتير", to: "/cartoons" },
                { label: "مقال", to: "/article" },
                { label: "الدراسات", to: "/studies" }
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-white hover:pr-2 transition-all block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-black border-r-4 border-red-600 pr-4">خدمات</h3>
            <ul className="space-y-5 text-blue-100/60 font-bold">
              {[
                { label: "عن حضرميديا", to: "/about" },
                { label: "فريق التحرير", to: "/team" },
                { label: "أعلن معنا", to: "/advertise" },
                { label: "سياسة الخصوصية", to: "/privacy" },
                { label: "شروط الاستخدام", to: "/terms" },
                { label: "اتصل بنا", to: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="hover:text-white hover:pr-2 transition-all block">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-8">
            <h3 className="text-xl font-black border-r-4 border-red-600 pr-4">النشرة البريدية</h3>
            <p className="text-blue-100/60 font-bold leading-7">اشترك في نشرتنا البريدية ليصلك كل جديد</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-blue-100/40">
          <p>جميع الحقوق محفوظة © 2024 حضرميديا</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <span className="text-white/5">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link>
            <span className="text-white/5">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">اتصل بنا</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
