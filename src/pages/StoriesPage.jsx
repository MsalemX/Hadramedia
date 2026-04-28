import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  BookOpen, Bell, ChevronLeft, Clock, User, Share2, Eye, Star, Users, Leaf, 
  Home, Camera, Palette, Info, HelpCircle, Image as ImageIcon, ChevronDown
} from 'lucide-react';

// Image Assets
const heroImg = "images/hero.png";
const adImg = "images/ad.png";
const portImg = "images/port.png";
const defaultImg = "images/image.jpg";

const categories = [
  { name: 'الكل', icon: BookOpen, active: true },
  { name: 'إنسان وقيم', icon: User },
  { name: 'شباب ومبادرات', icon: Users },
  { name: 'ثقافة وتراث', icon: Home },
  { name: 'قصص نجاح', icon: Star },
];

const featuredStory = {
  title: 'صياد الثمانين عاماً الذي لا يزال يحلم بالبحر',
  excerpt: 'حكاية رجل كرس حياته للبحر في مدينة الشحر، يواجه التحديات كل يوم بابتسامة وأمل لا ينتهي ليحكي لنا قصة الصمود.',
  category: 'قصة ملهمة',
  date: '20 مايو 2024',
  readTime: '8 دقائق قراءة',
  image: defaultImg
};

const stories = [
  { 
    title: 'حكاية بيت طيني عمره 300 عام في شبام', 
    category: 'ثقافة وتراث', 
    date: '19 مايو 2024', 
    excerpt: 'بيت قديم يحكي تاريخ عائلة عاشت فيه لأجيال متتالية في ناطحات السحاب الطينية.',
    image: heroImg 
  },
  { 
    title: 'معلم في قرية نائية.. يضيء دروب الأمل', 
    category: 'إنسان وقيم', 
    date: '17 مايو 2024', 
    excerpt: 'معلم رفض أن تغلبه الظروف، فاستمر في تعليم أطفال قريته رغم كل الصعاب المادية.',
    image: defaultImg 
  },
  { 
    title: 'شبان يطوّرون تطبيقاً لخدمة مدينة المكلا', 
    category: 'شباب ومبادرات', 
    date: '15 مايو 2024', 
    excerpt: 'مجموعة من الشباب الحضرمي أطلقوا تطبيقاً يحل مشاكل المواطنين اليومية تقنياً.',
    image: portImg 
  },
];

const StoriesPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col gap-4 mb-10">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
              <ChevronLeft size={14} />
              <span className="text-slate-600">قصص</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#e00013] rounded-full" />
              <h1 className="text-3xl font-black text-[#09264d]">قصص ميديا</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">تصنيفات القصص</h3>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <button key={i} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${cat.active ? 'bg-[#09264d] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} />
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    {cat.active ? <ChevronDown size={16} /> : <ChevronLeft size={16} className="opacity-30" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-8 border-r-4 border-red-600 pr-4">الأكثر قراءة</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((id) => (
                  <Link to={`/story/${id}`} key={id} className="flex gap-4 items-center group cursor-pointer block">
                    <div className="text-2xl font-black text-slate-200 group-hover:text-red-600 transition-colors shrink-0">0{id}</div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight group-hover:text-red-600 transition-colors">من بائع متجول إلى صاحب متجر ناجح</h4>
                      <span className="text-[9px] text-slate-400 font-bold mt-1 block">18 مايو 2024</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            
            {/* Featured Story */}
            <Link to="/story/1" className="relative rounded-[3rem] overflow-hidden h-[540px] group shadow-2xl block">
              <img src={featuredStory.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 right-0 left-0 p-12 text-white">
                <span className="bg-red-600 px-5 py-2 rounded-xl text-[10px] font-black mb-6 inline-block shadow-lg uppercase tracking-widest">قصة ملهمة</span>
                <h2 className="text-5xl font-black mb-6 leading-tight max-w-3xl drop-shadow-lg group-hover:text-red-400 transition-colors">{featuredStory.title}</h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed font-bold opacity-90">{featuredStory.excerpt}</p>
                
                <div className="flex items-center gap-10 text-xs font-black text-gray-400 border-t border-white/10 pt-8">
                   <div className="flex items-center gap-2">
                      <Clock size={18} className="text-red-600" />
                      <span>{featuredStory.readTime}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <ImageIcon size={18} className="text-red-600" />
                      <span>معرض صور</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Share2 size={18} className="text-red-600" />
                      <span>مشاركة القصة</span>
                   </div>
                </div>
              </div>
            </Link>

            {/* Stories Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {stories.map((story, i) => (
                 <Link to={`/story/${i + 2}`} key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col block">
                    <div className="relative h-64 overflow-hidden">
                       <img src={story.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                       <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#09264d] text-[9px] font-black py-2 px-5 rounded-xl shadow-lg uppercase tracking-widest">{story.category}</span>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                       <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-red-600 transition-colors">{story.title}</h3>
                       <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8 line-clamp-3">{story.excerpt}</p>
                       
                       <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                             <Clock size={14} />
                             <span>{story.date}</span>
                          </div>
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-[#09264d] group-hover:text-red-600 transition-colors uppercase tracking-widest">
                             اقرأ القصة <ChevronLeft size={14} />
                          </span>
                       </div>
                    </div>
                 </Link>
               ))}
            </section>

            {/* Newsletter Horizontal */}
            <section className="bg-white rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between border border-gray-100 shadow-sm gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                     <Bell size={32} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-[#09264d]">لا تفوت أي قصة ملهمة</h3>
                     <p className="text-slate-400 font-bold text-sm">اشترك لتصلك قصص النجاح والتراث مباشرة</p>
                  </div>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                  <input type="text" placeholder="بريدك الإلكتروني" className="bg-slate-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-red-600/5 w-full md:w-64" />
                  <button className="bg-red-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 whitespace-nowrap">اشترك</button>
               </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
