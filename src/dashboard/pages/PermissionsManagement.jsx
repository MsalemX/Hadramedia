import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck,
  Check,
  X,
  Plus,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PermissionsManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const allPermissions = ['إدارة المحتوى', 'إضافة محتوى', 'تعديل المحتوى الخاص', 'إدارة المستخدمين', 'الإحصائيات', 'إعدادات الموقع', 'إدارة التعليقات'];

  const fetchRoles = async () => {
    try {
      setLoading(true);
      // Assume a 'roles' table exists or use hardcoded if not found in DB
      const { data, error } = await supabase
        .from('roles')
        .select('*');

      if (error) {
        // Fallback to static if table doesn't exist yet
        setRoles([
          { name: 'مدير النظام', permissions: ['إدارة المحتوى', 'إدارة المستخدمين', 'الإحصائيات', 'إعدادات الموقع', 'إدارة التعليقات'] },
          { name: 'محرر', permissions: ['إدارة المحتوى', 'الإحصائيات', 'إدارة التعليقات'] },
          { name: 'صحفي', permissions: ['إضافة محتوى', 'تعديل المحتوى الخاص'] },
        ]);
      } else {
        setRoles(data || []);
      }
    } catch (err) {
      console.error("Error fetching roles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

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

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : roles.length > 0 ? (
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
                        {(role.permissions || []).includes(perm) ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <AlertCircle className="w-12 h-12 text-slate-300" />
            <p className="text-slate-400 font-bold">لا توجد أدوار حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionsManagement;
