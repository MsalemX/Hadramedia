import React from 'react';

const ReportsSection = () => {
  const secondaryReports = [
    {
      title: "تحقيق خاص: أزمة المشتقات النفطية في المحافظات",
      image: "https://placehold.co/400x250/e2e8f0/1e293b?text=صورة",
      category: "تحقيق"
    },
    {
      title: "الكهرباء في حضرموت.. بين الواقع والمأمول",
      image: "https://placehold.co/400x250/e2e8f0/1e293b?text=صورة",
      category: "تقرير"
    }
  ];

  return (
    <div className="reports-section">
      <div className="section-header">
        <h3 className="section-title">تقارير وتحقيقات</h3>
        <a href="#" className="view-all">عرض الكل</a>
      </div>

      <div className="featured-report glass">
        <img src="https://placehold.co/800x450/e2e8f0/1e293b?text=صورة" alt="Featured" className="featured-img" />
        <div className="featured-overlay">
          <span className="featured-tag">تقرير خاص</span>
          <h4>ميناء الضبة.. بوابة حضرموت نحو الاقتصاد العالمي</h4>
          <p>تقرير شامل عن التطورات الأخيرة في ميناء الضبة وخططه المستقبلية لتعزيز دوره في دعم الاقتصاد الوطني.</p>
        </div>
      </div>

      <div className="secondary-reports">
        {secondaryReports.map((report, index) => (
          <div key={index} className="report-card glass">
            <div className="report-thumb">
              <img src={report.image} alt={report.title} />
              <span className="report-cat">{report.category}</span>
            </div>
            <h5 className="report-title">{report.title}</h5>
          </div>
        ))}
      </div>

      <style>{`
        .reports-section {
          width: 100%;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-right: 5px solid var(--accent-red);
          padding-right: 1.2rem;
        }

        .section-title {
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--primary-blue);
        }

        .view-all {
          color: var(--accent-red);
          font-weight: 800;
          font-size: 0.95rem;
          padding: 5px 15px;
          background: #fef2f2;
          border-radius: 6px;
        }

        .featured-report {
          position: relative;
          height: 380px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s;
        }

        .featured-report:hover .featured-img {
          transform: scale(1.05);
        }

        .featured-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 3rem 2rem 2rem;
          background: linear-gradient(transparent, rgba(0, 18, 43, 0.95));
          color: #fff;
        }

        .featured-tag {
          background: var(--accent-red);
          padding: 0.3rem 1rem;
          font-size: 0.85rem;
          font-weight: 800;
          border-radius: 4px;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .featured-overlay h4 {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 0.8rem;
          line-height: 1.2;
        }

        .featured-overlay p {
          font-size: 1rem;
          opacity: 0.9;
          line-height: 1.5;
          max-width: 90%;
        }

        .secondary-reports {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .report-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition: 0.3s;
        }

        .report-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }

        .report-thumb {
          position: relative;
          height: 180px;
        }

        .report-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .report-cat {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: var(--primary-blue);
          color: #fff;
          padding: 0.3rem 0.8rem;
          font-size: 0.8rem;
          font-weight: 800;
          border-radius: 4px;
        }

        .report-title {
          padding: 1.2rem;
          font-size: 1.15rem;
          font-weight: 900;
          line-height: 1.4;
          color: var(--text-dark);
        }

        @media (max-width: 768px) {
          .featured-report { height: 280px; }
          .featured-overlay h4 { font-size: 1.4rem; }
          .secondary-reports { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ReportsSection;
