import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Share2, MousePointer2, Volume2, Info, ArrowDown, MessageSquare, User, Send, ThumbsUp, Heart } from 'lucide-react';

const CrossMediaDetailsPage = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef(null);

  const sections = [
    {
      title: "مقدمة: شريان الاقتصاد النابض",
      content: "تعتبر الموانئ اليمنية، وعلى رأسها ميناء عدن وميناء المكلا، من أهم الركائز الاقتصادية التي يعتمد عليها اليمن في استيراد السلع الأساسية وتصدير المنتجات المحلية. في هذا التقرير التفاعلي، نغوص في أعماق هذا القطاع الحيوي لنكتشف الفرص والتحديات.",
      image: "/images/port.png",
      overlay: "bg-black/60"
    },
    {
      title: "الأهمية الاستراتيجية والموقع الجغرافي",
      content: "يقع اليمن في ملتقى طرق التجارة العالمية، حيث يشرف على مضيق باب المندب، أحد أهم الممرات المائية في العالم. هذا الموقع يمنح الموانئ اليمنية ميزة تنافسية فريدة إذا ما تم استغلالها بالشكل الأمثل وتطوير بنيتها التحتية لتواكب المعايير الدولية.",
      image: "/images/hero.png",
      overlay: "bg-blue-900/70"
    },
    {
      title: "التحديات اللوجستية والتقنية",
      content: "رغم الأهمية الكبيرة، تعاني الموانئ من نقص في الرافعات الحديثة وأنظمة الإدارة الرقمية، مما يؤدي إلى تأخر في تفريغ الشحنات وزيادة التكاليف اللوجستية. الإصلاح المؤسسي والتقني هو المفتاح لتحويل هذه الموانئ إلى مراكز إقليمية للتجارة.",
      image: "/images/image.jpg",
      overlay: "bg-red-900/60"
    },
    {
      title: "خارطة الطريق نحو التعافي",
      content: "توصي الدراسات الحديثة بضرورة فتح باب الاستثمار للقطاع الخاص وتفعيل الشراكات الدولية لتحديث الموانئ. إن تحويل الموانئ إلى مناطق حرة صناعية وتجارية سيساهم في خلق آلاف فرص العمل ورفد الخزينة العامة بموارد مستدامة.",
      image: "/images/ad.png",
      overlay: "bg-slate-900/80"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll('.report-section');
      let currentSection = 0;
      
      sectionElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          currentSection = index;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Comments State (Mock)
  const [likes, setLikes] = useState(1240);
  const [comments, setComments] = useState([
    { id: 1, author: 'صالح بن علي', content: 'تقرير مذهل وتفاعلي جداً، طريقة العرض تجعل المعلومة تصل بسلاسة.', date: 'منذ يوم' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;
    setComments([{ id: Date.now(), author: name, content: newComment, date: 'الآن' }, ...comments]);
    setNewComment('');
  };

  return (
    <div className="bg-[#09264d] min-h-screen font-cairo text-white overflow-x-hidden" dir="rtl">
      
      {/* Background Image Layer (Fixed) */}
      <div className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out">
        {sections.map((section, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSection ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={section.image} alt="" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 transition-colors duration-1000 ${section.overlay}`} />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 right-0 left-0 h-1 z-50 bg-white/10">
        <div 
          className="h-full bg-red-600 transition-all duration-300 ease-out"
          style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
        />
      </div>

      {/* Navigation Overlay */}
      <div className="fixed top-8 right-8 left-8 z-40 flex justify-between items-center pointer-events-none">
        <NavLink to="/reports" className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 pointer-events-auto hover:bg-white/20 transition-all">
          <ChevronLeft size={24} className="rotate-180 md:rotate-0" />
        </NavLink>
        <div className="flex gap-4 pointer-events-auto">
          <button className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-red-600 transition-all">
            <Share2 size={20} />
          </button>
          <button className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-blue-600 transition-all">
            <Volume2 size={20} />
          </button>
        </div>
      </div>

      {/* Sections Container */}
      <div className="relative z-10">
        
        {/* Intro Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <span className="bg-red-600 px-6 py-2 rounded-full text-xs font-black mb-8 inline-block shadow-xl animate-bounce">تقرير كروس ميديا</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight drop-shadow-2xl">
              الموانئ اليمنية: <br/>
              <span className="text-red-500">حكاية الصمود والفرص الضائعة</span>
            </h1>
            <div className="flex items-center justify-center gap-8 text-sm font-bold opacity-70 mb-12">
              <span className="flex items-center gap-2"><Clock size={18} /> 10 دقائق قراءة</span>
              <span className="flex items-center gap-2"><MousePointer2 size={18} /> تقرير تفاعلي</span>
            </div>
            <div className="flex flex-col items-center gap-4 animate-pulse">
               <span className="text-xs font-bold uppercase tracking-[0.2em]">اسحب للأسفل للبدء</span>
               <ArrowDown size={32} className="text-red-500" />
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {sections.map((section, index) => (
          <section 
            key={index} 
            className="report-section min-h-screen flex items-center justify-start px-6 md:px-24 py-32"
          >
            <div className="max-w-2xl bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl transform transition-all duration-700 hover:bg-white/10">
              <span className="text-red-500 font-black text-xs mb-4 block uppercase tracking-widest">الجزء 0{index + 1}</span>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">{section.title}</h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-90 mb-10 text-justify">
                {section.content}
              </p>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <Info size={24} className="text-red-500 shrink-0" />
                 <p className="text-sm font-bold opacity-60">اضغط على العناصر التفاعلية في الصورة الجانبية لمزيد من المعلومات (قريباً)</p>
              </div>
            </div>
          </section>
        ))}

        {/* Ending Section with Comments */}
        <section className="min-h-screen bg-[#061935] relative px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
               <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-900/50 rotate-12">
                  <Heart size={40} className="text-white fill-current" />
               </div>
               <h2 className="text-4xl md:text-6xl font-black mb-6 italic">نهاية التقرير</h2>
               <p className="text-xl text-blue-200 font-bold max-w-2xl mx-auto">نأمل أن يكون هذا التقرير قد سلط الضوء على جوانب خفية من واقع موانئنا. رأيك يهمنا في تطوير محتوانا القادم.</p>
            </div>

            {/* Comments & Interaction */}
            <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl">
               <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
                  <MessageSquare size={32} className="text-red-500" />
                  نقاش التقرير ({comments.length})
               </h3>

               {/* Add Comment Form */}
               <form onSubmit={handleAddComment} className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <input 
                        type="text" 
                        placeholder="الاسم" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all font-bold" 
                     />
                     <input 
                        type="email" 
                        placeholder="البريد الإلكتروني" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all font-bold" 
                     />
                  </div>
                  <div className="relative">
                     <textarea 
                        placeholder="اكتب انطباعك عن التقرير..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 outline-none focus:border-red-500 transition-all font-bold min-h-[150px] resize-none"
                     />
                     <button className="absolute left-6 bottom-6 bg-red-600 hover:bg-red-700 p-4 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-95">
                        <Send size={24} className="rtl:-scale-x-100" />
                     </button>
                  </div>
               </form>

               {/* Comments List */}
               <div className="space-y-8">
                  {comments.map(comment => (
                     <div key={comment.id} className="flex gap-6 items-start group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-red-500 transition-colors">
                           <User size={30} className="text-white/40" />
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-black text-red-500">{comment.author}</h4>
                              <span className="text-[10px] font-bold opacity-40">{comment.date}</span>
                           </div>
                           <p className="text-lg opacity-80 leading-relaxed font-medium">{comment.content}</p>
                           <div className="flex gap-4 mt-4">
                              <button className="flex items-center gap-1.5 text-xs font-bold opacity-40 hover:opacity-100 hover:text-red-500 transition-all">
                                 <ThumbsUp size={14} /> 12
                              </button>
                              <button className="text-xs font-bold opacity-40 hover:opacity-100 transition-all">رد</button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CrossMediaDetailsPage;
