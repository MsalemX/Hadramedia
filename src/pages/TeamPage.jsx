import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, User, Mail, Send, Globe, Search } from 'lucide-react';

const teamMembers = [
  {
    role: "رئيس التحرير",
    members: [
      { name: "د. عبدالله باطويل", title: "رئيس التحرير التنفيذي", image: "https://via.placeholder.com/150", bio: "خبير في الشؤون الاستراتيجية والصحافة الاستقصائية لأكثر من 20 عاماً." }
    ]
  },
  {
    role: "هيئة التحرير",
    members: [
      { name: "أ. مريم الكثيري", title: "مديرة التحرير", image: "https://via.placeholder.com/150", bio: "متخصصة في قضايا المجتمع والتعليم والإدارة المحلية." },
      { name: "محمد علي بن بريك", title: "سكرتير التحرير", image: "https://via.placeholder.com/150", bio: "خبرة في إدارة المحتوى الرقمي والتحقق من المصادر." },
      { name: "سالم العطاس", title: "محرر الشؤون الاقتصادية", image: "https://via.placeholder.com/150", bio: "محلل اقتصادي مهتم بشؤون الموانئ والطاقة في حضرموت." }
    ]
  },
  {
    role: "وحدة التحقيقات",
    members: [
      { name: "فريق التحقيق", title: "وحدة الصحافة الاستقصائية", image: "https://via.placeholder.com/150", bio: "مجموعة من الصحفيين المتخصصين في كشف ملفات الفساد والخدمات." }
    ]
  },
  {
    role: "المراسلون والمصورون",
    members: [
      { name: "أحمد بن طالب", title: "مراسل ميداني - سيئون", image: "https://via.placeholder.com/150" },
      { name: "سعيد باوزير", title: "مصور فوتوغرافي", image: "https://via.placeholder.com/150" },
      { name: "فاطمة العمودي", title: "مراسلة - المكلا", image: "https://via.placeholder.com/150" },
      { name: "خالد المحضار", title: "مراسل الشؤون الإنسانية", image: "https://via.placeholder.com/150" }
    ]
  }
];

const TeamPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Header Section */}
      <div className="bg-[#09264d] pt-20 pb-40 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">فريق التحرير</h1>
        <p className="text-blue-100 text-lg md:text-xl font-bold max-w-2xl mx-auto opacity-80 leading-relaxed">
          نخبة من الصحفيين والباحثين الملتزمين بنقل الحقيقة وخدمة المجتمع الحضرمي بمهنية عالية.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20">
        
        {/* Search/Filter (Optional UX) */}
        <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 mb-16 flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto">
          <div className="relative flex-1 w-full">
             <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <input type="text" placeholder="ابحث عن عضو في الفريق..." className="w-full bg-slate-50 border-none rounded-2xl pr-12 pl-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 transition-all outline-none" />
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-red-900/20 w-full md:w-auto">بـحـث</button>
        </div>

        {/* Team Sections */}
        {teamMembers.map((section, idx) => (
          <div key={idx} className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-8 bg-red-600 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-black text-[#09264d]">{section.role}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.members.map((member, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] overflow-hidden bg-slate-100 shadow-inner shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#09264d] group-hover:text-red-600 transition-colors">{member.name}</h3>
                      <p className="text-red-600 text-xs font-black uppercase tracking-widest mt-1">{member.title}</p>
                    </div>
                  </div>
                  
                  {member.bio && (
                    <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8 italic">
                      "{member.bio}"
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex gap-3">
                      <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Send size={18} />
                      </button>
                      <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-900 hover:text-white transition-all shadow-sm">
                        <Globe size={18} />
                      </button>
                      <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <Mail size={18} />
                      </button>
                    </div>
                    <button className="text-[10px] font-black text-[#09264d] hover:text-red-600 transition-all flex items-center gap-1 uppercase tracking-tighter">
                      عرض الملف <ChevronLeft size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Join Us CTA */}
        <div className="bg-[#e00013] rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-red-900/30 relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-6">هل تملك الموهبة والشغف؟</h2>
              <p className="text-red-100 text-lg font-bold max-w-2xl mx-auto mb-10 opacity-90">
                نحن نبحث دائماً عن المبدعين والمتحمسين للانضمام إلى فريقنا. أرسل سيرتك الذاتية ونماذج من أعمالك.
              </p>
              <button className="bg-white text-red-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-xl">تقدم بطلب انضمام</button>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
