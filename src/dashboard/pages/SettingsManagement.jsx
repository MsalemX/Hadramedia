import React from 'react';
import { Save, Globe, Mail, Smartphone, Upload } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, XIcon as Twitter } from '../../components/Footer';

const SettingsManagement = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إعدادات الموقع</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الإعدادات</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Save size={20} />
          حفظ التغييرات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* General Settings */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8 border-b border-gray-50 pb-4">الإعدادات العامة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">اسم الموقع</label>
                <input type="text" defaultValue="حضرميديا" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">وصف الموقع (SEO)</label>
                <input type="text" defaultValue="المنصة الإخبارية الأولى في حضرموت" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">البريد الإلكتروني الرسمي</label>
                <input type="email" defaultValue="info@hadramedia.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">رقم التواصل</label>
                <input type="text" defaultValue="+967 5 300000" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all" />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8 border-b border-gray-50 pb-4">روابط التواصل الاجتماعي</h3>
            <div className="space-y-4">
              {[
                { icon: Twitter, label: 'Twitter / X', color: 'text-blue-400' },
                { icon: FacebookIcon, label: 'Facebook', color: 'text-blue-600' },
                { icon: InstagramIcon, label: 'Instagram', color: 'text-pink-600' },
                { icon: YoutubeIcon, label: 'YouTube', color: 'text-red-600' },
              ].map((social, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${social.color}`}>
                    <social.icon size={20} />
                  </div>
                  <input type="text" placeholder={`رابط ${social.label}`} className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings: Logo & Favicon */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
            <h3 className="text-sm font-black text-slate-800 mb-6">شعار الموقع</h3>
            <div className="w-32 h-32 bg-gray-50 rounded-[32px] mx-auto flex flex-col items-center justify-center border-2 border-dashed border-gray-200 group hover:border-blue-600 transition-all cursor-pointer">
              <Upload className="text-slate-300 group-hover:text-blue-600 mb-2" size={32} />
              <span className="text-[10px] font-black text-slate-400">تحميل الشعار</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 font-bold">يفضل بصيغة PNG أو SVG بمقاس 200x200</p>
          </div>

          <div className="bg-[#09264d] p-8 rounded-[40px] shadow-lg shadow-blue-900/20 text-white">
            <h3 className="text-sm font-black mb-4">حالة الموقع</h3>
            <p className="text-xs font-bold text-blue-200 mb-6 opacity-70">عند تفعيل وضع الصيانة، لن يتمكن الزوار من تصفح الموقع</p>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
              <span className="text-sm font-black">وضع الصيانة</span>
              <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
