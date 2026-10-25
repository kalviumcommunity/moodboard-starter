import { createContext, useContext, useState } from 'react';

// TODO (Exp 3 — Context API):
// Keep the JWT in a Context. Provide login(token) and logout(), and a useAuth() hook.
// Keep the raw context object private; export only AuthProvider and useAuth.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // TODO: const login = (t) => setToken(t);
  // TODO: const logout = () => setToken(null);
  const value = { token /* , login, logout */ };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
