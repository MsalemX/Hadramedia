import React from 'react';
import { 
  Bell, 
  MessageCircle, 
  UserPlus, 
  AlertTriangle,
  CheckCircle2,
  MoreVertical,
  Trash2
} from 'lucide-react';

const NotificationsManagement = () => {
  const data = [
    { id: 1, type: 'alert', title: 'بلاغ جديد عن محتوى غير لائق', time: 'منذ 5 دقائق', status: 'unread', icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
    { id: 2, type: 'comment', title: 'سالم أحمد علق على مقال "تنمية حضرموت"', time: 'منذ ساعة', status: 'unread', icon: MessageCircle, color: 'text-blue-500 bg-blue-50' },
    { id: 3, type: 'user', title: 'تم تسجيل مستخدم جديد في الموقع', time: 'منذ ساعتين', status: 'read', icon: UserPlus, color: 'text-green-500 bg-green-50' },
    { id: 4, type: 'system', title: 'تم تحديث النظام إلى النسخة 2.4.0', time: 'منذ 5 ساعات', status: 'read', icon: CheckCircle2, color: 'text-purple-500 bg-purple-50' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">الإشعارات والتنبيهات</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الإشعارات</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            تحديد الكل كمقروء
          </button>
          <button className="bg-white border border-gray-100 hover:bg-gray-50 text-slate-600 px-6 py-3 rounded-2xl font-black text-sm shadow-sm transition-all active:scale-95">
            حذف الكل
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
        {data.map((item) => (
          <div key={item.id} className={`p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group cursor-pointer ${item.status === 'unread' ? 'border-r-4 border-blue-600 bg-blue-50/10' : ''}`}>
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div>
                <h3 className={`text-sm font-black transition-colors ${item.status === 'unread' ? 'text-slate-800' : 'text-slate-500'}`}>
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-bold mt-1">{item.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {item.status === 'unread' && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
              <button className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18} /></button>
              <button className="p-2 text-slate-300 hover:text-slate-600"><MoreVertical size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsManagement;
