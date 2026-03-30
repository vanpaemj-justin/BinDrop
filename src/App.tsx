import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import BookingFlow from './components/BookingFlow';
import AdminDashboard from './components/AdminDashboard';

type View = 'landing' | 'booking' | 'admin';

function App() {
  const [view, setView] = useState<View>('landing');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setView('admin');
    } else if (path === '/booking') {
      setView('booking');
    } else {
      setView('landing');
    }
  }, []);

  const navigateTo = (newView: View) => {
    setView(newView);
    window.history.pushState({}, '', newView === 'landing' ? '/' : `/${newView}`);
  };

  return (
    <>
      {view === 'landing' && (
        <LandingPage
          onStartBooking={() => navigateTo('booking')}
          onAdminClick={() => navigateTo('admin')}
        />
      )}
      {view === 'booking' && (
        <BookingFlow onCancel={() => navigateTo('landing')} />
      )}
      {view === 'admin' && (
        <AdminDashboard onBack={() => navigateTo('landing')} />
      )}
    </>
  );
}

export default App;
