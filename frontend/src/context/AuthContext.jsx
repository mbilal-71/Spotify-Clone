import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore user from localStorage (non-sensitive data only)
  useEffect(() => {
    const cached = localStorage.getItem('spotify_user');
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch {
        localStorage.removeItem('spotify_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    const userData = data.user;
    setUser(userData);
    localStorage.setItem('spotify_user', JSON.stringify(userData));
    return data;
  };

  const register = async (credentials) => {
    const data = await registerUser(credentials);
    // Clear any token or state so the user must explicitly log in to enter
    try {
      await logoutUser();
    } catch {
      // Ignore
    }
    setUser(null);
    localStorage.removeItem('spotify_user');
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Even if API fails, clear local state
    }
    setUser(null);
    localStorage.removeItem('spotify_user');
  };

  const isAuthenticated = !!user;
  const isArtist = user?.role === 'artist';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isArtist,
        login,
        register,
        logout,
      }}
    >
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
