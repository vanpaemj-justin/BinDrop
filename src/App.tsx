import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import BookingFlow from './components/BookingFlow';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';

type View = 'landing' | 'booking' | 'login' | 'admin';

function App() {
  const [view, setView] = useState<View>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      if (isAuthenticated) {
        setView('admin');
      } else {
        setView('login');
      }
    } else if (path === '/booking') {
      setView('booking');
    } else if (path === '/login') {
      setView('login');
    } else {
      setView('landing');
    }
  }, [isAuthenticated]);

  const navigateTo = (newView: View) => {
    if (newView === 'admin' && !isAuthenticated) {
      setView('login');
      window.history.pushState({}, '', '/login');
    } else {
      setView(newView);
      window.history.pushState({}, '', newView === 'landing' ? '/' : `/${newView}`);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigateTo('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo('landing');
  };

  return (
    <>
      {view === 'landing' && (
        <LandingPage
          onStartBooking={() => navigateTo('booking')}
          onAdminClick={() => navigateTo('login')}
        />
      )}
      {view === 'booking' && (
        <BookingFlow onCancel={() => navigateTo('landing')} />
      )}
      {view === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => navigateTo('landing')}
        />
      )}
      {view === 'admin' && isAuthenticated && (
        <AdminDashboard onBack={handleLogout} />
      )}
    </>
  );
}

export default App;
