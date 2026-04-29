import React from 'react';
import { 
  Mail, 
  Send, 
  Users, 
  Trash2, 
  Download,
  Plus,
  CheckCircle2
} from 'lucide-react';

const NewsletterManagement = () => {
  const subscribers = [
    { id: 1, email: 'user1@example.com', date: '20 مايو 2024', status: 'نشط' },
    { id: 2, email: 'user2@example.com', date: '19 مايو 2024', status: 'نشط' },
    { id: 3, email: 'user3@example.com', date: '18 مايو 2024', status: 'غير مؤكد' },
    { id: 4, email: 'user4@example.com', date: '17 مايو 2024', status: 'نشط' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">النشرة البريدية</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} النشرة البريدية</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Send size={18} />
          إرسال حملة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
            <Users size={32} />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase">إجمالي المشتركين</p>
            <h3 className="text-3xl font-black text-slate-800">1,450</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center">
            <Send size={32} />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase">حملات مرسلة</p>
            <h3 className="text-3xl font-black text-slate-800">12</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase">نسبة التفاعل</p>
            <h3 className="text-3xl font-black text-slate-800">24.5%</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800">قائمة المشتركين</h3>
          <button className="text-blue-600 text-xs font-black flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
            <Download size={16} /> تصدير القائمة (CSV)
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">البريد الإلكتروني</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الاشتراك</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">{item.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{item.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      item.status === 'نشط' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsletterManagement;
