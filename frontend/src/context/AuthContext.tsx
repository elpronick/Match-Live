import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../api/authApi';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function formatError(detail) {
  if (detail == null) return 'Algo salió mal. Intenta de nuevo.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) return detail.map(e => e?.msg || JSON.stringify(e)).join(' ');
  if (detail?.msg) return detail.msg;
  return String(detail);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // null = checking, false = not auth
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const loggedUser = await loginUser(email, password);
      setUser(loggedUser);
      return { success: true };
    } catch (e) {
      return { success: false, error: formatError(e.response?.data?.detail) };
    }
  };

  const register = async (formData) => {
    try {
      const createdUser = await registerUser(formData);
      setUser(createdUser);
      return { success: true };
    } catch (e) {
      return { success: false, error: formatError(e.response?.data?.detail) };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {}
    setUser(false);
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await updateUserProfile(profileData);
      setUser(updatedUser);
      return { success: true };
    } catch (e) {
      return { success: false, error: formatError(e.response?.data?.detail) };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
