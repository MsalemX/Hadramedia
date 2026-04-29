import React from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  UserCheck,
  Mail,
  Shield
} from 'lucide-react';

const UsersManagement = () => {
  const data = [
    { id: 1, name: 'أحمد المدير', email: 'admin@hadramedia.com', role: 'مدير النظام', status: 'نشط', lastLogin: 'منذ ساعتين' },
    { id: 2, name: 'سالم أحمد', email: 'salem@hadramedia.com', role: 'محرر أخبار', status: 'نشط', lastLogin: 'أمس' },
    { id: 3, name: 'هدى محمد', email: 'huda@hadramedia.com', role: 'صحفي', status: 'نشط', lastLogin: 'منذ 3 أيام' },
    { id: 4, name: 'منى السقاف', email: 'muna@hadramedia.com', role: 'صحفي', status: 'غير نشط', lastLogin: 'منذ شهر' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة المستخدمين</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} المستخدمين</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Plus size={20} />
          إضافة مستخدم جديد
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المستخدم</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">البريد الإلكتروني</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الصلاحية</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">آخر ظهور</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${item.name}&background=random`} className="w-10 h-10 rounded-xl" alt="" />
                      <span className="text-sm font-black text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-500">{item.email}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-blue-600" />
                      <span className="text-sm font-black text-slate-700">{item.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      item.status === 'نشط' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">{item.lastLogin}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
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

export default UsersManagement;
