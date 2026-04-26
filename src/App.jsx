import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StudiesPage from './pages/StudiesPage';
import ArticlesPage from './pages/ArticlesPage';
import CartoonsPage from './pages/CartoonsPage';
import StoriesPage from './pages/StoriesPage';
import InvestigationPage from './pages/InvestigationPage';
import ReportsPage from './pages/ReportsPage';
import EventsPage from './pages/EventsPage';
import StatisticsPage from './pages/StatisticsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app" dir="rtl">
      <Header />
      <NewsTicker />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studies" element={<StudiesPage />} />
        <Route path="/article" element={<ArticlesPage />} />
        <Route path="/cartoons" element={<CartoonsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/investigation" element={<InvestigationPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
