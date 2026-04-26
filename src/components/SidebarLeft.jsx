import React from 'react';
import { Mail, Globe, MessageCircle, PlayCircle } from 'lucide-react';

const SidebarLeft = () => {
  const socials = [
    { name: 'فيسبوك', count: '125K', color: '#1877F2', icon: <Globe size={18} /> },
    { name: 'تويتر', count: '89K', color: '#1d9bf0', icon: <MessageCircle size={18} /> },
    { name: 'إنستقرام', count: '74K', color: '#E4405F', icon: <PlayCircle size={18} /> },
    { name: 'يوتيوب', count: '45K', color: '#FF0000', icon: <PlayCircle size={18} /> },
  ];

  return (
    <div className="sidebar-left">
      <div className="newsletter glass">
        <div className="newsletter-icon">
          <Mail size={48} color="#3b82f6" />
        </div>
        <h4>اشترك في نشرتنا الإخبارية</h4>
        <p>احصل على آخر الأخبار والتحديثات مباشرة إلى بريدك</p>
        <div className="newsletter-form">
          <input type="email" placeholder="أدخل بريدك الإلكتروني" />
          <button>اشترك الآن</button>
        </div>
      </div>

      <div className="social-stats">
        <h4 className="section-title">تابعونا</h4>
        <div className="social-grid">
          {socials.map((social, index) => (
            <div key={index} className="social-card" style={{ background: social.color }}>
              <div className="social-info">
                {social.icon}
                <div className="social-meta">
                  <span className="count">{social.count}</span>
                  <span className="name">{social.name}</span>
                </div>
              </div>
              <button className="follow-btn">متابعة</button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sidebar-left {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .newsletter {
          padding: 2.5rem 2rem;
          text-align: center;
          background: #1e293b;
          border-radius: 15px;
          color: #fff;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }

        .newsletter-icon {
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.1);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .newsletter h4 {
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .newsletter p {
          font-size: 0.95rem;
          color: #94a3b8;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .newsletter-form input {
          width: 100%;
          padding: 1rem 1.2rem;
          border-radius: 10px;
          background: #0f172a;
          border: 1px solid #334155;
          color: #fff;
          margin-bottom: 1rem;
          outline: none;
          font-family: inherit;
        }

        .newsletter-form button {
          width: 100%;
          padding: 1rem;
          border-radius: 10px;
          background: var(--accent-red);
          color: #fff;
          font-weight: 800;
          font-size: 1.1rem;
          box-shadow: 0 8px 20px rgba(208, 2, 27, 0.3);
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          border-right: 5px solid var(--accent-red);
          padding-right: 1.2rem;
          color: var(--primary-blue);
        }

        .social-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .social-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          color: #fff;
          transition: 0.3s;
        }

        .social-card:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }

        .social-info {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .social-meta {
          display: flex;
          flex-direction: column;
        }

        .count {
          font-weight: 900;
          font-size: 1.3rem;
        }

        .name {
          font-size: 0.85rem;
          font-weight: 700;
          opacity: 0.8;
        }

        .follow-btn {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 800;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SidebarLeft;
