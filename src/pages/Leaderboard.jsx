import { useAuth } from '../context/AuthContext';
import { getLeaderboard } from '../utils/progress';
import RankBadge from '../components/RankBadge';

export default function Leaderboard() {
  const { user } = useAuth();
  const entries = getLeaderboard();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Leaderboard</h1>
      <p className="text-muted mb-8">Top learners ranked by lessons completed.</p>

      {entries.length === 0 ? (
        <div className="bg-surface rounded-xl border border-surface-light p-10 text-center">
          <p className="text-muted">No completions yet. Be the first!</p>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-surface-light overflow-hidden">
          {entries.map((entry, i) => {
            const isYou = user?.email === entry.email;
            const name = entry.displayName || entry.email;
            return (
              <div
                key={entry.email}
                className={`flex items-center gap-3 px-5 py-3.5 border-b border-surface-light last:border-b-0 ${isYou ? 'bg-primary/5' : ''}`}
              >
                {/* Position */}
                <span className={`flex-shrink-0 w-7 text-center text-sm font-bold ${
                  i === 0 ? 'text-yellow-400' :
                  i === 1 ? 'text-gray-300' :
                  i === 2 ? 'text-orange-400' :
                  'text-muted'
                }`}>
                  {i + 1}
                </span>

                {/* Rank badge */}
                <RankBadge rank={entry.rank} size={30} />

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-surface-light overflow-hidden flex items-center justify-center flex-shrink-0">
                  {entry.avatar ? (
                    <img src={entry.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-muted font-bold">{name[0]?.toUpperCase()}</span>
                  )}
                </div>

                {/* Name + rank label */}
                <div className="flex-1 min-w-0">
                  <span className={`block truncate ${isYou ? 'text-primary font-medium' : 'text-text'}`}>
                    {name}{isYou ? ' (you)' : ''}
                  </span>
                  <span className="text-xs" style={{ color: entry.rank.color }}>
                    {entry.rank.name}
                  </span>
                </div>

                {/* Lesson count */}
                <span className="text-sm text-muted whitespace-nowrap">
                  {entry.completed} {entry.completed === 1 ? 'lesson' : 'lessons'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
