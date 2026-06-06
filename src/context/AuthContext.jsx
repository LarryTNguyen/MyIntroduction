import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { profile } from '../data/profile.js';
import { absoluteAppPath } from '../lib/sitePaths.js';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) setAuthError(error.message);
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setAuthError('');
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const user = session?.user ?? null;
  const isAdmin = user?.email?.toLowerCase() === profile.adminEmail.toLowerCase();

  async function signInWithGoogle() {
    if (!supabase) {
      setAuthError('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.');
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: absoluteAppPath('/admin'),
      },
    });

    if (error) setAuthError(error.message);
  }

  async function signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) setAuthError(error.message);
  }

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      authError,
      isAdmin,
      isSupabaseConfigured,
      signInWithGoogle,
      signOut,
    }),
    [session, user, loading, authError, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
