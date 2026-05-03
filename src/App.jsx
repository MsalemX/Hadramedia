import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

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
import SearchPage from './pages/SearchPage';
import ToolsPage from './pages/ToolsPage';
import PodcastsPage from './pages/PodcastsPage';

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
import AdsManagement from './dashboard/pages/AdsManagement';
import StatsManagement from './dashboard/pages/StatsManagement';
import SettingsManagement from './dashboard/pages/SettingsManagement';
import NewsletterManagement from './dashboard/pages/NewsletterManagement';
import PodcastsManagement from './dashboard/pages/PodcastsManagement';
import PollsManagement from './dashboard/pages/PollsManagement';
import ContentEditor from './dashboard/pages/ContentEditor';

import { supabase } from './lib/supabase';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = React.useState(undefined);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f7f8fb]">
      <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


function App() {
  const PublicLayout = () => (
    <div className="app overflow-x-hidden min-h-screen" dir="rtl">
      <Header />
      <NewsTicker />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );

  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public routes wrapped with Header/NewsTicker/Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />

        {/* Main Categories */}
        <Route path="/events" element={<EventsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/investigation" element={<InvestigationPage />} />
        <Route path="/polls" element={<StatisticsPage />} />
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
        <Route path="/polls/:id" element={<StatisticsDetailsPage />} />
        <Route path="/cartoon/:id" element={<CartoonsDetailsPage />} />
        <Route path="/article/:id" element={<ArticleDetailsPage />} />
        <Route path="/study/:id" element={<StudyDetailsPage />} />
        <Route path="/cross-media/:id" element={<CrossMediaDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />

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
        <Route path="ads" element={<AdsManagement />} />
        <Route path="stats" element={<StatsManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
        <Route path="newsletter" element={<NewsletterManagement />} />
        <Route path="podcasts" element={<PodcastsManagement />} />
        <Route path="polls" element={<PollsManagement />} />
        <Route path="content/add" element={<ContentEditor />} />
        <Route path="content/edit/:id" element={<ContentEditor />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
