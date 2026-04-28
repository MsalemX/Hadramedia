import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Eye, Heart, MessageCircle, Share2, Bookmark, User, Send, ThumbsUp, MoreHorizontal, FileSearch, ShieldAlert } from 'lucide-react';

const InvestigationDetailsPage = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(580);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'علي صالح',
      avatar: '/images/image.jpg',
      content: 'تحقيق جريء يكشف حقائق خطيرة. نتمنى أن تصل هذه الأصوات للجهات المعنية بأسرع وقت.',
      date: 'منذ 3 ساعات',
      likes: 45,
      isLiked: false
    }
  ]);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commentName.trim() || !commentEmail.trim()) return;
    
    const comment = {
      id: comments.length + 1,
      author: commentName,
      avatar: '/images/image.jpg',
      content: newComment,
      date: 'الآن',
      likes: 0,
      isLiked: false
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setCommentName('');
    setCommentEmail('');
  };

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-4xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8">
          <NavLink to="/" className="hover:text-blue-600 transition-colors">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <NavLink to="/investigation" className="hover:text-blue-600 transition-colors">تحقيق</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600 truncate max-w-[200px]">تفاصيل التحقيق</span>
        </div>

        {/* Header */}
        <div className="mb-10 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-sm uppercase tracking-widest flex items-center gap-2">
              <FileSearch size={14} /> تحقيق رئيسي
            </span>
            <span className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-black shadow-sm uppercase tracking-widest">
              ملف خاص
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#09264d] leading-tight mb-8">
            أين تذهب أموال النظافة؟.. كشف المستور في ملف الخدمات العامة
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-slate-500 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shadow-inner border border-gray-100">
                <img src="/images/image.jpg" alt="Author" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">بواسطة</span>
                <span className="text-[#09264d] font-black text-base">فريق التحقيق الاستقصائي</span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <span className="flex items-center gap-2"><Clock size={18} className="text-red-600" /> وقت القراءة: 28 دقيقة</span>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <span className="flex items-center gap-2"><Eye size={18} className="text-red-600" /> 3,240 مشاهدة</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[3rem] overflow-hidden mb-12 shadow-2xl h-[400px] md:h-[600px] relative group border-4 border-white">
          <img src="/images/port.png" alt="Cover" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09264d]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-10">
            <div className="flex items-center gap-3 text-white bg-red-600/90 backdrop-blur-sm px-6 py-3 rounded-2xl font-black text-sm">
              <ShieldAlert size={20} />
              <span>يحتوي على وثائق حصرية</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-gray-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full -translate-y-32 -translate-x-32 blur-3xl"></div>
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none relative z-10">
            <p className="text-2xl text-[#09264d] font-black mb-8 leading-relaxed">
              تحقيق ميداني يكشف عن تجاوزات في عقود النظافة والنقل، وتقصير رقابي خلف ملايين الدولارات دون تحسن في الخدمة.
            </p>
            <p className="mb-6">
              على مدى ستة أشهر، تتبع فريق التحقيق مسار الأموال المخصصة لقطاع النظافة والتحسين في كبرى المدن. حصلنا على وثائق حصرية تثبت وجود تلاعب في المناقصات وتوقيع عقود مع شركات وهمية.
            </p>
            <div className="bg-slate-50 border-r-4 border-[#09264d] p-8 rounded-l-2xl my-10 shadow-inner">
              <h3 className="text-xl font-black text-[#09264d] mb-4 flex items-center gap-2">
                <FileSearch className="text-red-600" />
                أبرز النتائج التي توصل إليها التحقيق:
              </h3>
              <ul className="list-disc list-inside space-y-3 text-slate-600 font-bold">
                <li>إهدار أكثر من 5 ملايين دولار في عقود وهمية خلال العامين الماضيين.</li>
                <li>استخدام معدات وآليات حكومية لصالح مقاولين من الباطن.</li>
                <li>تغاضي الجهات الرقابية عن تقارير الأداء الكارثية.</li>
              </ul>
            </div>
            <p className="mb-6">
              ورغم المحاولات المتكررة للتواصل مع مدراء الصناديق المعنية، إلا أننا لم نتلق أي رد يوضح أين ذهبت تلك المبالغ الضخمة، في حين لا تزال شوارع المدن تعاني من تراكم المخلفات بشكل غير مسبوق.
            </p>
          </div>
        </div>

        {/* Engagement Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 mb-16">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${isLiked ? 'bg-red-50 text-red-600 shadow-inner' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Heart size={20} className={isLiked ? 'fill-current' : ''} />
              <span>{likes}</span>
              <span className="hidden sm:inline">إعجاب</span>
            </button>
            <a href="#comments" className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl font-bold transition-all">
              <MessageCircle size={20} />
              <span>{comments.length}</span>
              <span className="hidden sm:inline">تعليق</span>
            </a>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all">
              <Bookmark size={20} />
            </button>
            <button className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all hover:text-blue-600">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="bg-[#09264d] rounded-[3rem] p-6 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
          
          <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
              <MessageCircle size={24} />
            </div>
            النقاشات ({comments.length})
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-12 flex gap-4 items-start relative z-10">
            <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-white/5 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center text-white/50 mt-1 shadow-inner backdrop-blur-sm">
              <User size={28} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="الاسم" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white placeholder-white/40 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none backdrop-blur-sm"
                  required
                />
                <input 
                  type="email" 
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="البريد الإلكتروني" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white placeholder-white/40 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none backdrop-blur-sm"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="شارك برأيك أو بمعلوماتك حول هذا التحقيق..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold text-white placeholder-white/40 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none min-h-[120px] backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={!newComment.trim() || !commentName.trim() || !commentEmail.trim()}
                  className="absolute left-4 bottom-4 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/30 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-600/30"
                >
                  <Send size={20} className="rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6 relative z-10">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 shrink-0 overflow-hidden shadow-sm border border-white/5">
                  <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 p-5 md:p-6 rounded-[2rem] rounded-tr-none border border-white/10 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-sm font-black text-white">{comment.author}</h4>
                        <span className="text-[10px] text-blue-200 font-bold">{comment.date}</span>
                      </div>
                      <button className="text-white/40 hover:text-white transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <p className="text-blue-50 text-sm font-medium leading-relaxed opacity-90">
                      {comment.content}
                    </p>
                  </div>
                  
                  {/* Comment Actions */}
                  <div className="flex items-center gap-5 mt-3 px-3 text-xs font-black text-white/50">
                    <button 
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center gap-1.5 transition-all ${comment.isLiked ? 'text-blue-400 scale-105' : 'hover:text-blue-400'}`}
                    >
                      <ThumbsUp size={14} className={comment.isLiked ? 'fill-current' : ''} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="hover:text-white transition-colors">رد</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {comments.length > 0 && (
            <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black hover:bg-white/10 transition-colors text-sm shadow-sm relative z-10">
              عرض المزيد من النقاشات
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default InvestigationDetailsPage;
