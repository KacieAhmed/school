import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tracks } from '../data/tracks';
import { vibeTracks } from '../data/vibeTracks';
const allTracks = [...tracks, ...vibeTracks];
import { getTrackProgress, isLessonComplete } from '../utils/progress';
import ProgressBar from '../components/ProgressBar';
import LessonCard from '../components/LessonCard';

export default function Track() {
  const { trackId } = useParams();
  const { user } = useAuth();
  const track = allTracks.find(t => t.id === trackId);

  if (!track) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-heading mb-4">Track Not Found</h1>
        <Link to="/" className="text-primary hover:text-primary-light no-underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const email = user?.email;
  const progress = email ? getTrackProgress(email, track.id, track.lessons.length) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="text-muted hover:text-text text-sm no-underline mb-8 inline-block">
        &larr; Back to Tracks
      </Link>

      <div className="mb-10">
        <div className="text-5xl mb-4">{track.emoji}</div>
        <h1 className="text-3xl font-bold text-heading mb-3">{track.title}</h1>
        <p className="text-muted mb-6">{track.description}</p>
        <div className="flex items-center gap-3">
          <ProgressBar percentage={progress} />
          <span className="text-sm text-muted whitespace-nowrap">{progress}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {track.lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.slug}
            lesson={lesson}
            trackId={track.id}
            index={index}
            isComplete={email ? isLessonComplete(email, track.id, lesson.slug) : false}
          />
        ))}
      </div>
    </div>
  );
}
