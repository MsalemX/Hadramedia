import React from 'react';
import { Clock } from 'lucide-react';

const Sidebar = () => {
  const newsItems = [
    {
      category: "سياسة",
      title: "مجلس القيادة الرئاسي يقر حزمة من القرارات الهادفة",
      time: "منذ ساعة",
      image: "https://placehold.co/100x80/e2e8f0/1e293b?text=صورة"
    },
    {
      category: "رياضة",
      title: "المنتخب الوطني يتأهل إلى نصف نهائي كأس الخليج",
      time: "منذ ساعتين",
      image: "https://placehold.co/100x80/e2e8f0/1e293b?text=صورة"
    },
    {
      category: "تقنية",
      title: "الذكاء الاصطناعي في التعليم فرص وتحديات المستقبل",
      time: "منذ 3 ساعات",
      image: "https://placehold.co/100x80/e2e8f0/1e293b?text=صورة"
    }
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-content">
        {newsItems.map((item, index) => (
          <div key={index} className="news-card">
            <div className="news-info">
              <span className={`cat-label ${item.category === 'رياضة' ? 'sports' : item.category === 'تقنية' ? 'tech' : 'politics'}`}>
                {item.category}
              </span>
              <h4 className="news-title">{item.title}</h4>
              <div className="news-time">
                <Clock size={12} />
                <span>{item.time}</span>
              </div>
            </div>
            <div className="news-thumb">
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .sidebar {
          width: 100%;
          padding: 0;
          background: transparent;
        }

        .news-card {
          display: flex;
          flex-direction: row-reverse;
          gap: 1.2rem;
          padding: 1.2rem;
          background: #fff;
          border-radius: 12px;
          margin-bottom: 1.2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: var(--transition);
          border: 1px solid #f1f5f9;
        }

        .news-card:hover {
          transform: translateX(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .news-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cat-label {
          font-size: 0.8rem;
          font-weight: 800;
          margin-bottom: 0.4rem;
          display: block;
        }

        .cat-label.politics { color: #2563eb; }
        .cat-label.sports { color: #059669; }
        .cat-label.tech { color: #7c3aed; }

        .news-title {
          font-size: 1.1rem;
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 0.6rem;
          color: var(--text-dark);
          cursor: pointer;
        }

        .news-time {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .news-thumb {
          width: 100px;
          height: 85px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .news-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
