import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Eye, Heart, MessageCircle, Share2, Bookmark, User, Send, ThumbsUp, MoreHorizontal, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const StoryDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchStoryData();
  }, [id]);

  const fetchStoryData = async () => {
    try {
      setLoading(true);
      // Fetch post (only published)
      const { data: postData, error: postError } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .eq('status', 'منشور')
        .single();

      if (postError) throw postError;
      setPost(postData);

      // Fetch comments
      try {
        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', id)
          .order('created_at', { ascending: false });
        setComments(commentsData || []);
      } catch (e) {}

      // Increment views safely
      await supabase.rpc('increment_views', { post_id: id });

    } catch (err) {
      console.error("Error fetching story data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const { error } = await supabase.rpc('increment_likes', { post_id: id });
      if (error) {
         console.error("Like error:", error);
         return;
      }
      setPost(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    } catch (err) {
      console.error("Like failure:", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commentName.trim()) return;
    
    try {
      setSubmittingComment(true);
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          post_id: id,
          author_name: commentName,
          author_email: commentEmail,
          content: newComment
        }])
        .select()
        .single();

      if (error) throw error;
      setComments([data, ...comments]);
      setNewComment('');
      setCommentName('');
      setCommentEmail('');
    } catch (err) {
      alert("لا يمكن إضافة تعليق حالياً.");
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] flex items-center justify-center font-cairo" dir="rtl">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] flex items-center justify-center font-cairo" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#09264d] mb-4">القصة غير موجودة أو لا تزال مسودة</h1>
          <NavLink to="/" className="text-red-600 font-bold hover:underline">العودة للرئيسية</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-4xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8">
          <NavLink to="/" className="hover:text-red-600 transition-colors">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600 truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Story Header */}
        <div className="mb-8 text-center">
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest mb-6 inline-block">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#09264d] leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-slate-500 border-y border-gray-200 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <span className="text-slate-800 text-base">أسرة التحرير</span>
            </div>
            <span className="flex items-center gap-2"><Clock size={18} className="text-red-500" /> {new Date(post.created_at).toLocaleDateString('ar-YE')}</span>
            <span className="flex items-center gap-2"><Eye size={18} className="text-red-500" /> {post.views || 0} مشاهدة</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[3rem] overflow-hidden mb-12 shadow-2xl h-[400px] md:h-[600px] relative group">
          <img src={post.main_image || "/images/hero.png"} alt="Cover" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-gray-100 mb-12 relative overflow-hidden">
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none relative z-10 article-content"
               dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Engagement Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 mb-16">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${post.likes > 0 ? 'bg-red-50 text-red-600 shadow-inner' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Heart size={20} className={post.likes > 0 ? 'fill-current' : ''} />
              <span>{post.likes || 0}</span>
              <span className="hidden sm:inline">إعجاب</span>
            </button>
            <a href="#comments" className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl font-bold transition-all">
              <MessageCircle size={20} />
              <span>{comments.length}</span>
              <span className="hidden sm:inline">تعليق</span>
            </a>
          </div>
          <div className="flex gap-2">
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
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 outline-none"
                  required
                />
                <input 
                  type="email" 
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="البريد الإلكتروني" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 outline-none"
                />
              </div>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="شاركنا رأيك..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-5 text-sm font-bold text-slate-700 focus:ring-4 outline-none resize-none min-h-[120px]"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="absolute left-4 bottom-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white p-3 rounded-xl transition-all"
                >
                  {submittingComment ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="rtl:-scale-x-100" />}
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            {comments.length > 0 ? comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 flex items-center justify-center text-slate-400">
                  <User size={24} />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-50/80 p-5 md:p-6 rounded-[2rem] rounded-tr-none border border-gray-100/50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-sm font-black text-[#09264d]">{comment.author_name}</h4>
                        <span className="text-[10px] text-slate-400 font-bold">{new Date(comment.created_at).toLocaleDateString('ar-YE')}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-400 font-bold py-10">لا توجد تعليقات بعد.</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StoryDetailsPage;
