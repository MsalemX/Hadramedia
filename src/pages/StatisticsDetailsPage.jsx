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
        // Try fetching from news table first
        let { data: postData, error: postError } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        let sourceTable = 'news';

        // If not found in news, try the polls table
        if (postError || !postData) {
          const { data: pollData, error: pollError } = await supabase
            .from('polls')
            .select('*')
            .eq('id', id)
            .single();

          if (pollError) throw pollError;
          postData = pollData;
          sourceTable = 'polls';
        }

        setPost(postData);
        setLikes(postData.views_count ? Math.floor(postData.views_count / 15) : 0);

        // Fetch comments (unified for both)
        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', id)
          .order('created_at', { ascending: false });

        setComments(commentsData || []);

        // Increment views for the correct table
        await supabase.from(sourceTable)
          .update({ views_count: (postData.views_count || 0) + 1 })
          .eq('id', id);

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
      {/* Hero Header Section - Full Width Image */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <img 
          src={post.main_image || "/images/hero.png"} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
        />
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09264d] via-[#09264d]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Top Navigation Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 z-30">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-white/80 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <NavLink to="/" className="hover:text-white transition-colors">الرئيسية</NavLink>
              <ChevronLeft size={14} className="opacity-50" />
              <NavLink to="/polls" className="hover:text-white transition-colors">استطلاعات</NavLink>
              <ChevronLeft size={14} className="opacity-50" />
              <span className="text-white truncate max-w-[150px] md:max-w-[300px]">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Title and Meta Section */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center gap-3">
                <span className="bg-[#e00013] text-white px-5 py-2.5 rounded-2xl text-[10px] md:text-xs font-black shadow-2xl shadow-red-600/40 uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 size={16} /> {post.category || 'استطلاع رأي'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight md:leading-[1.1] drop-shadow-2xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs md:text-sm font-black text-white/90 pt-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
                  <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <User size={16} className="text-white" />
                  </div>
                  <span>بواسطة: {post.author || 'هيئة التحرير'}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
                  <div className="w-8 h-8 bg-[#09264d] rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar size={16} className="text-white" />
                  </div>
                  <span>{new Date(post.created_at).toLocaleDateString('ar-YE')}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
                  <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye size={16} className="text-white" />
                  </div>
                  <span>{post.views_count || 0} مشاهدة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* Content Card */}
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-gray-100 mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50/50 rounded-bl-[4rem] -z-10 group-hover:scale-110 transition-transform" />
          
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none relative z-10 article-content"
               dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        <ReaderTools />

        {/* Engagement Actions */}
        <div className="flex flex-wrap items-center justify-between gap-6 bg-white rounded-[2.5rem] p-5 shadow-xl shadow-slate-200/50 border border-gray-100 mb-16">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all ${isLiked ? 'bg-red-50 text-red-600 shadow-inner' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Heart size={22} className={isLiked ? 'fill-current' : ''} />
              <span className="text-lg">{likes}</span>
              <span className="hidden sm:inline">إعجاب</span>
            </button>
            <a href="#comments" className="flex items-center gap-3 px-8 py-4 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl font-black transition-all">
              <MessageSquare size={22} />
              <span className="text-lg">{comments.length}</span>
              <span className="hidden sm:inline">مشاركة رأي</span>
            </a>
          </div>
          <div className="flex gap-3">
            <button className="p-4 bg-slate-50 text-slate-400 hover:text-[#09264d] hover:bg-white hover:shadow-lg rounded-2xl transition-all border border-transparent hover:border-gray-100">
              <Bookmark size={24} />
            </button>
            <button className="p-4 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all border border-transparent hover:border-gray-100">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-slate-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black text-[#09264d] flex items-center gap-5">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center shadow-inner">
                <MessageSquare size={32} />
              </div>
              آراء المشاركين ({comments.length})
            </h3>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-16 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center text-slate-400 mt-1 shadow-inner border border-gray-100">
                <User size={32} />
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="الاسم الكامل" 
                    className="w-full bg-slate-50/50 border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-black text-slate-700 focus:ring-4 focus:ring-red-600/5 focus:border-red-400/30 transition-all outline-none"
                    required
                  />
                  <input 
                    type="email" 
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    placeholder="البريد الإلكتروني" 
                    className="w-full bg-slate-50/50 border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-black text-slate-700 focus:ring-4 focus:ring-red-600/5 focus:border-red-400/30 transition-all outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="أضف رأيك حول نتائج هذا الاستطلاع..."
                    className="w-full bg-slate-50/50 border border-gray-200 rounded-[2rem] px-8 py-6 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-red-600/5 focus:border-red-400/30 transition-all outline-none resize-none min-h-[160px]"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submittingComment || !newComment.trim() || !commentName.trim() || !commentEmail.trim()}
                    className="absolute left-5 bottom-5 bg-[#09264d] hover:bg-red-600 disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-900/30 flex items-center gap-2"
                  >
                    {submittingComment ? <Loader2 size={20} className="animate-spin" /> : (
                      <>
                        إرسال الآن <Send size={20} className="rtl:-scale-x-100" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-8">
            {comments.length > 0 ? comments.map(comment => (
              <div key={comment.id} className="flex gap-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center shadow-sm border border-gray-50">
                  <User size={28} className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-50/40 p-6 md:p-8 rounded-[2.5rem] rounded-tr-none border border-gray-100/50 relative group">
                    <div className="absolute top-4 left-6 opacity-20 group-hover:opacity-40 transition-opacity">
                      <MessageSquare size={40} className="text-[#09264d]" />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <h4 className="text-base font-black text-[#09264d]">{comment.author_name}</h4>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(comment.created_at).toLocaleDateString('ar-YE')}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base font-medium leading-loose relative z-10">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-gray-200">
                <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-black text-lg">لا توجد آراء بعد. كن أول من يشارك!</p>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StatisticsDetailsPage;
