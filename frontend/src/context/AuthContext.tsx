import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../api/authApi';

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  city?: string | null;
  budget?: number | null;
  lifestyle?: string | null;
  description?: string | null;
  avatarUrl?: string | null;
  age?: number | null;
}

export interface RegisterFormData {
  email: string;
  password: string;
  name?: string;
  city?: string;
  budget?: number;
  lifestyle?: string;
  description?: string;
}

export interface UpdateProfileData {
  name?: string;
  city?: string;
  budget?: number;
  lifestyle?: string;
  description?: string;
  avatarUrl?: string;
  age?: number;
}

interface AuthContextType {
  user: AuthUser | false | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (formData: RegisterFormData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (profileData: UpdateProfileData) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

function formatError(detail: unknown): string {
  if (detail == null) return 'Algo salió mal. Intenta de nuevo.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((e) => {
        if (typeof e === 'object' && e !== null && 'msg' in e) {
          return String((e as { msg: unknown }).msg);
        }
        return JSON.stringify(e);
      })
      .join(' ');
  }
  if (typeof detail === 'object' && 'msg' in detail) {
    return String((detail as { msg: unknown }).msg);
  }
  return String(detail);
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const res = (error as { response?: { data?: { message?: string; detail?: string } } }).response;
    return formatError(res?.data?.message || res?.data?.detail);
  }
  return formatError(error);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | false | null>(null); // null = checking, false = not auth
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user);
    } catch {
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getCurrentUser()
      .then((response) => {
        if (isMounted) setUser(response.user);
      })
      .catch(() => {
        if (isMounted) setUser(false);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: getErrorMessage(e) };
    }
  };

  const register = async (formData: RegisterFormData) => {
    try {
      const response = await registerUser(formData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: getErrorMessage(e) };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err: unknown) {
      console.error('Error during logout:', err);
    }
    localStorage.removeItem('token');
    setUser(false);
  };

  const updateProfile = async (profileData: UpdateProfileData) => {
    try {
      const updatedUser = await updateUserProfile(profileData);
      setUser(updatedUser);
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: getErrorMessage(e) };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
