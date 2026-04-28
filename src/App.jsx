import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';

// Pages
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

// Details
import PostDetailsPage from './pages/PostDetailsPage';
import StoryDetailsPage from './pages/StoryDetailsPage';
import InvestigationDetailsPage from './pages/InvestigationDetailsPage';
import StatisticsDetailsPage from './pages/StatisticsDetailsPage';
import CartoonsDetailsPage from './pages/CartoonsDetailsPage';
import ArticleDetailsPage from './pages/ArticleDetailsPage';
import StudyDetailsPage from './pages/StudyDetailsPage';
import CrossMediaDetailsPage from './pages/CrossMediaDetailsPage';

// Static
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import AdvertisePage from './pages/AdvertisePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="app" dir="rtl">
      <Header />
      <NewsTicker />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Main Categories */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/investigation" element={<InvestigationPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/cartoons" element={<CartoonsPage />} />
          <Route path="/article" element={<ArticlesPage />} />
          <Route path="/studies" element={<StudiesPage />} />

          {/* Static Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Details */}
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="/story/:id" element={<StoryDetailsPage />} />
          <Route path="/investigation/:id" element={<InvestigationDetailsPage />} />
          <Route path="/statistics/:id" element={<StatisticsDetailsPage />} />
          <Route path="/cartoon/:id" element={<CartoonsDetailsPage />} />
          <Route path="/article/:id" element={<ArticleDetailsPage />} />
          <Route path="/study/:id" element={<StudyDetailsPage />} />
          <Route path="/report/:id" element={<CrossMediaDetailsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
