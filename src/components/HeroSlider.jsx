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
    <div className="hero-slider glass">
      <div className="slide-content">
        <img src={slides[activeSlide].image} alt="Hero" className="hero-image" />
        <div className="slide-overlay">
          <div className="category-badge">{slides[activeSlide].category}</div>
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

        <button className="nav-btn prev">
          <ChevronRight size={24} />
        </button>
        <button className="nav-btn next">
          <ChevronLeft size={24} />
        </button>
      </div>

      <style>{`
        .hero-slider {
          position: relative;
          width: 100%;
          height: 520px;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .slide-content {
          position: relative;
          width: 100%;
          height: 100%;
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

        .slide-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 6rem 3rem 2.5rem;
          background: linear-gradient(transparent, rgba(0, 26, 61, 0.95));
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .category-badge {
          background: var(--accent-red);
          color: #fff;
          padding: 0.4rem 1rem;
          font-size: 0.9rem;
          font-weight: 800;
          width: fit-content;
        }

        .slide-title {
          font-size: 2.8rem;
          font-weight: 900;
          line-height: 1.1;
          max-width: 850px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .slide-desc {
          font-size: 1.1rem;
          color: #f1f5f9;
          max-width: 750px;
          opacity: 0.9;
          line-height: 1.5;
        }

        .slide-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 1.5rem;
        }

        .slide-meta {
          display: flex;
          gap: 2rem;
          font-size: 0.95rem;
          color: #cbd5e1;
          font-weight: 600;
        }

        .views {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .slide-indicators {
          display: flex;
          gap: 0.8rem;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: 0.3s;
        }

        .indicator.active {
          background: var(--accent-red);
          transform: scale(1.3);
          box-shadow: 0 0 10px var(--accent-red);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: 0.3s;
          z-index: 10;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-btn:hover {
          background: var(--accent-red);
          border-color: var(--accent-red);
          transform: translateY(-50%) scale(1.1);
        }

        .prev { right: 25px; }
        .next { left: 25px; }

        @media (max-width: 1024px) {
          .slide-title { font-size: 2rem; }
          .hero-slider { height: 450px; }
        }

        @media (max-width: 768px) {
          .hero-slider { height: 380px; }
          .slide-overlay { padding: 4rem 1.5rem 1.5rem; }
          .slide-title { font-size: 1.6rem; }
          .slide-desc { display: none; }
          .nav-btn { width: 40px; height: 40px; }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
