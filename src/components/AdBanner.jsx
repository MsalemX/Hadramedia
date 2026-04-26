import React from 'react';

const AdBanner = () => {
  return (
    <div className="ad-banner glass">
      <div className="ad-content">
        <div className="ad-text">
          <h2>مساحة إعلانية</h2>
          <p>ضع إعلانك هنا ووصل إلى آلاف القراء يومياً</p>
          <button className="ad-btn">اعرف المزيد</button>
        </div>
        <div className="ad-image">
          <img src="https://placehold.co/1200x120/e2e8f0/1e293b?text=إعلان" alt="Advertisement" />
        </div>
      </div>
      <div className="ad-tag">728x90</div>

      <style>{`
        .ad-banner {
          width: 100%;
          height: 140px;
          margin: 3rem 0;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(29, 78, 216, 0.2);
          display: flex;
          align-items: center;
        }

        .ad-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 4rem;
          position: relative;
          z-index: 2;
        }

        .ad-text {
          color: #fff;
          text-align: center;
          flex: 1;
        }

        .ad-text h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 0.1rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .ad-text p {
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .ad-btn {
          background: #2563eb;
          color: #fff;
          padding: 0.7rem 2.2rem;
          border-radius: 8px;
          font-weight: 800;
          font-size: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: 0.3s;
        }

        .ad-btn:hover {
          background: #fff;
          color: #1e40af;
          transform: translateY(-2px);
        }

        .ad-image {
          height: 200px;
          width: 200px;
          position: absolute;
          right: 20px;
          top: -30px;
          opacity: 0.2;
          background-image: url('https://www.svgrepo.com/show/512489/megaphone.svg');
          background-size: contain;
          background-repeat: no-repeat;
          filter: brightness(0) invert(1);
          pointer-events: none;
        }

        .ad-tag {
          position: absolute;
          bottom: 10px;
          left: 15px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .ad-text h2 { font-size: 1.8rem; }
          .ad-image { display: none; }
        }
      `}</style>
    </div>
  );
};

export default AdBanner;
