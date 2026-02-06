import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile, saveProfile, getTotalCompleted, getTrackProgress } from '../utils/progress';
import { tracks } from '../data/tracks';
import { vibeTracks } from '../data/vibeTracks';
const allTracks = [...tracks, ...vibeTracks];
import { Navigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const email = user.email;
  const existing = getProfile(email);
  const [displayName, setDisplayName] = useState(existing.displayName || '');
  const [avatar, setAvatar] = useState(existing.avatar || '');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const totalCompleted = getTotalCompleted(email);
  const totalLessons = allTracks.reduce((sum, t) => sum + t.lessons.length, 0);

  function handleSave(e) {
    e.preventDefault();
    saveProfile(email, { displayName, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) {
      alert('Image must be under 500KB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    setAvatar('');
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-heading mb-8">Profile</h1>

      {/* Avatar + form */}
      <form onSubmit={handleSave} className="bg-surface rounded-xl border border-surface-light p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full bg-surface-light border-2 border-surface-light overflow-hidden flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-muted">
                  {(displayName || email)[0]?.toUpperCase() || '?'}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-xs text-primary hover:text-primary-light bg-transparent border border-primary/30 rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
              >
                Upload
              </button>
              {avatar && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="text-xs text-muted hover:text-red-400 bg-transparent border border-surface-light rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Fields */}
          <div className="flex-1 w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="How you appear on the leaderboard"
                className="w-full bg-input-bg border border-input-border focus:border-primary rounded-lg px-4 py-3 text-text outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Email</label>
              <p className="text-text text-sm bg-surface-light rounded-lg px-4 py-3">{email}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer border-none"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-success text-sm">Saved!</span>
          )}
        </div>
      </form>

      {/* Stats */}
      <div className="bg-surface rounded-xl border border-surface-light p-6">
        <h2 className="text-xl font-bold text-heading mb-4">Your Progress</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-light rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-heading">{totalCompleted}</div>
            <div className="text-xs text-muted mt-1">Lessons Completed</div>
          </div>
          <div className="bg-surface-light rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-heading">{totalLessons}</div>
            <div className="text-xs text-muted mt-1">Total Lessons</div>
          </div>
        </div>

        <div className="space-y-4">
          {allTracks.map(track => {
            const pct = getTrackProgress(email, track.id, track.lessons.length);
            return (
              <div key={track.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-text">{track.emoji} {track.title}</span>
                  <span className="text-xs text-muted">{pct}%</span>
                </div>
                <ProgressBar percentage={pct} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
