import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Eye, Heart, MessageSquare, Share2, Bookmark, User, Send, ThumbsUp, MoreHorizontal, BarChart3, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReaderTools from '../components/ReaderTools';

const StatisticsDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        setLoading(true);
        // Fetch post
        const { data: postData, error: postError } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .eq('status', 'منشور')
          .single();

        if (postError) throw postError;
        setPost(postData);
        setLikes(postData.views_count ? Math.floor(postData.views_count / 15) : 0);

        // Fetch comments
        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', id)
          .order('created_at', { ascending: false });

        setComments(commentsData || []);

        // Increment views
        await supabase.rpc('increment_views', { post_id: id }).catch(() => {
          supabase.from('news').update({ views_count: (postData.views_count || 0) + 1 }).eq('id', id);
        });

      } catch (err) {
        console.error("Error fetching statistics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatisticsData();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commentName.trim() || !commentEmail.trim()) return;
    
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
      console.error("Error adding comment:", err);
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
          <h1 className="text-2xl font-black text-[#09264d] mb-4">الإحصائية غير موجودة</h1>
          <NavLink to="/polls" className="text-red-600 font-bold hover:underline">العودة لصفحة الاستطلاعات</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-4xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8">
          <NavLink to="/" className="hover:text-blue-600 transition-colors">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <NavLink to="/polls" className="hover:text-blue-600 transition-colors">استطلاعات</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600 truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Header */}
        <div className="mb-10 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#e00013] text-white px-4 py-2 rounded-xl text-xs font-black shadow-sm uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={14} /> {post.category || 'استطلاع رأي'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#09264d] leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-slate-500 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <span className="flex items-center gap-2"><Calendar size={18} className="text-red-600" /> النشر: {new Date(post.created_at).toLocaleDateString('ar-YE')}</span>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <span className="flex items-center gap-2"><Eye size={18} className="text-red-600" /> {post.views_count || 0} مشاهدة</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[3rem] overflow-hidden mb-12 shadow-2xl h-[400px] md:h-[600px] relative group border-4 border-white">
          <img src={post.main_image || "/images/hero.png"} alt="Cover" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        </div>

        {/* Content */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-gray-100 mb-12 relative overflow-hidden">
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none relative z-10 article-content"
               dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        <ReaderTools />

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
              <MessageSquare size={20} />
              <span>{comments.length}</span>
              <span className="hidden sm:inline">مشاركة رأي</span>
            </a>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all">
              <Bookmark size={20} />
            </button>
            <button className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all hover:text-[#09264d]">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="bg-white rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-100">
          <h3 className="text-3xl font-black text-[#09264d] mb-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            آراء المشاركين ({comments.length})
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
                  placeholder="أضف رأيك حول نتائج هذا الاستطلاع..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-red-600/10 focus:border-red-300 transition-all outline-none resize-none min-h-[120px]"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingComment || !newComment.trim() || !commentName.trim() || !commentEmail.trim()}
                  className="absolute left-4 bottom-4 bg-[#09264d] hover:bg-blue-900 disabled:bg-slate-300 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-900/30"
                >
                  {submittingComment ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="rtl:-scale-x-100" />}
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden flex items-center justify-center shadow-sm">
                  <User size={24} className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-50/80 p-5 md:p-6 rounded-[2rem] rounded-tr-none border border-gray-100/50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-sm font-black text-[#09264d]">{comment.author_name}</h4>
                        <span className="text-[10px] text-slate-400 font-bold">{new Date(comment.created_at).toLocaleDateString('ar-YE')}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-400 font-bold py-10">لا توجد آراء بعد. كن أول من يشارك!</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StatisticsDetailsPage;
