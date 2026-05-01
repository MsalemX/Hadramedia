import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { 
  Save, 
  X, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ContentEditor = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') || 'news';
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: type === 'stories' ? 'قصص' : type === 'studies' ? 'دراسات' : type === 'investigations' ? 'تحقيقات' : type === 'articles' ? 'مقالات' : type === 'cartoons' ? 'كاريكاتير' : type === 'cross-media' ? 'كروس ميديا' : 'أخبار',
    main_image: '',
    gallery: [],
    content: '',
    status: 'منشور',
    is_cross_media: type === 'cross-media',
    sections: []
  });

  useEffect(() => {
    if (isEdit) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      let sections = [];
      if (data.is_cross_media) {
         try {
            const parsed = JSON.parse(data.content);
            if (Array.isArray(parsed)) sections = parsed;
         } catch (e) {
            sections = [];
         }
      }

      setFormData({
        ...data,
        gallery: data.gallery || [],
        sections: sections.length > 0 ? sections : []
      });
    } catch (err) {
      setError('خطأ في جلب البيانات');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
      const filePath = `${fileName}`;

      // محاولة الرفع
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images') 
        .upload(filePath, file);

      if (uploadError) {
        console.error('Detailed Storage Error:', uploadError);
        // إرجاع رسالة خطأ واضحة
        throw new Error(`Supabase Error: ${uploadError.message} (Status: ${uploadError.status || 'unknown'})`);
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err) {
      console.error('Full Catch Error:', err);
      throw err;
    }
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      setSaving(true);
      setError(null);
      const url = await uploadImage(file);
      setFormData({ ...formData, main_image: url });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setSaving(true);
      setError(null);
      const uploadPromises = files.map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      setFormData({ 
        ...formData, 
        gallery: [...(formData.gallery || []), ...urls] 
      });
    } catch (err) {
      setError(`خطأ في المعرض: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSectionImageUpload = async (index, file) => {
    if (!file) return;
    try {
      setSaving(true);
      setError(null);
      const url = await uploadImage(file);
      updateSection(index, 'image', url);
    } catch (err) {
      setError(`خطأ في رفع القسم: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...(formData.gallery || [])];
    newGallery.splice(index, 1);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let finalContent = formData.content;
      if (formData.is_cross_media) {
        finalContent = JSON.stringify(formData.sections);
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        main_image: formData.main_image,
        gallery: formData.gallery || [],
        content: finalContent,
        status: formData.status,
        is_cross_media: formData.is_cross_media,
        updated_at: new Date()
      };

      let result;
      if (isEdit) {
        result = await supabase.from('news').update(payload).eq('id', id);
      } else {
        result = await supabase.from('news').insert([payload]);
      }

      if (result.error) throw result.error;

      setSuccess(true);
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setError(err.message || 'خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: '', content: '', image: '' }]
    });
  };

  const removeSection = (index) => {
    const newSections = [...formData.sections];
    newSections.splice(index, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const updateSection = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index][field] = value;
    setFormData({ ...formData, sections: newSections });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            {isEdit ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}
          </h1>
          <p className="text-slate-400 text-sm font-bold mt-1">
            {formData.is_cross_media ? 'كروس ميديا' : formData.category}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-2xl font-black text-slate-500 bg-white border border-gray-100 hover:bg-gray-50 transition-all"
          >
            إلغاء
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            حفظ التغييرات
          </button>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-600 font-black animate-in fade-in duration-300">
          <CheckCircle2 size={20} />
          تم الحفظ بنجاح! جاري العودة...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-black">
          <AlertCircle size={20} />
          <div className="flex-1">
             <p className="text-sm">{error}</p>
             <p className="text-[10px] opacity-70 mt-1">تأكد من إنشاء Bucket باسم images في Supabase وجعله Public مع إضافة سياسة الرفع.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">عنوان المحتوى</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-lg font-black text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                placeholder="أدخل العنوان هنا..."
              />
            </div>

            {!formData.is_cross_media ? (
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">المحتوى</label>
                <textarea 
                  rows={15}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-[32px] px-6 py-6 font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                  placeholder="اكتب تفاصيل المحتوى هنا..."
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">أجزاء الكروس ميديا (Scroll Sections)</label>
                  <button 
                    onClick={addSection}
                    className="text-blue-600 text-xs font-black flex items-center gap-1 hover:underline"
                  >
                    <Plus size={14} /> إضافة جزء جديد
                  </button>
                </div>
                
                {formData.sections.map((section, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 space-y-4 relative group">
                    <button 
                      onClick={() => removeSection(index)}
                      className="absolute left-4 top-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all z-20"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 mb-2">عنوان الجزء</label>
                        <input 
                          type="text" 
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm font-black"
                          placeholder="عنوان فرعي..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 mb-2">صورة الجزء (رفع محلي)</label>
                        <div className="relative h-10">
                          <div className="absolute inset-0 bg-white border border-gray-100 rounded-xl px-4 py-2 text-[10px] font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                            {section.image ? 'تم رفع الصورة' : 'اضغط لرفع صورة'}
                          </div>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleSectionImageUpload(index, e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-2">نص الجزء</label>
                      <textarea 
                        rows={4}
                        value={section.content}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold"
                        placeholder="اكتب النص هنا..."
                      />
                    </div>
                    {section.image && (
                      <div className="mt-2 h-20 rounded-xl overflow-hidden border border-gray-200">
                        <img src={section.image} className="w-full h-full object-cover" alt="" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">الصورة الرئيسية</label>
              <div className="aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 overflow-hidden relative group">
                {formData.main_image ? (
                  <img src={formData.main_image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                    <ImageIcon size={40} className="mb-2" />
                    <span className="text-[10px] font-black text-center px-4">اضغط لرفع الصورة</span>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">معرض الصور</label>
              <div className="grid grid-cols-2 gap-4">
                {(formData.gallery || []).map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100">
                    <img src={img} className="w-full h-full object-cover" alt="" />
                    <button 
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 left-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all cursor-pointer">
                  <Plus size={24} />
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleGalleryUpload}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">الحالة</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black text-slate-700 focus:outline-none"
              >
                <option value="منشور">منشور</option>
                <option value="مسودة">مسودة</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">التصنيف</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black text-slate-700 focus:outline-none"
              >
                <option value="أخبار">أخبار</option>
                <option value="تحقيقات">تحقيقات</option>
                <option value="قصص">قصص</option>
                <option value="دراسات">دراسات</option>
                <option value="كاريكاتير">كاريكاتير</option>
                <option value="كروس ميديا">كروس ميديا</option>
                <option value="مقالات">مقالات</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
