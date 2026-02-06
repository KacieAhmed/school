import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { tracks } from '../data/tracks';
import { vibeTracks } from '../data/vibeTracks';
const allTracks = [...tracks, ...vibeTracks];
import { markLessonComplete, isLessonComplete } from '../utils/progress';
import Quiz from '../components/Quiz';

export default function Lesson() {
  const { trackId, lessonSlug } = useParams();
  const { user } = useAuth();
  const track = allTracks.find(t => t.id === trackId);
  const lessonIndex = track ? track.lessons.findIndex(l => l.slug === lessonSlug) : -1;
  const lesson = track ? track.lessons[lessonIndex] : null;

  const email = user?.email;
  const [completed, setCompleted] = useState(
    lesson && email ? isLessonComplete(email, trackId, lessonSlug) : false
  );

  if (!track || !lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-heading mb-4">Lesson Not Found</h1>
        <Link to="/" className="text-primary hover:text-primary-light no-underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const prevLesson = lessonIndex > 0 ? track.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < track.lessons.length - 1 ? track.lessons[lessonIndex + 1] : null;

  function handleQuizComplete(passed) {
    if (passed && !completed) {
      if (email) markLessonComplete(email, trackId, lessonSlug);
      setCompleted(true);
    }
  }

  function renderContent(block, i) {
    switch (block.type) {
      case 'heading':
        return <h2 key={i} className="text-xl font-bold text-heading mt-8 mb-4">{block.text}</h2>;
      case 'paragraph':
        return <p key={i} className="text-text leading-relaxed mb-4">{block.text}</p>;
      case 'code':
        return (
          <pre key={i} className="bg-surface border border-surface-light rounded-lg p-4 overflow-x-auto mb-4">
            <code className="text-sm text-primary font-mono whitespace-pre">{block.text}</code>
          </pre>
        );
      case 'list':
        return (
          <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-text">
            {block.items.map((item, j) => (
              <li key={j} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link to="/" className="hover:text-text no-underline text-muted">Home</Link>
        <span>/</span>
        <Link to={`/tracks/${trackId}`} className="hover:text-text no-underline text-muted">{track.title}</Link>
        <span>/</span>
        <span className="text-text">{lesson.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {completed && (
            <span className="inline-flex items-center gap-1 text-success text-sm font-medium bg-success/10 px-3 py-1 rounded-full">
              &#10003; Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-heading mb-2">{lesson.title}</h1>
        <p className="text-muted text-sm">{lesson.readingTime} min read</p>
      </div>

      {/* Content */}
      <div className="mb-12">
        {lesson.content.map((block, i) => renderContent(block, i))}
      </div>

      {/* Quiz */}
      {!completed && lesson.quiz && (
        <div className="mb-12">
          <Quiz questions={lesson.quiz} onComplete={handleQuizComplete} />
        </div>
      )}

      {/* Success message */}
      {completed && (
        <div className="mb-12 bg-success/10 border border-success/20 rounded-xl p-6 text-center">
          <p className="text-success text-lg font-medium">You've completed this lesson!</p>
          <p className="text-muted text-sm mt-1">
            {nextLesson ? 'Continue to the next lesson below.' : 'You finished this track!'}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-surface-light">
        {prevLesson ? (
          <Link
            to={`/tracks/${trackId}/${prevLesson.slug}`}
            className="text-muted hover:text-text text-sm no-underline"
          >
            &larr; {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            to={`/tracks/${trackId}/${nextLesson.slug}`}
            className="text-primary hover:text-primary-light text-sm no-underline"
          >
            {nextLesson.title} &rarr;
          </Link>
        ) : (
          <Link
            to={`/tracks/${trackId}`}
            className="text-primary hover:text-primary-light text-sm no-underline"
          >
            Back to Track &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
