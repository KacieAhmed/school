import { Link } from 'react-router-dom';

export default function LessonCard({ lesson, trackId, index, isComplete }) {
  return (
    <Link
      to={`/tracks/${trackId}/${lesson.slug}`}
      className="block no-underline"
    >
      <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:border-primary/50 ${
        isComplete ? 'bg-success/5 border-success/20' : 'bg-surface border-surface-light'
      }`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
          isComplete ? 'bg-success text-white' : 'bg-surface-light text-muted'
        }`}>
          {isComplete ? '\u2713' : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{lesson.title}</h4>
          <p className="text-muted text-sm">{lesson.readingTime} min read</p>
        </div>
        <svg className="w-5 h-5 text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
