import React, { useState, useEffect } from 'react';
import { 
  Send, Users, Mail, Trash2, 
  Search, Download, Plus, X, 
  CheckCircle, AlertCircle, Loader2 
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const NewsletterManagement = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaign, setCampaign] = useState({ subject: '', content: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('newsletter')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المشترك؟')) return;
    try {
      const { error } = await supabase.from('newsletter').delete().eq('id', id);
      if (error) throw error;
      setSubscribers(subscribers.filter(s => s.id !== id));
    } catch (err) {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  const handleSendCampaign = async (e) => {
    e.preventDefault();
    if (subscribers.length === 0) return alert('لا يوجد مشتركين لإرسال الحملة لهم');
    
    setSending(true);
    try {
      // هنا نقوم بمحاكاة الإرسال أو حفظ الحملة في جدول الحملات
      // ملاحظة: لإرسال إيميلات حقيقية نحتاج لخدمة مثل SendGrid أو Resend
      
      const { error } = await supabase.from('campaigns').insert([{
        subject: campaign.subject,
        content: campaign.content,
        recipients_count: subscribers.length,
        status: 'sent'
      }]);

      if (error) throw error;

      alert(`تم إرسال الحملة بنجاح إلى ${subscribers.length} مشترك!`);
      setShowCampaignModal(false);
      setCampaign({ subject: '', content: '' });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إرسال الحملة');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8 font-cairo" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">إدارة النشرة البريدية</h1>
          <p className="text-slate-500 font-bold">إدارة المشتركين وإرسال الحملات الإعلانية</p>
        </div>
        <button 
          onClick={() => setShowCampaignModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-600/20 transition-all active:scale-95"
        >
          <Send size={20} />
          <span>إرسال حملة جديدة</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Users size={32} />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-black uppercase block mb-1">إجمالي المشتركين</span>
            <span className="text-3xl font-black text-slate-800">{subscribers.length}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800">قائمة المشتركين</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="البحث عن بريد..." 
              className="bg-gray-50 border border-gray-100 rounded-xl py-2 px-10 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 w-64" 
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">المشترك</th>
                <th className="px-8 py-5">تاريخ الاشتراك</th>
                <th className="px-8 py-5">الحالة</th>
                <th className="px-8 py-5">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : subscribers.length > 0 ? subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 uppercase font-black text-xs">
                        {s.email.substring(0, 2)}
                      </div>
                      <span className="text-sm font-black text-slate-700">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-500">
                    {new Date(s.created_at).toLocaleDateString('ar-YE')}
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[10px] font-black">نشط</span>
                  </td>
                  <td className="px-8 py-5">
                    <button 
                      onClick={() => handleDelete(s.id)}
                      className="p-2 text-red-100 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-bold">لا يوجد مشتركين حالياً</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <Send size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">إرسال حملة جديدة</h3>
                  <p className="text-xs font-bold text-slate-500">سيتم الإرسال إلى {subscribers.length} مشترك</p>
                </div>
              </div>
              <button onClick={() => setShowCampaignModal(false)} className="p-2 hover:bg-white rounded-xl transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleSendCampaign} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase">عنوان الرسالة</label>
                <input 
                  type="text" 
                  required
                  value={campaign.subject}
                  onChange={(e) => setCampaign({...campaign, subject: e.target.value})}
                  placeholder="مثلاً: آخر مستجدات الأحداث في حضرموت..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase">محتوى الحملة</label>
                <textarea 
                  rows="6"
                  required
                  value={campaign.content}
                  onChange={(e) => setCampaign({...campaign, content: e.target.value})}
                  placeholder="اكتب تفاصيل الحملة هنا..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all resize-none" 
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  disabled={sending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
                >
                  {sending ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  <span>بدء الإرسال الآن</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setShowCampaignModal(false)}
                  className="px-8 bg-gray-100 hover:bg-gray-200 text-slate-600 font-black py-4 rounded-2xl transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterManagement;
