import {
  createContext,
  useContext
} from 'react';
import { signIn } from '@/api/auth/actions';
import { LoginSchema } from '@/api/auth/validations';
import { tokenService } from '@/api/token-service';
import { useAuthStore } from '@/store/auth-store';

interface AuthContextProps {
  user: User | null;
  login: (credentials: LoginSchema) => Promise<LoginResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const removeUser = useAuthStore((s) => s.removeUser);

  const login = async (credentials: LoginSchema) => {
    const response = await signIn(credentials);
    if (response.token) {
      const { token, user } = response;
      tokenService.saveToken(token);
      setUser(user);
    }

    return response;
  };

  const logout = () => {
    tokenService.clearToken();
    removeUser();
  };

  const isAuthenticated = !!useAuthStore((s) => s.user) && !!tokenService.getToken();

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
