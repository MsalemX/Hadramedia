import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Successful login
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.message === 'Invalid login credentials') {
        setError('خطأ في البريد الإلكتروني أو كلمة المرور');
      } else if (err.message === 'Email not confirmed') {
        setError('يجب تأكيد البريد الإلكتروني أولاً');
      } else {
        setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fb] font-cairo" dir="rtl">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-[#09264d] mb-4">تسجيل الدخول</h1>
          <p className="text-gray-500 font-bold">مرحباً بك مجدداً في لوحة تحكم حضرميديا</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">كلمة المرور</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold"
              placeholder="أدخل كلمة المرور"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#09264d] hover:bg-blue-900 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 text-lg flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                جاري الدخول...
              </>
            ) : "دخول"}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-gray-400 font-bold hover:text-slate-600 transition-colors">
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

