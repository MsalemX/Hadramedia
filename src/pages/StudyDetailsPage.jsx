import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Heart, MessageSquare, Share2, Bookmark, User, Send, ThumbsUp, MoreHorizontal, Download, FileText, BookOpen, Clock, Tag, Loader2, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReaderTools from '../components/ReaderTools';

const StudyDetailsPage = () => {
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
    const fetchStudyData = async () => {
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
        setLikes(postData.views_count ? Math.floor(postData.views_count / 14) : 0);

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
        console.error("Error fetching study data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();
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
          <h1 className="text-2xl font-black text-[#09264d] mb-4">الدراسة غير موجودة</h1>
          <NavLink to="/studies" className="text-red-600 font-bold hover:underline">العودة لصفحة الدراسات</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8">
          <NavLink to="/" className="hover:text-blue-600 transition-colors">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <NavLink to="/studies" className="hover:text-blue-600 transition-colors">الدراسات والأبحاث</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600 truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Study Header Block */}
        <div className="bg-[#09264d] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row mb-12 border border-white/5 relative">
          <div className="md:w-1/3 relative overflow-hidden bg-black/20 p-10 flex flex-col items-center justify-center">
             <div className="relative shadow-2xl shadow-black/50 mb-6">
                <img src={post.main_image || "/images/port.png"} className="w-56 h-72 object-cover rounded-lg border-l-8 border-red-600 shadow-2xl" alt="Study Cover" />
             </div>
             {post.pdf_url && (
               <div className="w-full space-y-3">
                 <a 
                   href={post.pdf_url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full bg-white text-[#09264d] font-black py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 hover:bg-blue-50"
                 >
                    <BookOpen size={20} /> قراءة الدراسة الآن
                 </a>
                 <a 
                   href={post.pdf_url} 
                   download 
                   className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3"
                 >
                    <Download size={20} /> تحميل الملف PDF
                 </a>
               </div>
             )}
          </div>
          
          <div className="md:w-2/3 p-10 lg:p-14 flex flex-col justify-center text-white relative z-10">
             <div className="flex items-center gap-4 mb-6">
               <span className="bg-red-600 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">{post.category || 'دراسة محكمة'}</span>
             </div>
             
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">{post.title}</h1>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-bold text-blue-100 border-y border-white/10 py-8 mb-8">
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><User size={14} /> الكاتب</span>
                   <span>فريق البحوث</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><Clock size={14} /> تاريخ النشر</span>
                   <span>{new Date(post.created_at).toLocaleDateString('ar-YE')}</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><Eye size={14} /> المشاهدات</span>
                   <span>{post.views_count || 0}</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><MessageSquare size={14} /> التعليقات</span>
                   <span>{comments.length}</span>
                </div>
             </div>
             
             <div className="flex gap-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isLiked ? 'bg-red-600/20 text-red-400 border border-red-600/30' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}
                >
                  <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                  <span>{likes} إعجاب</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all">
                   <Share2 size={18} />
                   <span>مشاركة</span>
                </button>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-gray-100 mb-12">
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none text-justify article-content"
               dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        <ReaderTools />

        {/* Comments Section */}
        <div id="comments" className="bg-white rounded-[3rem] p-6 md:p-10 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-black text-[#09264d] mb-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 text-[#09264d] rounded-2xl flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            نقاش الباحثين والقراء ({comments.length})
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
                  placeholder="الاسم والصفة (مثال: باحث، أكاديمي)" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-[#09264d]/10 focus:border-[#09264d]/50 transition-all outline-none"
                  required
                />
                <input 
                  type="email" 
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="البريد الإلكتروني" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-[#09264d]/10 focus:border-[#09264d]/50 transition-all outline-none"
                  required
                />
              </div>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="شارك بملاحظاتك النقدية أو إضافاتك حول هذه الدراسة..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-6 py-5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-[#09264d]/10 focus:border-[#09264d]/50 transition-all outline-none resize-none min-h-[120px]"
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
              <p className="text-center text-slate-400 font-bold py-10">لا توجد تعليقات بعد. كن أول من يشارك!</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StudyDetailsPage;
