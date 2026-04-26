import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <main className="page-page page-notfound container">
            <div className="notfound-panel glass">
                <h1>404</h1>
                <p>الصفحة التي تبحث عنها غير موجودة.</p>
                <Link to="/" className="home-link">العودة إلى الصفحة الرئيسية</Link>
            </div>

            <style>{`
        .page-notfound { padding: 6rem 0; display: flex; justify-content: center; align-items: center; }
        .notfound-panel { text-align: center; padding: 3rem 2rem; max-width: 520px; }
        .notfound-panel h1 { font-size: 5rem; margin-bottom: 1rem; }
        .notfound-panel p { color: var(--text-muted); margin-bottom: 1.5rem; font-size: 1.1rem; }
        .home-link { display: inline-block; padding: 0.95rem 1.8rem; border-radius: 999px; background: var(--accent-blue); color: #fff; font-weight: 700; }
      `}</style>
        </main>
    );
};

export default NotFoundPage;
