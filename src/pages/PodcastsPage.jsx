import React, { useState, useEffect } from 'react';
import { Headphones, Play, Pause, Clock, Calendar, ChevronLeft, Volume2, Share2, Video, X, Music } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PodcastsPage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('podcasts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setPodcasts(data);
    setLoading(false);
  };

  const togglePlay = (podcast) => {
    if (currentAudio?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudio(podcast);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      {/* Hero Header */}
      <div className="bg-[#09264d] text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <Headphones size={400} className="absolute -top-20 -right-20 rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-200/60 mb-8">
            <NavLink to="/" className="hover:text-white transition-colors">الرئيسية</NavLink>
            <ChevronLeft size={14} />
            <span className="text-white">بودكاست حضرميديا</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-12 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-black">بودكاست حضرميديا</h1>
            </div>
            <p className="text-blue-100/70 font-bold max-w-2xl text-lg">
              صوت الحقيقة من قلب حضرموت. استمع لأهم التحليلات، المقابلات، والتقارير الصوتية الحصرية.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[2.5rem] p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-100 rounded-[2rem] mb-6" />
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-50 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : podcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast) => (
              <div 
                key={podcast.id} 
                className="group bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative mb-6 overflow-hidden rounded-[2rem]">
                  <img 
                    src={podcast.thumbnail_url || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80'} 
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={podcast.title} 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button 
                      onClick={() => togglePlay(podcast)}
                      className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all hover:bg-red-700"
                    >
                      {currentAudio?.id === podcast.id && isPlaying ? <Pause size={28} /> : (podcast.media_type === 'video' ? <Video size={28} /> : <Play size={28} className="mr-1" />)}
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                    {podcast.media_type === 'video' ? <Video size={16} /> : <Music size={16} />}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#09264d]/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white flex items-center gap-1.5">
                    <Clock size={12} className="text-red-500" />
                    {podcast.duration || '00:00'}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg">
                      {podcast.category || 'عام'}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                      <Calendar size={12} />
                      {new Date(podcast.created_at).toLocaleDateString('ar-YE')}
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-[#09264d] mb-3 leading-tight group-hover:text-red-600 transition-colors">
                    {podcast.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-400 line-clamp-2 leading-relaxed mb-6">
                    {podcast.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => togglePlay(podcast)}
                    className="flex items-center gap-2 text-sm font-black text-[#09264d] hover:text-red-600 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      {currentAudio?.id === podcast.id && isPlaying ? <Pause size={14} /> : <Play size={14} className="mr-0.5" />}
                    </div>
                    {currentAudio?.id === podcast.id && isPlaying ? 'جاري الاستماع' : 'استمع الآن'}
                  </button>
                  <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-200">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Headphones size={40} />
             </div>
             <h3 className="text-xl font-black text-[#09264d] mb-2">لا توجد حلقات بودكاست حالياً</h3>
             <p className="text-slate-400 font-bold">ترقبوا إطلاق أولى حلقاتنا قريباً جداً</p>
          </div>
        )}
      </div>

      {/* Player Sticky */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto">
             {currentAudio.media_type === 'video' && isPlaying ? (
                <div className="mb-4 aspect-video max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
                   {currentAudio.media_url.includes('youtube.com') || currentAudio.media_url.includes('youtu.be') ? (
                      <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${currentAudio.media_url.split('v=')[1] || currentAudio.media_url.split('/').pop()}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                   ) : (
                      <video className="w-full h-full" controls autoPlay src={currentAudio.media_url}></video>
                   )}
                </div>
             ) : (
                <audio className="hidden" autoPlay src={currentAudio.media_type === 'audio' ? currentAudio.media_url : ''}></audio>
             )}

             <div className="flex items-center gap-4">
                <img src={currentAudio.thumbnail_url} className="w-12 h-12 rounded-xl object-cover" alt="" />
                <div className="flex-1">
                    <h4 className="text-sm font-black text-[#09264d] line-clamp-1">{currentAudio.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{currentAudio.media_type === 'video' ? 'فيديو' : 'صوت'} • {currentAudio.duration}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 bg-[#09264d] text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="mr-0.5" />}
                    </button>
                    <button onClick={() => setCurrentAudio(null)} className="p-2 text-slate-300 hover:text-red-600">
                      <X size={20} />
                    </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastsPage;
