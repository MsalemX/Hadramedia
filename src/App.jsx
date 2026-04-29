import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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

// Dashboard
import Login from './dashboard/pages/Login';
import DashboardLayout from './dashboard/components/DashboardLayout';
import MainDashboard from './dashboard/pages/MainDashboard';
import NewsManagement from './dashboard/pages/NewsManagement';
import StoriesManagement from './dashboard/pages/StoriesManagement';
import StudiesManagement from './dashboard/pages/StudiesManagement';
import CrossMediaManagement from './dashboard/pages/CrossMediaManagement';
import InvestigationsManagement from './dashboard/pages/InvestigationsManagement';
import ArticlesManagement from './dashboard/pages/ArticlesManagement';
import CartoonsManagement from './dashboard/pages/CartoonsManagement';
import CategoriesManagement from './dashboard/pages/CategoriesManagement';
import TagsManagement from './dashboard/pages/TagsManagement';
import UsersManagement from './dashboard/pages/UsersManagement';
import PermissionsManagement from './dashboard/pages/PermissionsManagement';
import NotificationsManagement from './dashboard/pages/NotificationsManagement';
import AdsManagement from './dashboard/pages/AdsManagement';
import StatsManagement from './dashboard/pages/StatsManagement';
import SettingsManagement from './dashboard/pages/SettingsManagement';
import NewsletterManagement from './dashboard/pages/NewsletterManagement';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const PublicLayout = () => (
    <div className="app" dir="rtl">
      <Header />
      <NewsTicker />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );

  return (
    <Routes>
      {/* Public routes wrapped with Header/NewsTicker/Footer */}
      <Route element={<PublicLayout />}>
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

        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Dashboard Routes (Protected) - rendered outside PublicLayout so no Header/Footer */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<MainDashboard />} />
        <Route path="news" element={<NewsManagement />} />
        <Route path="stories" element={<StoriesManagement />} />
        <Route path="studies" element={<StudiesManagement />} />
        <Route path="cross-media" element={<CrossMediaManagement />} />
        <Route path="investigations" element={<InvestigationsManagement />} />
        <Route path="articles" element={<ArticlesManagement />} />
        <Route path="cartoons" element={<CartoonsManagement />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="tags" element={<TagsManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="permissions" element={<PermissionsManagement />} />
        <Route path="notifications" element={<NotificationsManagement />} />
        <Route path="reports" element={<NotificationsManagement />} />
        <Route path="ads" element={<AdsManagement />} />
        <Route path="stats" element={<StatsManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
        <Route path="newsletter" element={<NewsletterManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
