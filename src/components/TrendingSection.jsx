import React from 'react';

const TrendingSection = () => {
  const topics = [
    {
      id: "01",
      category: "اقتصاد",
      title: "ارتفاع أسعار الصرف في السوق المحلية",
      time: "منذ ساعة",
      image: "https://placehold.co/150x100/e2e8f0/1e293b?text=صورة"
    },
    {
      id: "02",
      category: "رياضة",
      title: "جدول مباريات الجولة القادمة في الخليج",
      time: "منذ ساعتين",
      image: "https://placehold.co/150x100/e2e8f0/1e293b?text=صورة"
    },
    {
      id: "03",
      category: "تقنية",
      title: "أدوات جديدة في عالم الذكاء الاصطناعي",
      time: "منذ 3 ساعات",
      image: "https://placehold.co/150x100/e2e8f0/1e293b?text=صورة"
    },
    {
      id: "44",
      category: "ثقافة",
      title: "فعاليات ثقافية وفنية في حضرموت",
      time: "منذ 5 ساعات",
      image: "https://placehold.co/150x100/e2e8f0/1e293b?text=صورة"
    }
  ];

  return (
    <div className="trending-section glass">
      <div className="section-header">
        <h3 className="section-title">مواضيع تهمك</h3>
      </div>

      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-rank">{topic.id}</div>
            <div className="topic-content">
              <span className="topic-cat">{topic.category}</span>
              <h5 className="topic-title">{topic.title}</h5>
              <span className="topic-time">{topic.time}</span>
            </div>
            <div className="topic-thumb">
              <img src={topic.image} alt={topic.title} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .trending-section {
          width: 100%;
          padding: 1.5rem;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .section-header {
          border-right: 5px solid var(--accent-red);
          padding-right: 1.2rem;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--primary-blue);
        }

        .topic-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid #f1f5f9;
          transition: 0.3s;
        }

        .topic-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .topic-item:hover {
          background: #f8fafc;
          padding-right: 5px;
        }

        .topic-rank {
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--accent-red);
          width: 45px;
          flex-shrink: 0;
          text-align: center;
        }

        .topic-content {
          flex: 1;
        }

        .topic-cat {
          font-size: 0.8rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
          display: block;
        }

        .topic-item:nth-child(1) .topic-cat { color: #1e40af; }
        .topic-item:nth-child(2) .topic-cat { color: #059669; }
        .topic-item:nth-child(3) .topic-cat { color: #7c3aed; }
        .topic-item:nth-child(4) .topic-cat { color: #be185d; }

        .topic-title {
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 0.4rem;
          line-height: 1.4;
          color: var(--text-dark);
          cursor: pointer;
        }

        .topic-time {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .topic-thumb {
          width: 80px;
          height: 70px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .topic-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default TrendingSection;
