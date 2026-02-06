import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function TrackCard({ track, progress }) {
  return (
    <Link
      to={`/tracks/${track.id}`}
      className="block group no-underline"
    >
      <div className="relative bg-surface rounded-xl p-6 border border-surface-light hover:border-primary/50 transition-all duration-300 h-full">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="text-4xl mb-4">{track.emoji}</div>
          <h3 className="text-xl font-bold text-white mb-2">{track.title}</h3>
          <p className="text-muted text-sm mb-4 leading-relaxed">{track.description}</p>
          <div className="flex items-center justify-between text-xs text-muted mb-3">
            <span>{track.lessons.length} lessons</span>
            <span>{progress}% complete</span>
          </div>
          <ProgressBar percentage={progress} />
        </div>
      </div>
    </Link>
  );
}
