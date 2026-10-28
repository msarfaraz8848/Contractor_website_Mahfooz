import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WebsiteDataProvider } from './context/WebsiteDataContext';
import { PublicHomePage } from './pages/PublicHomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminLayout, AdminTab } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { ManageSections } from './pages/admin/ManageSections';
import { ManageProjects } from './pages/admin/ManageProjects';
import { ManageProjectPhotos } from './pages/admin/ManageProjectPhotos';
import { ManageServices } from './pages/admin/ManageServices';
import { ManageAbout } from './pages/admin/ManageAbout';
import { ManageAchievements } from './pages/admin/ManageAchievements';
import { ManageLocations } from './pages/admin/ManageLocations';
import { ManageTestimonials } from './pages/admin/ManageTestimonials';
import { ManageContact } from './pages/admin/ManageContact';
import { ManageInquiries } from './pages/admin/ManageInquiries';
import { WebsiteSettingsPage } from './pages/admin/WebsiteSettingsPage';

type ViewMode = 'public' | 'login' | 'admin';

const MainApplication: React.FC = () => {
  const { isAdmin, isLoading } = useAuth();
  const [view, setView] = useState<ViewMode>('public');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // URL synchronizer: read path or hash on initial mount and history changes
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (pathname === '/admin/login' || hash === '#/admin/login' || hash === '#login') {
        setView('login');
      } else if (pathname === '/admin' || pathname.startsWith('/admin/') || hash === '#/admin' || hash === '#admin') {
        setView('admin');
      } else {
        setView('public');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (newView: ViewMode, path: string) => {
    setView(newView);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-3 border-gold-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
          Mohammad Mahfooz &bull; Initializing System...
        </span>
      </div>
    );
  }

  // 1. Admin Login Page
  if (view === 'login') {
    if (isAdmin) {
      // If already logged in, show dashboard
      return (
        <AdminLayout
          currentTab={adminTab}
          onTabChange={setAdminTab}
          onNavigateHome={() => navigateTo('public', '/')}
        >
          {renderAdminContent(adminTab, setAdminTab)}
        </AdminLayout>
      );
    }
    return (
      <AdminLoginPage
        onLoginSuccess={() => navigateTo('admin', '/admin')}
        onNavigateHome={() => navigateTo('public', '/')}
      />
    );
  }

  // 2. Admin Dashboard (Protected Route)
  if (view === 'admin') {
    if (!isAdmin) {
      // Unauthorized: redirect to login
      return (
        <AdminLoginPage
          onLoginSuccess={() => navigateTo('admin', '/admin')}
          onNavigateHome={() => navigateTo('public', '/')}
        />
      );
    }
    return (
      <AdminLayout
        currentTab={adminTab}
        onTabChange={setAdminTab}
        onNavigateHome={() => navigateTo('public', '/')}
      >
        {renderAdminContent(adminTab, setAdminTab)}
      </AdminLayout>
    );
  }

  // 3. Public Website
  return (
    <PublicHomePage
      onNavigateLogin={() => navigateTo('login', '/admin/login')}
      onNavigateAdmin={() => navigateTo('admin', '/admin')}
    />
  );
};

function renderAdminContent(tab: AdminTab, setTab: (t: AdminTab) => void) {
  switch (tab) {
    case 'overview':
      return <AdminOverview onNavigateTab={setTab} />;
    case 'sections':
      return <ManageSections />;
    case 'projects':
      return <ManageProjects onNavigateToPhotos={() => setTab('photos')} />;
    case 'photos':
      return <ManageProjectPhotos />;
    case 'services':
      return <ManageServices />;
    case 'about':
      return <ManageAbout />;
    case 'achievements':
      return <ManageAchievements />;
    case 'locations':
      return <ManageLocations />;
    case 'testimonials':
      return <ManageTestimonials />;
    case 'contact':
      return <ManageContact />;
    case 'inquiries':
      return <ManageInquiries />;
    case 'settings':
      return <WebsiteSettingsPage />;
    default:
      return <AdminOverview onNavigateTab={setTab} />;
  }
}

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <WebsiteDataProvider>
        <MainApplication />
      </WebsiteDataProvider>
    </AuthProvider>
  );
};

export default App;
