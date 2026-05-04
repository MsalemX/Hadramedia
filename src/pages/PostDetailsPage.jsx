import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  Clock, 
  Eye, 
  Share2, 
  MessageSquare, 
  User, 
  Send, 
  ThumbsUp,
  Loader2,
  Image as ImageIcon,
  Heart,
  Download,
  BookOpen
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import AdBanner from '../components/AdBanner';
import LinkifyText from '../components/LinkifyText';
import ReaderTools from '../components/ReaderTools';
import ShareButtons from '../components/ShareButtons';

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const fetchPostData = async () => {
    try {
      setLoading(true);
      const { data: postData, error: postError } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .eq('status', 'منشور')
        .single();

      if (postError) throw postError;
      setPost(postData);

      try {
        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', id)
          .order('created_at', { ascending: false });
        setComments(commentsData || []);
      } catch (e) {}

      // Increment views
      await supabase.rpc('increment_views', { post_id: id });

    } catch (err) {
      console.error("Error fetching post data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      // محاولة استدعاء الـ RPC
      const { error } = await supabase.rpc('increment_likes', { post_id: id });
      
      if (error) {
        console.error("RPC Error:", error);
        alert(`فشل الحفظ في قاعدة البيانات: ${error.message}`);
        return;
      }

      // تحديث الحالة محلياً فقط إذا نجحت العملية في السيرفر
      setPost(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
      
    } catch (err) {
      console.error("Critical Like Error:", err);
      alert("حدث خطأ غير متوقع أثناء الإعجاب");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    try {
      setSubmittingComment(true);
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          post_id: id,
          author_name: name,
          author_email: email,
          content: newComment
        }])
        .select()
        .single();

      if (error) throw error;
      setComments([data, ...comments]);
      setNewComment('');
      setName('');
      setEmail('');
    } catch (err) {
      alert('لا يمكن إضافة تعليق حالياً. تأكد من وجود جدول التعليقات.');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fb]">
      <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fb] font-cairo text-right">
      <div className="text-center">
        <h1 className="text-2xl font-black text-slate-800 mb-4">المقال غير موجود أو لا يزال مسودة</h1>
        <NavLink to="/" className="text-red-600 font-bold hover:underline">العودة للرئيسية</NavLink>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[600px] w-full">
        <img 
          src={post.main_image || '/images/hero.png'} 
          className="w-full h-full object-cover"
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09264d] via-[#09264d]/40 to-transparent" />
        
        <div className="absolute bottom-0 right-0 left-0 max-w-7xl mx-auto px-6 pb-12">
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-xs font-bold text-blue-200">
                <NavLink to="/" className="hover:text-white">الرئيسية</NavLink>
                <ChevronLeft size={14} />
                <span className="text-white">{post.category}</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-4xl">{post.title}</h1>
             <div className="flex items-center gap-6 text-sm font-bold text-gray-300 mt-4">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-red-500" />
                  <span>{new Date(post.created_at).toLocaleDateString('ar-YE')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-red-500" />
                  <span>{post.views || 0} مشاهدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-red-500" />
                  <span>{post.likes || 0} إعجاب</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Author Card - Mobile Only */}
            <div className="lg:hidden bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-100 shadow-sm">
                    <User size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#e00013]">{post.author || 'فريق حضرميديا'}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">كاتب المحتوى</p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 text-right">
            <div className="prose prose-lg max-w-none font-bold text-slate-700 leading-relaxed space-y-6 article-content text-right">
              {post.content && (post.content.includes('<p>') || post.content.includes('<br')) ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                (post.content || '').split(/\n\n+/).filter(p => p.trim()).map((paragraph, idx) => (
                  <p key={idx} className="mb-8 leading-[2.2] text-slate-700 font-medium text-lg text-justify">
                    <LinkifyText text={paragraph.trim()} />
                  </p>
                ))
              )}
            </div>

            <AdBanner position="content" className="mt-12" />

            {post.pdf_url && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href={post.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white border-2 border-[#09264d] text-[#09264d] font-black py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 hover:bg-blue-50"
                >
                  <BookOpen size={20} /> قراءة الملف (PDF)
                </a>
                <a 
                  href={post.pdf_url} 
                  download 
                  className="w-full bg-[#09264d] hover:bg-blue-900 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3"
                >
                  <Download size={20} /> تحميل الملف (PDF)
                </a>
              </div>
            )}

            <ShareButtons title={post.title} />

            {/* Gallery Section if exists */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-red-600 rounded-full" />
                  <h3 className="text-2xl font-black text-[#09264d]">معرض الصور</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 aspect-video">
                      <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interaction Bar */}
            <div className="mt-12 flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
               <button 
                 onClick={handleLike}
                 className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hover:bg-red-50 hover:border-red-100 hover:text-red-600 transition-all font-black active:scale-95"
               >
                 <Heart size={20} className={post.likes > 0 ? 'fill-red-600 text-red-600' : ''} />
                 {post.likes > 0 ? `${post.likes} إعجاب` : 'أعجبني'}
               </button>
               <button 
                 onClick={() => document.getElementById('share-section')?.scrollIntoView({ behavior: 'smooth' })}
                 className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all font-black"
               >
                 <Share2 size={20} /> مشاركة
               </button>
            </div>

            {/* Comments Section */}
            <div className="mt-20 pt-20 border-t border-gray-50">
               <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-black text-[#09264d] flex items-center gap-4">
                    <MessageSquare size={32} className="text-red-600" />
                    التعليقات ({comments.length})
                  </h3>
               </div>

               {/* Add Comment */}
               <form onSubmit={handleAddComment} className="mb-16 bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="الاسم المستعار" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white border border-gray-200 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4"
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="البريد الإلكتروني (اختياري)" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border border-gray-200 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4"
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      placeholder="اكتب تعليقك هنا..." 
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-6 font-bold focus:outline-none focus:ring-4 resize-none"
                      required
                    />
                    <button 
                      type="submit"
                      disabled={submittingComment}
                      className="absolute left-4 bottom-4 bg-[#09264d] hover:bg-blue-900 text-white p-4 rounded-2xl transition-all"
                    >
                      {submittingComment ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="rotate-180" />}
                    </button>
                  </div>
               </form>

               {/* Comments List */}
               <div className="space-y-8">
                  {comments.length > 0 ? comments.map((comment) => (
                    <div key={comment.id} className="flex gap-6 group text-right">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 text-[#09264d]">
                        <User size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="font-black text-[#09264d]">{comment.author_name}</h4>
                           <span className="text-[10px] font-bold text-slate-400">{new Date(comment.created_at).toLocaleDateString('ar-YE')}</span>
                        </div>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          <LinkifyText text={comment.content} />
                        </p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                       <p className="text-slate-400 font-bold">لا توجد تعليقات بعد.</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 text-right">
            <div className="hidden lg:block bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
               <h3 className="text-xl font-black text-[#09264d] mb-6 flex items-center gap-2">
                 <div className="w-2 h-6 bg-red-600 rounded-full" />
                 كاتب المقال
               </h3>
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-100 shadow-sm">
                    <User size={32} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#e00013]">{post.author || 'فريق حضرميديا'}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">كاتب المحتوى</p>
                  </div>
               </div>
            </div>

            <ReaderTools />
            <AdBanner position="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
