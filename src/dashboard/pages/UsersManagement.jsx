import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  UserCheck,
  Mail,
  Shield,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'صحفي'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.password) {
      alert('يرجى ملء جميع الحقول بما في ذلك كلمة السر');
      return;
    }

    try {
      setSaving(true);
      
      // 1. إنشاء حساب في نظام Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
          }
        }
      });

      if (authError) throw authError;

      // 2. إضافة بياناته لجدول المستخدمين (Profiles)
      const { error: dbError } = await supabase
        .from('users')
        .insert([{
          name: formData.full_name,
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password, // إضافة كلمة السر هنا
          role: formData.role
        }]);

      if (dbError) throw dbError;
      
      alert('تم إنشاء الحساب بنجاح. قد يحتاج المستخدم لتأكيد بريده إذا كان الخيار مفعلاً في Supabase.');
      setFormData({ full_name: '', email: '', password: '', role: 'صحفي' });
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert(`خطأ: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) throw error;
        fetchUsers();
      } catch (err) {
        alert('خطأ أثناء الحذف');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة المستخدمين</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} المستخدمين</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة مستخدم جديد
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المستخدم</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">البريد الإلكتروني</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الصلاحية</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">
                          {(item.full_name || item.name)?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-700">{item.full_name || item.name}</h4>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-500">{item.email}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-blue-600" />
                        <span className="text-sm font-black text-slate-700">{item.role || 'صحفي'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={16} /></button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <AlertCircle className="w-12 h-12 text-slate-300" />
            <p className="text-slate-400 font-bold">لا يوجد مستخدمين حالياً</p>
          </div>
        )}
      </div>

      {/* Modal إضافة مستخدم */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-[#09264d] mb-6 flex items-center gap-2">
              <UserCheck className="text-blue-600" size={24} /> إضافة عضو جديد للفريق
            </h3>
            <form onSubmit={handleAddUser} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">الاسم الكامل</label>
                <input 
                  autoFocus
                  type="text" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="مثال: أحمد محمد..." 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">كلمة المرور</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="أدخل كلمة مرور قوية" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">الصلاحية</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none"
                >
                  <option value="صحفي">صحفي</option>
                  <option value="محرر">محرر</option>
                  <option value="مدير">مدير</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  {saving ? 'جاري الحفظ...' : 'إضافة المستخدم'}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 bg-gray-50 hover:bg-gray-100 text-slate-500 font-black py-4 rounded-2xl transition-all"
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

export default UsersManagement;
