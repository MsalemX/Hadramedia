import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Eye, Heart, MessageCircle, Share2, Bookmark, User, Send, ThumbsUp, MoreHorizontal, Image as ImageIcon } from 'lucide-react';

const StoryDetailsPage = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(342);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'محمد سالم',
      avatar: '/images/image.jpg',
      content: 'قصة ملهمة حقاً، تدفعنا للتفكير في تراثنا وقيمنا الجميلة.',
      date: 'منذ ساعتين',
      likes: 24,
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
          <NavLink to="/" className="hover:text-red-600 transition-colors">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <NavLink to="/stories" className="hover:text-red-600 transition-colors">قصص</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600 truncate max-w-[200px]">تفاصيل القصة</span>
        </div>

        {/* Story Header */}
        <div className="mb-8 text-center">
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest mb-6 inline-block">قصة ملهمة</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#09264d] leading-tight mb-8">
            صياد الثمانين عاماً الذي لا يزال يحلم بالبحر
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-slate-500 border-y border-gray-200 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm">
                <img src="/images/image.jpg" alt="Author" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
              </div>
              <span className="text-slate-800 text-base">سعيد باحارثة</span>
            </div>
            <span className="flex items-center gap-2"><Clock size={18} className="text-red-500" /> 20 مايو 2024</span>
            <span className="flex items-center gap-2"><Eye size={18} className="text-red-500" /> 8 دقائق قراءة</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[3rem] overflow-hidden mb-12 shadow-2xl h-[400px] md:h-[600px] relative group">
          <img src="/images/hero.png" alt="Cover" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-8">
            <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/30 transition-colors">
              <ImageIcon size={18} /> عرض المعرض
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-gray-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none relative z-10">
            <p className="text-2xl text-[#09264d] font-black mb-8 leading-relaxed">
              حكاية رجل كرس حياته للبحر في مدينة الشحر، يواجه التحديات كل يوم بابتسامة وأمل لا ينتهي ليحكي لنا قصة الصمود.
            </p>
            <p className="mb-6">
              منذ نعومة أظافره، لم يعرف العم سالمين سوى رائحة الملح وصوت الأمواج. وفي الثمانين من عمره، لا يزال يستيقظ قبل الفجر بوقت طويل، يجهز شباكه وقاربه الصغير ليخوض رحلة يومية محفوفة بالمخاطر والتحديات.
            </p>
            <blockquote className="border-r-4 border-red-600 pr-6 my-10 py-2 bg-red-50/50 rounded-l-2xl">
              <p className="text-xl font-bold text-slate-800 italic m-0">"البحر ليس مجرد ماء وأسماك، البحر هو الحياة وهو المعلم الذي علمني الصبر والرضا"</p>
            </blockquote>
            <p className="mb-6">
              يقول الكثيرون في الشحر أن العم سالمين يمثل الروح الحقيقية للصياد الحضرمي الذي لا يستسلم أبداً. فرغم قلة الصيد في بعض المواسم، إلا أنه يعود دائماً بشيء، حتى لو كان مجرد الرضا عن النفس والأمل بيوم أفضل.
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
            <button className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all hover:text-red-600">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="bg-white rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-100">
          <h3 className="text-3xl font-black text-[#09264d] mb-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <MessageCircle size={24} />
            </div>
            التعليقات ({comments.length})
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-12 flex gap-4 items-start">
            <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center text-slate-400 mt-1 shadow-inner">
              <User size={28} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="الاسم" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-red-600/10 focus:border-red-300 transition-all outline-none"
                  required
                />
                <input 
                  type="email" 
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="البريد الإلكتروني" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-red-600/10 focus:border-red-300 transition-all outline-none"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="شاركنا رأيك في هذه القصة..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-red-600/10 focus:border-red-300 transition-all outline-none resize-none min-h-[120px]"
                  required
                />
                <button
                  type="submit"
                  disabled={!newComment.trim() || !commentName.trim() || !commentEmail.trim()}
                  className="absolute left-4 bottom-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white p-3 rounded-xl transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
                >
                  <Send size={20} className="rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden shadow-sm">
                  <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-50/80 p-5 md:p-6 rounded-[2rem] rounded-tr-none border border-gray-100/50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-sm font-black text-[#09264d]">{comment.author}</h4>
                        <span className="text-[10px] text-slate-400 font-bold">{comment.date}</span>
                      </div>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  
                  {/* Comment Actions */}
                  <div className="flex items-center gap-5 mt-3 px-3 text-xs font-black text-slate-400">
                    <button 
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center gap-1.5 transition-all ${comment.isLiked ? 'text-red-600 scale-105' : 'hover:text-red-600'}`}
                    >
                      <ThumbsUp size={14} className={comment.isLiked ? 'fill-current' : ''} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="hover:text-[#09264d] transition-colors">رد</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {comments.length > 0 && (
            <button className="w-full mt-10 py-4 bg-white border-2 border-red-50 rounded-2xl text-red-600 font-black hover:bg-red-50 transition-colors text-sm shadow-sm">
              عرض المزيد من التعليقات
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default StoryDetailsPage;
