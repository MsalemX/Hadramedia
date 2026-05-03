import React, { useState } from 'react';
import { Share2, Link2, Check, MessageCircle } from 'lucide-react';

const ShareButtons = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title || "");
  const currentUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = [
    {
      name: 'واتساب',
      icon: (props) => <MessageCircle {...props} />,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'فيسبوك',
      icon: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'تويتر (X)',
      icon: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-black hover:bg-gray-800',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="share-section" className="mt-12 py-10 px-6 md:px-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
            <Share2 size={24} />
          </div>
          <div>
            <h4 className="font-black text-[#09264d] text-xl">شارك هذا الخبر</h4>
            <p className="text-slate-500 text-sm font-bold">ساهم في نشر الحقيقة عبر منصات التواصل</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {shareLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-black transition-all shadow-lg hover:-translate-y-1`}
            >
              <link.icon className="w-[18px] h-[18px]" />
              <span className="hidden sm:inline">{link.name}</span>
            </a>
          ))}
          
          <button
            onClick={copyToClipboard}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-black transition-all shadow-lg hover:-translate-y-1 relative group"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            <span className="hidden sm:inline">إنستقرام</span>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              انسخ الرابط وشاركه عبر إنستقرام
            </div>
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-black transition-all shadow-sm hover:-translate-y-1"
          >
            {copied ? <Check size={18} className="text-green-600" /> : <Link2 size={18} />}
            <span>{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;

