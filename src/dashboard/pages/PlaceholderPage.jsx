import React from 'react';

const PlaceholderPage = ({ title }) => (
  <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm min-h-[400px] flex items-center justify-center animate-in fade-in duration-500">
    <div className="text-center">
      <h1 className="text-3xl font-black text-slate-800 mb-4">{title}</h1>
      <p className="text-slate-400 font-bold">هذه الصفحة قيد التطوير حالياً</p>
    </div>
  </div>
);

export default PlaceholderPage;
