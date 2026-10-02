import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'yf_user';
const ACCOUNTS_KEY = 'yf_accounts';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error('Email and password are required');

    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    const account = accounts.find((a) => a.email === email.toLowerCase());

    if (!account || account.password !== password) {
      throw new Error('Invalid email or password');
    }

    const newUser = {
      id: account.id,
      name: account.name,
      email: account.email,
      grade: account.grade,
      stream: account.stream || '',
      school: account.school || '',
      role: 'student',
      profile_picture: account.profile_picture || null,
      interests: account.interests || [],
      selectedField: account.selectedField || '',
      goals: account.goals || '',
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const register = async ({ name, email, password, grade, stream, school }) => {
    if (!name || !email || !password) throw new Error('All fields are required');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    if (Number(grade) >= 11 && !stream) {
      throw new Error('Please select a stream for Grade 11/12');
    }

    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');

    if (accounts.some((a) => a.email === email.toLowerCase())) {
      throw new Error('Email already registered');
    }

    const newAccount = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password,
      grade: Number(grade),
      stream: Number(grade) >= 11 ? stream : '',
      school: school || '',
      profile_picture: null,
      interests: [],
      selectedField: '',
      goals: '',
    };

    accounts.push(newAccount);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    const newUser = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      grade: newAccount.grade,
      stream: newAccount.stream,
      school: newAccount.school,
      role: 'student',
      profile_picture: null,
      interests: [],
      selectedField: '',
      goals: '',
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
      const idx = accounts.findIndex((a) => a.id === updated.id);
      if (idx !== -1) {
        accounts[idx] = {
          ...accounts[idx],
          name: updated.name,
          grade: updated.grade,
          stream: updated.stream,
          school: updated.school,
          profile_picture: updated.profile_picture,
          interests: updated.interests,
          selectedField: updated.selectedField,
          goals: updated.goals,
        };
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      }

      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}