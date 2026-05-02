import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ReaderTools from '../components/ReaderTools';

const ToolsPage = () => {
  return (
    <div className="bg-[#f7f8fb] min-h-screen pb-20 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8">
          <NavLink to="/" className="hover:text-blue-600 transition-colors">الرئيسية</NavLink>
          <ChevronLeft size={14} />
          <span className="text-slate-600">أدوات القارئ</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-red-600 rounded-full" />
            <h1 className="text-3xl md:text-4xl font-black text-[#09264d]">أدوات القارئ والباحث</h1>
          </div>
          <p className="text-slate-400 font-bold max-w-2xl">
            مجموعة من الأدوات الذكية المدعومة بالذكاء الاصطناعي لمساعدة القراء والباحثين في معالجة المحتوى الإعلامي والتحقق منه.
          </p>
        </div>

        {/* Tools Section */}
        <div className="max-w-4xl">
          <ReaderTools />
        </div>



      </div>
    </div>
  );
};

export default ToolsPage;
