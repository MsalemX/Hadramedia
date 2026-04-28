import React from 'react';
import { 
  ShieldCheck,
  Check,
  X,
  Plus
} from 'lucide-react';

const PermissionsManagement = () => {
  const roles = [
    { name: 'مدير النظام', permissions: ['إدارة المحتوى', 'إدارة المستخدمين', 'الإحصائيات', 'إعدادات الموقع', 'إدارة التعليقات'] },
    { name: 'محرر', permissions: ['إدارة المحتوى', 'الإحصائيات', 'إدارة التعليقات'] },
    { name: 'صحفي', permissions: ['إضافة محتوى', 'تعديل المحتوى الخاص'] },
  ];

  const allPermissions = ['إدارة المحتوى', 'إضافة محتوى', 'تعديل المحتوى الخاص', 'إدارة المستخدمين', 'الإحصائيات', 'إعدادات الموقع', 'إدارة التعليقات'];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">الصلاحيات والأدوار</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الصلاحيات</p>
        </div>
        <button className="bg-[#09264d] hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all active:scale-95">
          <Plus size={20} />
          إضافة دور جديد
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الدور (Role)</th>
                {allPermissions.map((perm, i) => (
                  <th key={i} className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{perm}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {roles.map((role, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-blue-600" />
                      <span className="text-sm font-black text-slate-700">{role.name}</span>
                    </div>
                  </td>
                  {allPermissions.map((perm, j) => (
                    <td key={j} className="px-4 py-5 text-center">
                      {role.permissions.includes(perm) ? (
                        <div className="w-6 h-6 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mx-auto">
                          <Check size={14} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-red-50 text-red-300 rounded-lg flex items-center justify-center mx-auto">
                          <X size={14} />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PermissionsManagement;
