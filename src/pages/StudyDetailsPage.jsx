import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronLeft, Heart, MessageSquare, Share2, Bookmark, User, Send, ThumbsUp, MoreHorizontal, Download, FileText, BookOpen, Clock, Tag } from 'lucide-react';

const StudyDetailsPage = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(420);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'د. سعيد باوزير',
      avatar: '/images/image.jpg',
      content: 'دراسة قيمة جداً وتستند إلى أرقام وإحصائيات دقيقة. آمل أن تأخذ السلطة المحلية بهذه التوصيات في خططها القادمة.',
      date: 'منذ يومين',
      likes: 18,
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
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8">
          <NavLink to="/" className="hover:text-blue-600 transition-colors">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <NavLink to="/studies" className="hover:text-blue-600 transition-colors">الدراسات والأبحاث</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600 truncate max-w-[200px]">تفاصيل الدراسة</span>
        </div>

        {/* Study Header Block */}
        <div className="bg-[#09264d] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row mb-12 border border-white/5 relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          
          <div className="md:w-1/3 relative overflow-hidden bg-black/20 p-10 flex flex-col items-center justify-center">
             <div className="relative shadow-2xl shadow-black/50 mb-6">
                <img src="/images/port.png" className="w-56 h-72 object-cover rounded-lg border-l-8 border-red-600 shadow-2xl" alt="Study Cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'; }} />
             </div>
             <a href="#" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3">
                <Download size={20} /> تحميل PDF (2.4MB)
             </a>
          </div>
          
          <div className="md:w-2/3 p-10 lg:p-14 flex flex-col justify-center text-white relative z-10">
             <div className="flex items-center gap-4 mb-6">
               <span className="bg-red-600 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">دراسة محكمة</span>
               <span className="bg-white/10 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-200">اقتصاد</span>
             </div>
             
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">التحديات الاقتصادية في اليمن وآفاق التعافي (2024)</h1>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-bold text-blue-100 border-y border-white/10 py-8 mb-8">
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><User size={14} /> الباحث الرئيسي</span>
                   <span>د. عبدالله بن حريز</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><Clock size={14} /> تاريخ النشر</span>
                   <span>20 مايو 2024</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><FileText size={14} /> الصفحات</span>
                   <span>68 صفحة</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-white/50 text-xs flex items-center gap-2"><Download size={14} /> التحميلات</span>
                   <span>1.2K مرة</span>
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

        {/* Content Tabs (Abstract / Details) */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-gray-100 mb-12">
          <div className="flex items-center gap-8 border-b border-gray-100 mb-10 pb-4">
             <button className="text-lg font-black text-[#09264d] border-b-4 border-red-600 pb-4 -mb-[18px]">ملخص الدراسة (Abstract)</button>
             <button className="text-lg font-bold text-slate-400 hover:text-slate-600 pb-4 -mb-[18px] transition-colors">الفهرس</button>
             <button className="text-lg font-bold text-slate-400 hover:text-slate-600 pb-4 -mb-[18px] transition-colors">المراجع</button>
          </div>
          
          <div className="prose prose-lg prose-slate text-slate-700 font-medium leading-loose max-w-none text-justify">
            <h3 className="text-2xl text-[#09264d] font-black mb-6">المقدمة:</h3>
            <p className="mb-8">
              تهدف هذه الدراسة إلى تقديم تحليل شامل للتحديات الاقتصادية التي يواجهها اليمن في ظل الظروف الراهنة، مع التركيز بشكل خاص على تأثير هذه التحديات على المحافظات الشرقية وتحديداً محافظة حضرموت. تنطلق الدراسة من فرضية أن الاستقرار النسبي في بعض المحافظات يمثل فرصة استراتيجية للبدء في مسار التعافي الاقتصادي المتدرج.
            </p>
            
            <h3 className="text-2xl text-[#09264d] font-black mb-6">أهمية الدراسة:</h3>
            <p className="mb-8">
              تكتسب هذه الدراسة أهميتها من ندرة الأبحاث الميدانية المحدثة التي ترصد الواقع الاقتصادي في المحافظات التي لم تتأثر بشكل مباشر بؤر الصراع المشتعلة، وتسعى لتسليط الضوء على الإمكانيات الكامنة في قطاعات حيوية مثل الموانئ، والزراعة، والثروة السمكية.
            </p>
            
            <div className="bg-slate-50 border-r-4 border-red-600 p-8 rounded-l-2xl my-10 shadow-inner">
              <h3 className="text-xl font-black text-[#09264d] mb-4 flex items-center gap-2">
                <FileText className="text-red-600" />
                أبرز النتائج والتوصيات:
              </h3>
              <ul className="list-disc list-inside space-y-3 text-slate-600 font-bold">
                <li>ضرورة لامركزية الإيرادات وتفعيل دور السلطات المحلية في إدارة الموارد.</li>
                <li>تأهيل البنية التحتية للموانئ البحرية لاستيعاب حركة تجارية أكبر لتخفيف الضغط.</li>
                <li>توجيه جزء من الإيرادات نحو دعم المشاريع الصغيرة والمتوسطة للشباب.</li>
                <li>إعادة النظر في الرسوم والضرائب التي تثقل كاهل القطاع الخاص وتعيق الاستثمار.</li>
              </ul>
            </div>
            
            <h3 className="text-2xl text-[#09264d] font-black mb-6">المنهجية:</h3>
            <p className="mb-6">
              اعتمدت الدراسة على المنهج الوصفي التحليلي، وتم جمع البيانات من خلال دراسة ميدانية استغرقت ثلاثة أشهر شملت مقابلات مع 120 من الخبراء الاقتصاديين، ومدراء غرف التجارة، وممثلي السلطة المحلية.
            </p>
          </div>
        </div>

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
                  disabled={!newComment.trim() || !commentName.trim() || !commentEmail.trim()}
                  className="absolute left-4 bottom-4 bg-[#09264d] hover:bg-blue-900 disabled:bg-slate-300 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-900/30"
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
        </div>
        
      </div>
    </div>
  );
};

export default StudyDetailsPage;
