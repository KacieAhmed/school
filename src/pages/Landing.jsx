import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tracks } from '../data/tracks';
import { vibeTracks } from '../data/vibeTracks';
import { getTrackProgress } from '../utils/progress';
import TrackCard from '../components/TrackCard';

export default function Landing() {
  const { user } = useAuth();
  const [mode, setMode] = useState('classic');
  const activeTracks = mode === 'classic' ? tracks : vibeTracks;

  return (
    <div className="min-h-[80vh]">
      {/* Hero */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-text mb-6 leading-tight">
            Become a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Monad Developer
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10">
            Master blockchain development on Monad — the high-performance EVM-compatible Layer 1. From basics to building production dApps.
          </p>
          {user ? (
            <a
              href="#tracks"
              onClick={(e) => { e.preventDefault(); document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-block bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all no-underline hover:scale-105 cursor-pointer"
            >
              Learn
            </a>
          ) : (
            <Link
              to="/signup"
              className="inline-block bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all no-underline hover:scale-105"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-text">10K+</div>
              <div className="text-sm text-muted mt-1">Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text">20</div>
              <div className="text-sm text-muted mt-1">Lessons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text">5K+</div>
              <div className="text-sm text-muted mt-1">Completions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <h2 className="text-3xl font-bold text-text">Learning Tracks</h2>

            {/* Mode toggle */}
            <div className="flex items-center bg-surface rounded-full border border-surface-light p-1">
              <button
                onClick={() => setMode('classic')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer border-none transition-all ${
                  mode === 'classic'
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-muted hover:text-text'
                }`}
              >
                Classic
              </button>
              <button
                onClick={() => setMode('vibe')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer border-none transition-all ${
                  mode === 'vibe'
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-muted hover:text-text'
                }`}
              >
                Vibe Coding
              </button>
            </div>
          </div>

          <p className="text-muted mb-12 max-w-xl">
            {mode === 'classic'
              ? 'Progress from blockchain basics to advanced Monad development across four comprehensive tracks.'
              : 'Build on Monad by prompting AI. No coding experience required — just ideas and iteration.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTracks.map(track => (
              <TrackCard
                key={track.id}
                track={track}
                progress={user ? getTrackProgress(user.email, track.id, track.lessons.length) : 0}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
