import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Eye } from 'lucide-react';

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "تنمية حضرموت: مشاريع جديدة لتعزيز التنمية ودعم الاقتصاد المحلي",
      description: "تواصل الجهات الحكومية والجهات المحلية تنفيذ مشاريع تنموية في مختلف القطاعات تهدف لتحسين الخدمات وتوفير فرص العمل.",
      date: "20 مايو 2024",
      views: "1.2K",
      category: "أخبار وتحقيقات",
      image: "https://placehold.co/1000x500/e2e8f0/1e293b?text=صورة"
    },
    // More slides could be added here
  ];

  return (
    <div className="hero-slider">
      <div className="image-container">
        <img src={slides[activeSlide].image} alt="Hero" className="hero-image" />
        <div className="category-badge">{slides[activeSlide].category}</div>
        
        <button className="nav-btn prev">
          <ChevronRight size={24} />
        </button>
        <button className="nav-btn next">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="text-container">
        <h2 className="slide-title">{slides[activeSlide].title}</h2>
        <p className="slide-desc">{slides[activeSlide].description}</p>
        
        <div className="slide-footer">
          <div className="slide-meta">
            <span>{slides[activeSlide].date}</span>
            <span className="views">
              <Eye size={16} />
              {slides[activeSlide].views}
            </span>
          </div>
          <div className="slide-indicators">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`indicator ${i === activeSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-slider {
          display: flex;
          flex-direction: column;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid #f1f5f9;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .hero-slider:hover .hero-image {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: var(--accent-red);
          color: #fff;
          padding: 0.5rem 1.2rem;
          font-size: 0.9rem;
          font-weight: 800;
          border-radius: 8px;
          z-index: 5;
        }

        .text-container {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .slide-title {
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1.3;
          color: #09264d;
          margin: 0;
        }

        .slide-desc {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        .slide-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          border-top: 1px solid #f1f5f9;
          padding-top: 1.5rem;
        }

        .slide-meta {
          display: flex;
          gap: 2rem;
          font-size: 0.95rem;
          color: #94a3b8;
          font-weight: 700;
        }

        .views {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .slide-indicators {
          display: flex;
          gap: 0.6rem;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          cursor: pointer;
          transition: 0.3s;
        }

        .indicator.active {
          background: var(--accent-red);
          transform: scale(1.4);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #09264d;
          transition: 0.3s;
          z-index: 10;
          border: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .nav-btn:hover {
          background: var(--accent-red);
          color: #fff;
          transform: translateY(-50%) scale(1.1);
        }

        .prev { right: 20px; }
        .next { left: 20px; }

        @media (max-width: 1024px) {
          .slide-title { font-size: 1.8rem; }
          .image-container { height: 320px; }
          .text-container { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .image-container { height: 260px; }
          .text-container { padding: 1.5rem; }
          .slide-title { font-size: 1.4rem; }
          .slide-desc { font-size: 1rem; }
          .nav-btn { width: 35px; height: 35px; }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
