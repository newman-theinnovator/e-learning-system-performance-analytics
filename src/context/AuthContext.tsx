import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      return true;
    }
    // Allow demo login
    if (email.includes('student') || email.includes('chidera')) {
      setUser(users[0]);
      return true;
    }
    if (email.includes('lecturer') || email.includes('ngozi')) {
      setUser(users[5]);
      return true;
    }
    if (email.includes('admin')) {
      setUser(users[7]);
      return true;
    }
    // Default: log in as student for demo
    setUser(users[0]);
    return true;
  };

  const logout = () => setUser(null);

  const switchRole = (role: UserRole) => {
    const roleUser = users.find(u => u.role === role);
    if (roleUser) setUser(roleUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
