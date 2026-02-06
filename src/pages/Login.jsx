import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-heading text-center mb-2">Welcome Back</h1>
        <p className="text-muted text-center mb-8">Log in to continue learning</p>

        <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-surface-light p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-input-bg border border-input-border focus:border-primary rounded-lg px-4 py-3 text-text outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-input-bg border border-input-border focus:border-primary rounded-lg px-4 py-3 text-text outline-none transition-colors"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer border-none"
          >
            Log In
          </button>

          <p className="text-center text-sm text-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-light no-underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
