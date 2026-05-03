import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Share2, MousePointer2, Volume2, Info, ArrowDown, MessageSquare, User, Send, ThumbsUp, Heart, Loader2, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ReaderTools from '../components/ReaderTools';
import LinkifyText from '../components/LinkifyText';
import ShareButtons from '../components/ShareButtons';

const CrossMediaDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchCrossMediaData = async () => {
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

        if (postData.is_cross_media) {
          try {
            const parsed = JSON.parse(postData.content);
            if (Array.isArray(parsed)) {
              const parsedSections = parsed.map((segment, index) => ({
                title: segment.title || `الجزء ${index + 1}`,
                content: segment.content,
                image: segment.image || postData.main_image,
                overlay: index % 2 === 0 ? "bg-black/60" : "bg-blue-900/70"
              }));
              setSections(parsedSections);
            } else {
              throw new Error("Not an array");
            }
          } catch (e) {
            setSections([{
              title: postData.title,
              content: postData.content,
              image: postData.main_image,
              overlay: "bg-black/60"
            }]);
          }
        } else {
           setSections([{
            title: postData.title,
            content: postData.content,
            image: postData.main_image,
            overlay: "bg-black/60"
          }]);
        }

        try {
          const { data: commentsData } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id)
            .order('created_at', { ascending: false });
          setComments(commentsData || []);
        } catch (e) {}

        try {
          const { error: rpcError } = await supabase.rpc('increment_views', { post_id: id });
          if (rpcError) {
             await supabase.from('news').update({ views: (postData.views || 0) + 1 }).eq('id', id);
          }
        } catch (e) {}

      } catch (err) {
        console.error("Error fetching cross-media data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrossMediaData();
  }, [id]);

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
  }, [sections]);

  const handleLike = async () => {
    try {
      const { error } = await supabase.rpc('increment_likes', { post_id: id });
      if (error) {
        await supabase.from('news').update({ likes: (post.likes || 0) + 1 }).eq('id', id);
      }
      setPost({ ...post, likes: (post.likes || 0) + 1 });
    } catch (err) {
      console.error("Error liking post:", err);
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
      alert("لا يمكن إضافة تعليق حالياً.");
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#09264d] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-[#09264d] flex items-center justify-center font-cairo text-white">
      <div className="text-center">
        <h1 className="text-2xl font-black mb-4">التقرير غير موجود</h1>
        <NavLink to="/" className="text-red-600 font-bold hover:underline">العودة للرئيسية</NavLink>
      </div>
    </div>
  );

  return (
    <div className="bg-[#09264d] min-h-screen font-cairo text-white overflow-x-hidden" dir="rtl">
      
      {/* Background Image Layer (Fixed) */}
      <div className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out">
        {sections.map((section, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSection ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={section.image || "/images/hero.png"} alt="" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 transition-colors duration-1000 ${section.overlay || 'bg-black/60'}`} />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 right-0 left-0 h-1 z-50 bg-white/10">
        <div 
          className="h-full bg-red-600 transition-all duration-300 ease-out"
          style={{ width: `${sections.length > 0 ? ((activeSection + 1) / sections.length) * 100 : 0}%` }}
        />
      </div>

      {/* Navigation Overlay */}
      <div className="fixed top-8 right-8 left-8 z-40 flex justify-between items-center pointer-events-none">
        <NavLink to="/" className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 pointer-events-auto hover:bg-white/20 transition-all">
          <ChevronLeft size={24} />
        </NavLink>
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={handleLike}
            className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-red-600 transition-all flex items-center gap-2 font-black"
          >
            <Heart size={20} className={post.likes > 0 ? 'fill-white' : ''} />
            {post.likes > 0 && <span className="text-xs">{post.likes}</span>}
          </button>
          <button 
            onClick={() => document.getElementById('share-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-blue-600 transition-all"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <span className="bg-red-600 px-6 py-2 rounded-full text-xs font-black mb-8 inline-block shadow-xl animate-bounce">{post.category || 'تقرير كروس ميديا'}</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight drop-shadow-2xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-8 text-sm font-bold opacity-70 mb-12">
              <span className="flex items-center gap-2"><Clock size={18} /> {new Date(post.created_at).toLocaleDateString('ar-YE')}</span>
              <span className="flex items-center gap-2"><Eye size={18} /> {post.views || 0} مشاهدة</span>
              <span className="flex items-center gap-2"><ThumbsUp size={18} /> {post.likes || 0} إعجاب</span>
            </div>
            <div className="flex flex-col items-center gap-4 animate-pulse">
               <span className="text-xs font-bold uppercase tracking-[0.2em]">اسحب للأسفل للبدء</span>
               <ArrowDown size={32} className="text-red-500" />
            </div>
          </div>
        </section>

        {sections.map((section, index) => (
          <section key={index} className="report-section min-h-screen flex items-center justify-start px-6 md:px-24 py-32">
            <div className="max-w-2xl bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl transform transition-all duration-700 hover:bg-white/10">
              <span className="text-red-500 font-black text-xs mb-4 block uppercase tracking-widest">الجزء {index + 1}</span>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">{section.title}</h2>
              <div className="text-xl md:text-2xl font-medium leading-relaxed opacity-90 mb-10 text-justify article-content">
                {section.content && (section.content.includes('<p>') || section.content.includes('<br')) ? (
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                ) : (
                  (section.content || '').split(/\n\n+/).filter(p => p.trim()).map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      <LinkifyText text={paragraph.trim()} />
                    </p>
                  ))
                )}
              </div>
            </div>
          </section>
        ))}
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 py-10">
          <ShareButtons title={post.title} />
          <ReaderTools />
        </div>

        <section className="min-h-screen bg-[#061935] relative px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
               <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-900/50 rotate-12">
                  <Heart size={40} className="text-white fill-current" />
               </div>
               <h2 className="text-4xl md:text-6xl font-black mb-6 italic">نهاية التقرير</h2>
               <p className="text-xl text-blue-200 font-bold max-w-2xl mx-auto">نأمل أن يكون هذا التقرير قد سلط الضوء على موضوع {post.title}. رأيك يهمنا.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl">
               <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
                  <MessageSquare size={32} className="text-red-500" />
                  نقاش التقرير ({comments.length})
               </h3>

               <form onSubmit={handleAddComment} className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <input 
                        type="text" 
                        placeholder="الاسم" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all font-bold text-white" 
                        required
                     />
                     <input 
                        type="email" 
                        placeholder="البريد الإلكتروني" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-500 transition-all font-bold text-white" 
                     />
                  </div>
                  <div className="relative">
                     <textarea 
                        placeholder="اكتب انطباعك..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 outline-none focus:border-red-500 transition-all font-bold min-h-[150px] resize-none text-white"
                        required
                     />
                     <button type="submit" disabled={submittingComment} className="absolute left-6 bottom-6 bg-red-600 hover:bg-red-700 p-4 rounded-2xl shadow-xl transition-all disabled:opacity-50">
                        {submittingComment ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} className="rtl:-scale-x-100" />}
                     </button>
                  </div>
               </form>

               <div className="space-y-8">
                  {comments.length > 0 ? comments.map(comment => (
                     <div key={comment.id} className="flex gap-6 items-start group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-red-500 transition-colors">
                           <User size={30} className="text-white/40" />
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-2">
                              <h4 className="font-black text-red-500">{comment.author_name}</h4>
                              <span className="text-[10px] font-bold opacity-40">{new Date(comment.created_at).toLocaleDateString('ar-YE')}</span>
                           </div>
                           <p className="text-lg opacity-80 leading-relaxed font-medium">
                              <LinkifyText text={comment.content} />
                           </p>
                        </div>
                     </div>
                  )) : (
                    <p className="text-center text-blue-200 font-bold py-10 opacity-60">لا توجد تعليقات بعد.</p>
                  )}
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CrossMediaDetailsPage;
