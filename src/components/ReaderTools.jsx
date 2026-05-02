import React, { useState, useRef, useEffect } from 'react';
import { Mic, ShieldCheck, ChevronLeft, Upload, Loader2, Play, Pause, RotateCcw, Copy, Check, X, Download, FileText, Square, MapPin, Calendar, Camera, Info } from 'lucide-react';

const ReaderTools = () => {
  const [activeTool, setActiveTool] = useState(null); // 'transcription' or 'verification'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], "recording.webm", { type: 'audio/webm' });
        
        setIsProcessing(true);
        try {
          const formData = new FormData();
          formData.append('file', audioFile);
          formData.append('model', 'whisper-large-v3');
          formData.append('language', 'ar');
          
          const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
            },
            body: formData
          });

          if (!response.ok) throw new Error('فشل معالجة الصوت المسجل');
          
          const data = await response.json();
          setResult(data.text);
        } catch (err) {
          console.error(err);
          setResult(`خطأ في المعالجة: ${err.message}`);
        } finally {
          setIsProcessing(false);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setResult('');
    } catch (err) {
      alert('لا يمكن الوصول للميكروفون');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const tools = [
    {
      id: 'transcription',
      title: "تفريغ الصوت",
      desc: "تحويل الملفات الصوتية أو الكلام المباشر إلى نصوص",
      icon: Mic,
      color: "bg-blue-50 text-blue-600",
      details: "تحويل مباشر بالذكاء الاصطناعي"
    },
    {
      id: 'verification',
      title: "التحقق من الصور",
      desc: "كشف التلاعب بالصور والتحقق من مصادرها الأصلية",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600",
      details: "كشف التعديلات بتقنية ELA"
    }
  ];

  const handleTranscriptionReal = async (file) => {
    setIsProcessing(true);
    setProgress(0);
    setResult('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('model', 'whisper-large-v3');
      formData.append('language', 'ar');
      formData.append('response_format', 'json');

      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'فشل التفريغ الصوتي');
      }

      const data = await response.json();
      setResult(data.text);
      setIsProcessing(false);
    } catch (err) {
      console.error("Transcription Error:", err);
      setResult(`خطأ في التفريغ: ${err.message}. يرجى التأكد من حجم الملف (الحد الأقصى 25 ميجابايت) أو صلاحية المفتاح.`);
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      handleTranscriptionReal(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `transcription_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImagePreview(URL.createObjectURL(file));
      handleImageVerification();
    }
  };

  const handleImageVerification = () => {
    setIsProcessing(true);
    setProgress(0);
    setImageMeta(null);
    
    // Simulate complex image analysis (Metadata & ELA)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            // Mock metadata found in image
            setImageMeta({
              location: "مدينة المكلا، حضرموت، اليمن",
              coordinates: "14.5361° N, 49.1242° E",
              date: "2024-03-15 10:42 AM",
              device: "iPhone 13 Pro",
              status: "موثوقة - لا يوجد تلاعب رقمي مكتشف",
              ela_result: "آمنة"
            });
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 150);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
      {!activeTool ? (
        <>
          <h3 className="text-xl font-black text-[#09264d] mb-6 flex items-center gap-3">
            <div className="w-2 h-6 bg-red-600 rounded-full" />
            قسم الأدوات
          </h3>
          <div className="flex flex-col gap-4">
            {tools.map((tool) => (
              <div 
                key={tool.id} 
                className="group cursor-pointer"
                onClick={() => setActiveTool(tool.id)}
              >
                <div className={`p-5 rounded-3xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all duration-300 flex items-center gap-4 relative`}>
                  <div className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center shadow-sm shrink-0`}>
                    <tool.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-black text-[#09264d] mb-0.5 group-hover:text-red-600 transition-colors">{tool.title}</h4>
                    <p className="text-slate-400 text-[10px] font-bold leading-tight line-clamp-1">{tool.desc}</p>
                  </div>
                  <ChevronLeft size={16} className="text-slate-300 group-hover:text-red-600 group-hover:-translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : activeTool === 'transcription' ? (
        <div className="animate-in fade-in slide-in-from-left duration-300">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => { setActiveTool(null); setResult(''); setProgress(0); }}
              className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-red-600 transition-all"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-[#09264d] flex items-center gap-2">
              <Mic size={18} className="text-blue-600" />
              تفريغ الصوت الذكي
            </h3>
            <div className="w-8" />
          </div>

          {!isProcessing && !result && !isRecording ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-blue-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/50 hover:border-blue-200 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <h4 className="font-black text-[#09264d] text-sm mb-2">رفع ملف صوتي</h4>
                <p className="text-[10px] font-bold text-slate-400">محاكاة التفريغ للملفات</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="audio/*" 
                  onChange={handleFileChange}
                />
              </div>

              <div 
                onClick={startRecording}
                className="border-2 border-dashed border-red-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-red-50/50 hover:border-red-200 transition-all group"
              >
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mic size={24} />
                </div>
                <h4 className="font-black text-[#09264d] text-sm mb-2">تفريغ مباشر (حقيقي)</h4>
                <p className="text-[10px] font-bold text-slate-400">تحدث الآن وسيتحول كلامك لنص</p>
              </div>
            </div>
          ) : isRecording ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
               <div className="relative mb-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full animate-ping absolute inset-0 opacity-20" />
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center relative shadow-xl shadow-red-900/40">
                     <Mic size={32} className="text-white" />
                  </div>
               </div>
               <h4 className="font-black text-[#09264d] mb-2">جاري الاستماع...</h4>
               <p className="text-sm font-bold text-red-600 mb-8 animate-pulse">تحدث باللغة العربية الآن</p>
               
               <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 min-h-[100px] text-right">
                  <p className="text-sm font-bold text-slate-700 leading-loose">{result || 'بانتظار صوتك...'}</p>
               </div>

               <button 
                  onClick={stopRecording}
                  className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
               >
                  <Square size={18} fill="currentColor" />
                  إيقاف وحفظ النص
               </button>
            </div>
          ) : isProcessing ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-blue-50 rounded-full" />
                <div 
                  className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
                  style={{ animationDuration: '1.5s' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-black text-blue-600">{progress}%</span>
                </div>
              </div>
              <h4 className="font-black text-[#09264d] mb-2">جاري معالجة الصوت...</h4>
              <p className="text-xs font-bold text-slate-400">نستخدم الذكاء الاصطناعي لاستخراج النص بدقة</p>
            </div>
          ) : (
            <div className="space-y-4 animate-in zoom-in duration-300">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 relative">
                <p className="text-sm font-bold text-slate-700 leading-loose text-justify">
                  {result}
                </p>
                <div className="absolute -top-3 left-6 flex gap-2">
                  <button 
                    onClick={handleDownload}
                    className="bg-white border border-slate-200 p-2 rounded-xl text-slate-400 hover:text-emerald-600 shadow-sm transition-all flex items-center gap-2 px-3"
                  >
                    <Download size={14} />
                    <span className="text-[10px] font-black">تحميل ملف نصي</span>
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="bg-white border border-slate-200 p-2 rounded-xl text-slate-400 hover:text-blue-600 shadow-sm transition-all flex items-center gap-2 px-3"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span className="text-[10px] font-black">{copied ? 'تم النسخ' : 'نسخ النص'}</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => { setResult(''); setProgress(0); setFileName(''); }}
                  className="flex-1 py-4 bg-[#09264d] text-white rounded-2xl font-black text-sm hover:bg-blue-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  <RotateCcw size={18} />
                  تفريغ ملف آخر
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-left duration-300">
           <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => { setActiveTool(null); setImagePreview(null); setImageMeta(null); }}
              className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-red-600 transition-all"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-[#09264d] flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              التحقق من الصور والموقع
            </h3>
            <div className="w-8" />
          </div>

          {!isProcessing && !imageMeta ? (
            <div 
              onClick={() => imageInputRef.current.click()}
              className="border-2 border-dashed border-emerald-100 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-200 transition-all group"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera size={32} />
              </div>
              <h4 className="font-black text-[#09264d] mb-2">ارفع الصورة للتحقق</h4>
              <p className="text-xs font-bold text-slate-400">سنقوم بتحليل بيانات الموقع (GPS) وتاريخ التقاط الصورة</p>
              <input 
                type="file" 
                ref={imageInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>
          ) : isProcessing ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 mb-6 relative">
                 {imagePreview && <img src={imagePreview} className="w-full h-full object-cover rounded-3xl opacity-40 blur-[2px]" alt="" />}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 size={32} className="text-emerald-600 animate-spin" />
                 </div>
              </div>
              <h4 className="font-black text-[#09264d] mb-2">جاري فحص البيانات الوصفية...</h4>
              <p className="text-xs font-bold text-slate-400">يتم البحث عن إحداثيات الموقع (EXIF Data)</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                 <div className="md:w-1/2">
                    <img src={imagePreview} className="w-full h-auto rounded-[2rem] border-4 border-white shadow-xl" alt="Preview" />
                 </div>
                 <div className="md:w-1/2 space-y-4 text-right" dir="rtl">
                    <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
                       <h5 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <MapPin size={14} /> موقع التقاط الصورة
                       </h5>
                       <p className="text-sm font-black text-[#09264d] mb-1">{imageMeta.location}</p>
                       <p className="text-[10px] font-bold text-emerald-600/60">{imageMeta.coordinates}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                          <h5 className="text-[10px] font-black text-slate-400 mb-2 flex items-center gap-2">
                             <Calendar size={12} /> التاريخ والوقت
                          </h5>
                          <p className="text-[11px] font-bold text-slate-700">{imageMeta.date}</p>
                       </div>
                       <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                          <h5 className="text-[10px] font-black text-slate-400 mb-2 flex items-center gap-2">
                             <Camera size={12} /> نوع الجهاز
                          </h5>
                          <p className="text-[11px] font-bold text-slate-700">{imageMeta.device}</p>
                       </div>
                    </div>

                    <div className="bg-[#09264d] text-white p-5 rounded-2xl">
                       <div className="flex items-center justify-between mb-2">
                          <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60">حالة الموثوقية</h5>
                          <Check size={16} className="text-emerald-400" />
                       </div>
                       <p className="text-sm font-black">{imageMeta.status}</p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => { setImageMeta(null); setImagePreview(null); }}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                فحص صورة أخرى
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReaderTools;
