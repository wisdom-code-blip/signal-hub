'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
export type UserRole = 'buyer' | 'provider' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified?: boolean;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (data: SignUpData) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// ─────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('signalhub_user');
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    setLoading(true);
    try {
      // TODO: Replace with Supabase → supabase.auth.signInWithPassword({ email, password })
      await new Promise(r => setTimeout(r, 800));
      if (!email || !password) return { error: 'Please fill in all fields.' };
      if (password.length < 6) return { error: 'Incorrect email or password.' };
      const mockUser: AuthUser = {
        id: 'mock_' + Date.now(),
        email,
        name: email.split('@')[0],
        role: 'buyer',
        verified: false,
      };
      setUser(mockUser);
      localStorage.setItem('signalhub_user', JSON.stringify(mockUser));
      return {};
    } catch {
      return { error: 'Something went wrong. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData): Promise<{ error?: string }> => {
    setLoading(true);
    try {
      // TODO: Replace with Supabase → supabase.auth.signUp + profiles insert
      await new Promise(r => setTimeout(r, 800));
      if (!data.email || !data.password || !data.name) return { error: 'Please fill in all fields.' };
      if (data.password.length < 6) return { error: 'Password must be at least 6 characters.' };
      const newUser: AuthUser = {
        id: 'mock_' + Date.now(),
        email: data.email,
        name: data.name,
        role: data.role,
        verified: false,
      };
      setUser(newUser);
      localStorage.setItem('signalhub_user', JSON.stringify(newUser));
      return {};
    } catch {
      return { error: 'Something went wrong. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    // TODO: await supabase.auth.signOut()
    setUser(null);
    localStorage.removeItem('signalhub_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}