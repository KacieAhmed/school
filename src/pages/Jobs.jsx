import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTotalCompleted, getRank } from '../utils/progress';
import RankBadge from '../components/RankBadge';

const jobs = [
  {
    id: 1,
    title: 'Developer Intern — Bug Fixer',
    team: 'Learn Monad Platform',
    location: 'Remote',
    type: 'Internship',
    description:
      'Help Learn Monad users squash bugs across the platform. You\'ll triage user-reported issues, reproduce bugs, and ship fixes to keep the learning experience smooth.',
    responsibilities: [
      'Triage and reproduce bugs reported by learners',
      'Write clean, tested fixes for frontend and smart-contract issues',
      'Collaborate with the core team on weekly bug-bash sprints',
      'Improve error messages and edge-case handling',
    ],
  },
  {
    id: 2,
    title: 'Developer Intern — QA & Tooling',
    team: 'Learn Monad Platform',
    location: 'Remote',
    type: 'Internship',
    description:
      'Build internal tooling and automated tests that catch issues before users do. You\'ll strengthen the reliability of our lesson runner, quiz engine, and progress tracker.',
    responsibilities: [
      'Write end-to-end and unit tests for core platform features',
      'Build internal dashboards to surface error trends',
      'Automate regression testing for lesson content updates',
      'Document testing playbooks for the team',
    ],
  },
];

const masterRank = getRank(28); // Master threshold reference

export default function Jobs() {
  const { user } = useAuth();
  const completed = user ? getTotalCompleted(user.email) : 0;
  const rank = user ? getRank(completed) : getRank(0);
  const eligible = rank.name === 'Master' || rank.name === 'Grandmaster';

  const [applied, setApplied] = useState({});

  function handleApply(jobId) {
    setApplied((prev) => ({ ...prev, [jobId]: true }));
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text mb-2">Jobs</h1>
      <p className="text-muted mb-4">Intern opportunities for top learners.</p>

      {/* Eligibility banner */}
      <div className={`rounded-xl border px-5 py-4 mb-8 flex items-center gap-3 ${eligible ? 'border-success/40 bg-success/5' : 'border-surface-light bg-surface'}`}>
        <RankBadge rank={masterRank} size={32} />
        <div>
          <p className={`text-sm font-semibold ${eligible ? 'text-success' : 'text-text'}`}>
            {eligible
              ? 'You meet the rank requirement — you can apply!'
              : 'Master rank or higher required to apply'}
          </p>
          {user ? (
            <p className="text-xs text-muted mt-0.5">
              Your rank: <span style={{ color: rank.color }} className="font-medium">{rank.name}</span> ({completed}/40 lessons)
            </p>
          ) : (
            <p className="text-xs text-muted mt-0.5">Log in to check your eligibility.</p>
          )}
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-surface rounded-xl border border-surface-light p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-lg font-bold text-text">{job.title}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                  <span>{job.team}</span>
                  <span>·</span>
                  <span>{job.location}</span>
                  <span>·</span>
                  <span>{job.type}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted mb-4">{job.description}</p>

            <h3 className="text-sm font-semibold text-text mb-2">Responsibilities</h3>
            <ul className="list-disc list-inside text-sm text-muted space-y-1 mb-5">
              {job.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            {applied[job.id] ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-success font-medium">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Application submitted
              </span>
            ) : (
              <button
                disabled={!eligible}
                onClick={() => handleApply(job.id)}
                className={`text-sm font-medium px-5 py-2 rounded-lg transition-colors border-none cursor-pointer ${
                  eligible
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'bg-surface-light text-muted cursor-not-allowed'
                }`}
              >
                {eligible ? 'Apply Now' : 'Locked — Reach Master Rank'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
