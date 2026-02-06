import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur border-b border-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-text no-underline">
            <span className="text-primary">&#9670;</span>
            <span>Learn Monad</span>
          </Link>

          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-text'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tracks/freshman"
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-text'}`
              }
            >
              Tracks
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-text'}`
              }
            >
              Leaderboard
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-text'}`
              }
            >
              Jobs
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-text'}`
              }
            >
              Profile
            </NavLink>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-5 rounded-full bg-surface-light cursor-pointer border-none transition-colors flex-shrink-0"
              aria-label="Toggle theme"
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${
                  theme === 'light'
                    ? 'left-5.5 bg-yellow-400'
                    : 'left-0.5 bg-primary'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted hidden sm:inline">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-sm text-muted hover:text-text transition-colors cursor-pointer bg-transparent border-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-muted hover:text-text transition-colors no-underline"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors no-underline"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
