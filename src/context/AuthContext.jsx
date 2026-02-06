import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'monad_learn_users';
const SESSION_KEY = 'monad_learn_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  function getUsers() {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  }

  function signup(email, password) {
    const users = getUsers();
    if (users[email]) {
      return { error: 'An account with this email already exists.' };
    }
    users[email] = { email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session = { email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }

  function login(email, password) {
    const users = getUsers();
    if (!users[email] || users[email].password !== password) {
      return { error: 'Invalid email or password.' };
    }
    const session = { email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
