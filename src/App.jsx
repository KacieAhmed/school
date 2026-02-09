import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LockScreen from './components/LockScreen';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Track from './pages/Track';
import Lesson from './pages/Lesson';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';

export default function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('monad_unlocked') === '1');

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <ThemeProvider>
    <HashRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-dark-bg">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/tracks/:trackId" element={<Track />} />
              <Route path="/tracks/:trackId/:lessonSlug" element={<Lesson />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </HashRouter>
    </ThemeProvider>
  );
}
