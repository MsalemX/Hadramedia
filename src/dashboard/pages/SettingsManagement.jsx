import React, { useState, useEffect } from 'react';
import { Save, Globe, Mail, Smartphone, Upload, Loader2, AlertCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, XIcon as Twitter, WhatsAppIcon } from '../../components/Footer';
import { supabase } from '../../lib/supabase';

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    official_email: '',
    contact_number: '',
    twitter_url: '',
    facebook_url: '',
    instagram_url: '',
    youtube_url: '',
    whatsapp_url: '',
    maintenance_mode: false,
    breaking_news: '',
    top_news_label: '',
    logo_url: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) setSettings(data);
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const uploadLogo = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    const filePath = `site/${fileName}`;

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
      
      let finalLogoUrl = settings.logo_url;
      if (logoFile) {
        finalLogoUrl = await uploadLogo(logoFile);
      }

      // محاولة التحديث أو الإضافة
      const { error } = await supabase
        .from('settings')
        .upsert({ 
          id: settings.id || 1, 
          ...settings,
          logo_url: finalLogoUrl 
        }, { onConflict: 'id' });

      if (error) throw error;
      alert('تم حفظ الإعدادات بنجاح');
      fetchSettings();
    } catch (err) {
      console.error("Error saving settings:", err);
      alert(`خطأ أثناء الحفظ: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إعدادات الموقع</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الإعدادات</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* General Settings */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8 border-b border-gray-50 pb-4">الإعدادات العامة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Site Name removed as requested */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">وصف الموقع (SEO)</label>
                <input 
                  type="text" 
                  value={settings.site_description} 
                  onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">البريد الإلكتروني الرسمي</label>
                <input 
                  type="email" 
                  value={settings.official_email} 
                  onChange={(e) => setSettings({...settings, official_email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">رقم التواصل</label>
                <input 
                  type="text" 
                  value={settings.contact_number} 
                  onChange={(e) => setSettings({...settings, contact_number: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-500 uppercase">نص شريط الأخبار (العاجل)</label>
                <textarea 
                  rows={3}
                  value={settings.breaking_news} 
                  onChange={(e) => setSettings({...settings, breaking_news: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all resize-none" 
                  placeholder="اكتب الخبر العاجل هنا..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-500 uppercase">عناوين أهم الأخبار (تظهر بجانب الشعار وتتغير تلقائياً)</label>
                <textarea 
                  rows={3}
                  value={settings.top_news_label} 
                  onChange={(e) => setSettings({...settings, top_news_label: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all resize-none" 
                  placeholder="اكتب كل عنوان في سطر جديد ليتم عرضها بالتناوب (خبر واحد في كل سطر)..."
                />
                <p className="text-[10px] text-slate-400 font-bold px-2">كل سطر يعتبر خبراً منفصلاً وسيظهر لمدة 30 ثانية في الموقع</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8 border-b border-gray-50 pb-4">روابط التواصل الاجتماعي</h3>
            <div className="space-y-4">
              {[
                { icon: Twitter, label: 'Twitter / X', color: 'text-blue-400', key: 'twitter_url' },
                { icon: FacebookIcon, label: 'Facebook', color: 'text-blue-600', key: 'facebook_url' },
                { icon: InstagramIcon, label: 'Instagram', color: 'text-pink-600', key: 'instagram_url' },
                { icon: YoutubeIcon, label: 'YouTube', color: 'text-red-600', key: 'youtube_url' },
                { icon: WhatsAppIcon, label: 'WhatsApp', color: 'text-green-500', key: 'whatsapp_url' },
              ].map((social, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${social.color}`}>
                    <social.icon size={20} />
                  </div>
                  <input 
                    type="text" 
                    value={settings[social.key] || ''} 
                    onChange={(e) => setSettings({...settings, [social.key]: e.target.value})}
                    placeholder={`رابط ${social.label}`} 
                    className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings: Logo & Favicon */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
            <h3 className="text-sm font-black text-slate-800 mb-6">شعار الموقع</h3>
            
            <div className="space-y-4 mb-6">
              <input 
                type="text" 
                value={settings.logo_url || ''} 
                onChange={(e) => setSettings({...settings, logo_url: e.target.value})}
                placeholder="رابط الشعار المباشر..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[10px] font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5" 
              />
              
              <div className="relative group mx-auto w-32 h-32">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full h-full bg-gray-50 rounded-[32px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 group-hover:border-blue-600 transition-all overflow-hidden">
                  {logoFile || settings.logo_url ? (
                    <img 
                      src={logoFile ? URL.createObjectURL(logoFile) : settings.logo_url} 
                      className="w-full h-full object-contain p-2" 
                      alt="Logo" 
                    />
                  ) : (
                    <>
                      <Upload className="text-slate-300 group-hover:text-blue-600 mb-2" size={32} />
                      <span className="text-[10px] font-black text-slate-400">تحميل الشعار</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-4 font-bold">يمكنك وضع رابط مباشر أو الرفع من جهازك (PNG/SVG)</p>
          </div>

          {/* Site Status removed as requested */}
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
