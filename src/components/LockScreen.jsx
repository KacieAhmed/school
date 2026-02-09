import { useState } from 'react';

const PASSWORD = 'devrelmonadteam';

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (password === PASSWORD) {
        sessionStorage.setItem('monad_unlocked', '1');
        onUnlock();
      } else {
        setError('Incorrect password.');
        setLoading(false);
      }
    }, 300);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Purple glow background */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(131,110,249,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ textAlign: 'center', padding: '2rem', position: 'relative', zIndex: 1 }}>
        {/* Monad logo */}
        <div style={{
          width: 64, height: 64, margin: '0 auto 1.5rem',
          filter: 'drop-shadow(0 0 30px rgba(131,110,249,0.4))',
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
            <path fill="#836EF9" d="M12 3c-2.599 0-9 6.4-9 9s6.401 9 9 9s9-6.401 9-9s-6.401-9-9-9m-1.402 14.146c-1.097-.298-4.043-5.453-3.744-6.549s5.453-4.042 6.549-3.743c1.095.298 4.042 5.453 3.743 6.549c-.298 1.095-5.453 4.042-6.549 3.743"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem',
          color: '#fff', letterSpacing: '-0.02em',
        }}>
          Monad <span style={{ color: '#836EF9' }}>School Demo</span>
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1.5rem' }}>
          Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              padding: '0.75rem 1rem', fontSize: '1rem',
              border: '1px solid #222', borderRadius: 8,
              background: '#111', color: '#fff', width: 260,
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#836EF9';
              e.target.style.boxShadow = '0 0 0 3px rgba(131,110,249,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#222';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem', fontSize: '1rem',
              border: 'none', borderRadius: 8,
              background: '#836EF9', color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600, opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? '...' : 'View'}
          </button>
        </form>

        {error && (
          <p style={{ color: '#ff6b6b', marginTop: '1rem', fontSize: '0.85rem' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
