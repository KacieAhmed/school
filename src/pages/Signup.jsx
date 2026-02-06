import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const result = signup(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-heading text-center mb-2">Create Account</h1>
        <p className="text-muted text-center mb-8">Start your Monad development journey</p>

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
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-input-bg border border-input-border focus:border-primary rounded-lg px-4 py-3 text-text outline-none transition-colors"
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer border-none"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-light no-underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
