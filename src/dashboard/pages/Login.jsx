import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fb] font-cairo" dir="rtl">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-[#09264d] mb-4">تسجيل الدخول</h1>
          <p className="text-gray-500 font-bold">مرحباً بك مجدداً في لوحة تحكم حضرميديا</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">اسم المستخدم</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold"
              placeholder="أدخل اسم المستخدم"
            />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-bold"
              placeholder="أدخل كلمة المرور"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-[#09264d] hover:bg-blue-900 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 text-lg"
          >
            دخول
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
