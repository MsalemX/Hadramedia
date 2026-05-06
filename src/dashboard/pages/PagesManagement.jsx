import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Loader2, 
  Layout, 
  Users, 
  Shield, 
  Info, 
  FileText, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Monitor,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PAGES = [
  { id: 'about', label: 'عن الموقع', icon: Info },
  { id: 'team', label: 'فريق العمل', icon: Users },
  { id: 'advertise', label: 'أعلن معنا', icon: Monitor },
  { id: 'privacy', label: 'سياسة الخصوصية', icon: Shield },
  { id: 'terms', label: 'الشروط والأحكام', icon: FileText },
  { id: 'contact', label: 'اتصل بنا', icon: Phone },
];

const PagesManagement = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    fetchPageData();
  }, [activeTab]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('id', activeTab)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setPageData(data?.content || getDefaultData(activeTab));
    } catch (err) {
      console.error("Error fetching page data:", err);
      setError("خطأ في جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  const getDefaultData = (id) => {
    switch (id) {
      case 'about':
        return {
          hero: { title: 'عن حضرميديا', description: 'صوت حضرموت الحر ومنصتكم الإخبارية المستقلة لنقل الخبر والتحقيق والقصة من قلب الحدث.', image: '' },
          stats: [
            { label: 'مراسل في الميدان', value: '25+', icon: 'Users', color: 'bg-blue-600' },
            { label: 'تحقيق استقصائي', value: '150+', icon: 'Target', color: 'bg-red-600' }
          ],
          mission: { title: 'رسالتنا', content: 'الالتزام بنقل الحقيقة كما هي، وتسليط الضوء على القضايا المسكوت عنها.' },
          vision: { title: 'رؤيتنا', content: 'أن نكون المرجع الأول والموثوق للمواطن الحضرمي في الداخل والمهجر.' },
          values_title: 'قيمنا الجوهرية',
          values: [
            { title: 'الاستقلالية', desc: 'نعمل بتمويل ذاتي وقرار تحريري مستقل.', icon: 'Shield' },
            { title: 'المصداقية', desc: 'نتحرى الدقة في كل خبر ونعتمد على مصادر موثقة.', icon: 'Award' }
          ],
          contact_cta: {
            title: 'كن جزءاً من الحقيقة',
            description: 'نحن في حضرميديا نؤمن بأن الخبر ملك للجميع، شاركنا برأيك أو أرسل لنا معلوماتك بسرية تامة.',
            info: [
              { icon: 'MapPin', text: 'حضرموت، المكلا، شارع الميناء' },
              { icon: 'Phone', text: '+967 5 300000' },
              { icon: 'Mail', text: 'info@hadramedia.com' }
            ]
          }
        };
      case 'team':
        return {
          title: 'فريق التحرير',
          description: 'نخبة من الصحفيين والباحثين الملتزمين بنقل الحقيقة.',
          sections: [
            { role: 'هيئة التحرير', members: [{ name: 'اسم العضو', title: 'المنصب', image: '', bio: '' }] }
          ]
        };
      case 'advertise':
        return {
          badge: 'نمو وتوسع',
          title: 'صل إلى جمهورك المستهدف في حضرموت واليمن',
          description: 'منصة حضرميديا توفر لك مساحات إعلانية متنوعة وحلول تسويقية ذكية.',
          stats: [{ title: 'وصول واسع', desc: 'استهدف آلاف القراء يومياً.', icon: 'BarChart', color: 'bg-red-600' }],
          placements: [{ title: 'بنر الصفحة الرئيسية', size: '728x90', price: '150$', features: ['ظهور دائم'] }]
        };
      case 'contact':
        return {
          title: 'تواصل معنا',
          description: 'نحن هنا للاستماع إليك. سواء كان لديك خبر، استفسار، أو اقتراح.',
          cards: [
            { label: 'راسلنا بريدياً', info: 'info@hadramedia.com', icon: 'Mail' },
            { label: 'اتصل بنا', info: '+967 5 300 000', icon: 'Phone' }
          ],
          hours: 'السبت - الخميس: 9ص - 9م'
        };
      case 'privacy':
      case 'terms':
        return { title: id === 'privacy' ? 'سياسة الخصوصية' : 'الشروط والأحكام', content: '' };
      default:
        return {};
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `pages/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const { error } = await supabase
        .from('site_pages')
        .upsert({ 
          id: activeTab, 
          content: pageData,
          updated_at: new Date()
        });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving page data:", err);
      setError("خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file, path) => {
    try {
      setSaving(true);
      const url = await uploadImage(file);
      const newData = { ...pageData };
      
      // Helper to set nested property
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = url;
      
      setPageData(newData);
    } catch (err) {
      setError("فشل رفع الصورة");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة صفحات الموقع</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} إدارة الصفحات</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          حفظ كافة التغييرات
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 text-green-600 font-black animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} /> تم حفظ التغييرات لصفحة ({PAGES.find(p => p.id === activeTab).label}) بنجاح!
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-black">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(page.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${
                activeTab === page.id 
                  ? 'bg-[#09264d] text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-white text-slate-400 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <page.icon size={20} />
              <span>{page.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
          {activeTab === 'about' && (
            <div className="space-y-10">
              <SectionHeader title="قسم الهيرو (Hero Section)" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup 
                  label="العنوان الرئيسي" 
                  value={pageData.hero?.title} 
                  onChange={(val) => setPageData({...pageData, hero: {...pageData.hero, title: val}})} 
                />
                <InputGroup 
                  label="الوصف الفرعي" 
                  value={pageData.hero?.description} 
                  onChange={(val) => setPageData({...pageData, hero: {...pageData.hero, description: val}})} 
                />
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase mb-3">صورة الهيرو</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="text" 
                      value={pageData.hero?.image} 
                      onChange={(e) => setPageData({...pageData, hero: {...pageData.hero, image: e.target.value}})}
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold"
                      placeholder="رابط الصورة..."
                    />
                    <div className="relative">
                      <button className="bg-gray-100 p-3 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Upload size={20} />
                      </button>
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => handleImageUpload(e.target.files[0], 'hero.image')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <SectionHeader title="الإحصائيات السريعة" />
              <div className="space-y-4">
                {pageData.stats?.map((stat, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-2xl relative group">
                    <InputGroup label="التسمية" value={stat.label} onChange={(val) => {
                      const newStats = [...pageData.stats];
                      newStats[i].label = val;
                      setPageData({...pageData, stats: newStats});
                    }} />
                    <InputGroup label="القيمة" value={stat.value} onChange={(val) => {
                      const newStats = [...pageData.stats];
                      newStats[i].value = val;
                      setPageData({...pageData, stats: newStats});
                    }} />
                    <InputGroup label="اللون (Tailwind)" value={stat.color} onChange={(val) => {
                      const newStats = [...pageData.stats];
                      newStats[i].color = val;
                      setPageData({...pageData, stats: newStats});
                    }} />
                    <div className="flex items-end pb-2">
                      <button onClick={() => {
                        const newStats = pageData.stats.filter((_, idx) => idx !== i);
                        setPageData({...pageData, stats: newStats});
                      }} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setPageData({...pageData, stats: [...(pageData.stats || []), { label: '', value: '', color: 'bg-blue-600' }]})} className="w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-slate-400 font-black hover:bg-gray-50 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                  <Plus size={18} /> إضافة إحصائية
                </button>
              </div>

              <SectionHeader title="القيم الجوهرية" />
              <div className="space-y-6">
                <InputGroup 
                  label="عنوان قسم القيم" 
                  value={pageData.values_title || 'قيمنا الجوهرية'} 
                  onChange={(val) => setPageData({...pageData, values_title: val})} 
                />
                <div className="space-y-4">
                  {pageData.values?.map((value, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-3xl space-y-4 relative">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="العنوان" value={value.title} onChange={(val) => {
                          const newValues = [...pageData.values];
                          newValues[i].title = val;
                          setPageData({...pageData, values: newValues});
                        }} />
                        <InputGroup label="الأيقونة (Shield, Award, Heart)" value={value.icon} onChange={(val) => {
                          const newValues = [...pageData.values];
                          newValues[i].icon = val;
                          setPageData({...pageData, values: newValues});
                        }} />
                      </div>
                      <InputGroup label="الوصف" value={value.desc} onChange={(val) => {
                        const newValues = [...pageData.values];
                        newValues[i].desc = val;
                        setPageData({...pageData, values: newValues});
                      }} />
                      <button onClick={() => {
                        const newValues = pageData.values.filter((_, idx) => idx !== i);
                        setPageData({...pageData, values: newValues});
                      }} className="absolute left-4 top-4 text-red-400"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => setPageData({...pageData, values: [...(pageData.values || []), { title: '', desc: '', icon: 'Shield' }]})} className="w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-slate-400 font-black">إضافة قيمة جديدة</button>
                </div>
              </div>

              <SectionHeader title="قسم تواصل معنا (CTA)" />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="العنوان" value={pageData.contact_cta?.title} onChange={(val) => setPageData({...pageData, contact_cta: {...pageData.contact_cta, title: val}})} />
                  <InputGroup label="الوصف" value={pageData.contact_cta?.description} onChange={(val) => setPageData({...pageData, contact_cta: {...pageData.contact_cta, description: val}})} />
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-black text-slate-400 uppercase">بيانات التواصل في البنر</label>
                  {pageData.contact_cta?.info?.map((info, i) => (
                    <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl relative">
                      <InputGroup label="الأيقونة" value={info.icon} onChange={(val) => {
                        const newInfo = [...pageData.contact_cta.info];
                        newInfo[i].icon = val;
                        setPageData({...pageData, contact_cta: {...pageData.contact_cta, info: newInfo}});
                      }} />
                      <InputGroup label="النص / الرابط" value={info.text} onChange={(val) => {
                        const newInfo = [...pageData.contact_cta.info];
                        newInfo[i].text = val;
                        setPageData({...pageData, contact_cta: {...pageData.contact_cta, info: newInfo}});
                      }} />
                      <button onClick={() => {
                        const newInfo = pageData.contact_cta.info.filter((_, idx) => idx !== i);
                        setPageData({...pageData, contact_cta: {...pageData.contact_cta, info: newInfo}});
                      }} className="text-red-400"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => setPageData({...pageData, contact_cta: {...pageData.contact_cta, info: [...(pageData.contact_cta?.info || []), { icon: 'Mail', text: '' }]}})} className="w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-slate-400 font-black">إضافة بيان تواصل</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-10">
              <SectionHeader title="العنوان والوصف" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="العنوان الرئيسي" value={pageData.title} onChange={(val) => setPageData({...pageData, title: val})} />
                <InputGroup label="الوصف" value={pageData.description} onChange={(val) => setPageData({...pageData, description: val})} />
              </div>

              <SectionHeader title="أقسام الفريق" />
              <div className="space-y-8">
                {pageData.sections?.map((section, sIdx) => (
                  <div key={sIdx} className="border border-gray-100 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <InputGroup label="اسم القسم (مثلاً: هيئة التحرير)" value={section.role} onChange={(val) => {
                        const newSections = [...pageData.sections];
                        newSections[sIdx].role = val;
                        setPageData({...pageData, sections: newSections});
                      }} />
                      <button onClick={() => {
                        const newSections = pageData.sections.filter((_, idx) => idx !== sIdx);
                        setPageData({...pageData, sections: newSections});
                      }} className="text-red-400 p-2"><Trash2 size={18} /></button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.members?.map((member, mIdx) => (
                        <div key={mIdx} className="bg-gray-50 p-4 rounded-2xl space-y-3 relative group">
                          <InputGroup label="الاسم" value={member.name} onChange={(val) => {
                            const newSections = [...pageData.sections];
                            newSections[sIdx].members[mIdx].name = val;
                            setPageData({...pageData, sections: newSections});
                          }} />
                          <InputGroup label="المسمى الوظيفي" value={member.title} onChange={(val) => {
                            const newSections = [...pageData.sections];
                            newSections[sIdx].members[mIdx].title = val;
                            setPageData({...pageData, sections: newSections});
                          }} />
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="رابط الصورة" value={member.image} className="flex-1 bg-white border border-gray-100 rounded-lg px-3 py-2 text-xs" readOnly />
                            <div className="relative">
                              <button className="bg-white p-2 rounded-lg border border-gray-100"><Upload size={14} /></button>
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                                uploadImage(e.target.files[0]).then(url => {
                                  const newSections = [...pageData.sections];
                                  newSections[sIdx].members[mIdx].image = url;
                                  setPageData({...pageData, sections: newSections});
                                });
                              }} />
                            </div>
                          </div>
                          <button onClick={() => {
                            const newSections = [...pageData.sections];
                            newSections[sIdx].members = newSections[sIdx].members.filter((_, idx) => idx !== mIdx);
                            setPageData({...pageData, sections: newSections});
                          }} className="absolute -top-2 -left-2 bg-white text-red-500 rounded-full p-1 border shadow-sm opacity-0 group-hover:opacity-100"><Trash2 size={12} /></button>
                        </div>
                      ))}
                      <button onClick={() => {
                        const newSections = [...pageData.sections];
                        newSections[sIdx].members.push({ name: '', title: '', image: '', bio: '' });
                        setPageData({...pageData, sections: newSections});
                      }} className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-slate-400 hover:text-blue-500 hover:bg-white"><Plus size={20} className="mx-auto" /></button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setPageData({...pageData, sections: [...(pageData.sections || []), { role: '', members: [] }]})} className="w-full py-4 bg-gray-50 rounded-2xl text-[#09264d] font-black border border-gray-100">إضافة قسم جديد</button>
              </div>
            </div>
          )}

          {activeTab === 'advertise' && (
            <div className="space-y-10">
              <SectionHeader title="إعدادات الهيرو" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="نص التمييز (التاج)" value={pageData.badge} onChange={(val) => setPageData({...pageData, badge: val})} />
                <InputGroup label="العنوان الرئيسي" value={pageData.title} onChange={(val) => setPageData({...pageData, title: val})} />
                <div className="md:col-span-2">
                  <InputGroup label="الوصف" value={pageData.description} onChange={(val) => setPageData({...pageData, description: val})} />
                </div>
              </div>

              <SectionHeader title="بيانات التواصل للإعلان" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <InputGroup 
                  label="البريد الإلكتروني للإعلانات" 
                  value={pageData.contact_email} 
                  onChange={(val) => setPageData({...pageData, contact_email: val})} 
                />
                <InputGroup 
                  label="رقم التواصل / واتساب" 
                  value={pageData.contact_phone} 
                  onChange={(val) => setPageData({...pageData, contact_phone: val})} 
                />
              </div>

              <SectionHeader title="مساحات الإعلان" />
              <div className="space-y-4">
                {pageData.placements?.map((ad, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                    <InputGroup label="العنوان" value={ad.title} onChange={(val) => {
                       const newPlacements = [...pageData.placements];
                       newPlacements[i].title = val;
                       setPageData({...pageData, placements: newPlacements});
                    }} />
                    <InputGroup label="المقاس" value={ad.size} onChange={(val) => {
                       const newPlacements = [...pageData.placements];
                       newPlacements[i].size = val;
                       setPageData({...pageData, placements: newPlacements});
                    }} />
                    <InputGroup label="السعر" value={ad.price} onChange={(val) => {
                       const newPlacements = [...pageData.placements];
                       newPlacements[i].price = val;
                       setPageData({...pageData, placements: newPlacements});
                    }} />
                    <button onClick={() => {
                      const newPlacements = pageData.placements.filter((_, idx) => idx !== i);
                      setPageData({...pageData, placements: newPlacements});
                    }} className="absolute left-4 top-4 text-red-400"><Trash2 size={18} /></button>
                  </div>
                ))}
                <button onClick={() => setPageData({...pageData, placements: [...(pageData.placements || []), { title: '', size: '', price: '', features: [] }]})} className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-slate-400 font-black">إضافة مساحة إعلانية</button>
              </div>
            </div>
          )}

          {(activeTab === 'privacy' || activeTab === 'terms') && (
            <div className="space-y-6">
              <InputGroup label="العنوان" value={pageData.title} onChange={(val) => setPageData({...pageData, title: val})} />
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-3">محتوى الصفحة</label>
                <textarea 
                  rows={20}
                  value={pageData.content}
                  onChange={(e) => setPageData({...pageData, content: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-[32px] px-8 py-8 text-sm font-bold leading-relaxed focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                  placeholder="اكتب المحتوى هنا..."
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-10">
              <SectionHeader title="الهيدر" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="العنوان" value={pageData.title} onChange={(val) => setPageData({...pageData, title: val})} />
                <InputGroup label="الوصف" value={pageData.description} onChange={(val) => setPageData({...pageData, description: val})} />
              </div>

              <SectionHeader title="بطاقات التواصل" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pageData.cards?.map((card, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-3xl space-y-4">
                    <InputGroup label="العنوان" value={card.label} onChange={(val) => {
                      const newCards = [...pageData.cards];
                      newCards[i].label = val;
                      setPageData({...pageData, cards: newCards});
                    }} />
                    <InputGroup label="المعلومة" value={card.info} onChange={(val) => {
                      const newCards = [...pageData.cards];
                      newCards[i].info = val;
                      setPageData({...pageData, cards: newCards});
                    }} />
                  </div>
                ))}
              </div>

              <SectionHeader title="معلومات إضافية" />
              <InputGroup label="أوقات العمل" value={pageData.hours} onChange={(val) => setPageData({...pageData, hours: val})} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-2 h-8 bg-blue-600 rounded-full" />
    <h3 className="text-lg font-black text-[#09264d]">{title}</h3>
  </div>
);

const InputGroup = ({ label, value, onChange, placeholder = "" }) => (
  <div className="space-y-2 w-full">
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{label}</label>
    <input 
      type="text" 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
      placeholder={placeholder}
    />
  </div>
);

export default PagesManagement;
