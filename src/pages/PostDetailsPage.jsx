import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Eye, Heart, MessageCircle, Share2, Bookmark, User, Send, ThumbsUp, MoreHorizontal } from 'lucide-react';

const PostDetailsPage = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(124);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'أحمد محمد',
      avatar: '/images/image.jpg',
      content: 'مقال رائع ومفيد جداً، شكراً على هذه التغطية الشاملة للحدث. نأمل أن نرى المزيد من هذه الأخبار الإيجابية.',
      date: 'منذ ساعتين',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      author: 'ريم محمد',
      avatar: '/images/image.jpg',
      content: 'أتفق تماماً مع ما ورد في الخبر، خطوة ممتازة في الاتجاه الصحيح.',
      date: 'منذ 5 ساعات',
      likes: 8,
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
      avatar: '/images/image.jpg', // dummy avatar
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
          <NavLink to="/" className="hover:text-blue-600">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <NavLink to="/events" className="hover:text-blue-600">أحداث</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600 truncate max-w-[200px]">تفاصيل الخبر</span>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest mb-4 inline-block">أحداث محلية</span>
          <h1 className="text-3xl md:text-4xl font-black text-[#09264d] leading-tight mb-6">
            تنمية حضرموت: مشاريع جديدة لتعزيز البنية التحتية ودعم الاقتصاد المحلي
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                <img src="/images/image.jpg" alt="Author" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
              </div>
              <span className="text-slate-800">محمد علي</span>
            </div>
            <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-400" /> 20 مايو 2024</span>
            <span className="flex items-center gap-1.5"><Eye size={16} className="text-slate-400" /> 12.5K مشاهدة</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={16} className="text-slate-400" /> {comments.length} تعليقات</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-10 shadow-lg h-[300px] md:h-[500px]">
          <img src="/images/hero.png" alt="Cover" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; }} />
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-10">
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none">
            <p className="text-xl text-slate-800 font-bold mb-6">
              تواصل الجهات الحكومية والجهات المحلية تنفيذ مشاريع تنموية في مختلف القطاعات تهدف إلى تحسين الخدمات وتوفير فرص العمل.
            </p>
            <p className="mb-6">
              وفي تصريح خاص، أكد محافظ المحافظة على أهمية تكاتف الجهود لتذليل الصعاب واستكمال المشاريع المتعثرة، مشيراً إلى أن السلطة المحلية تضع في سلم أولوياتها تحسين البنية التحتية الأساسية مثل شبكات الطرق والمياه والكهرباء.
            </p>
            <p className="mb-6">
              كما سيتم قريباً افتتاح عدد من المدارس والمراكز الصحية في المديريات النائية والتي ستقدم خدماتها لآلاف المواطنين الذين كانوا يعانون من نقص في هذه الخدمات الحيوية.
            </p>
            <h3 className="text-2xl font-black text-[#09264d] mt-10 mb-4">آفاق استثمارية جديدة</h3>
            <p className="mb-6">
              على صعيد آخر، دعت الغرفة التجارية المستثمرين المحليين والأجانب للاستفادة من التسهيلات المقدمة في المناطق الصناعية الجديدة، مؤكدة أن المرحلة القادمة ستشهد طفرة في قطاع الصناعات التحويلية.
            </p>
          </div>
        </div>

        {/* Engagement Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-12">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isLiked ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Heart size={20} className={isLiked ? 'fill-current' : ''} />
              <span>{likes}</span>
              <span className="hidden sm:inline">إعجاب</span>
            </button>
            <a href="#comments" className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-all">
              <MessageCircle size={20} />
              <span>{comments.length}</span>
              <span className="hidden sm:inline">تعليق</span>
            </a>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
              <Bookmark size={20} />
            </button>
            <button className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-black text-[#09264d] mb-8 flex items-center gap-3">
            <MessageCircle className="text-blue-600" />
            التعليقات ({comments.length})
          </h3>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-10 flex gap-4 items-start">
            <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center text-slate-400 mt-1">
              <User size={24} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="الاسم" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-300 transition-all outline-none"
                  required
                />
                <input 
                  type="email" 
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="البريد الإلكتروني" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-300 transition-all outline-none"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="أضف تعليقاً..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-300 transition-all outline-none resize-none min-h-[100px]"
                  required
                />
                <button
                  type="submit"
                  disabled={!newComment.trim() || !commentName.trim() || !commentEmail.trim()}
                  className="absolute left-4 bottom-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                >
                  <Send size={18} className="rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-3 md:gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                  <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-50 p-4 md:p-5 rounded-2xl rounded-tr-none">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-black text-slate-800">{comment.author}</h4>
                        <span className="text-[10px] text-slate-400 font-bold">{comment.date}</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {comment.content}
                    </p>
                  </div>

                  {/* Comment Actions */}
                  <div className="flex items-center gap-4 mt-2 px-2 text-xs font-bold text-slate-500">
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center gap-1.5 transition-colors ${comment.isLiked ? 'text-blue-600' : 'hover:text-blue-600'}`}
                    >
                      <ThumbsUp size={14} className={comment.isLiked ? 'fill-current' : ''} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="hover:text-slate-800 transition-colors">رد</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments.length > 0 && (
            <button className="w-full mt-8 py-3 bg-white border border-gray-200 rounded-xl text-slate-600 font-black hover:bg-slate-50 transition-colors text-sm">
              عرض المزيد من التعليقات
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default PostDetailsPage;
