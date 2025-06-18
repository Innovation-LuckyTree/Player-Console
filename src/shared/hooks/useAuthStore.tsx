import { create } from 'zustand';
import { AuthResponse } from '../types/UserAuth';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: AuthResponse | null;
  setUserAuth: ( user: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        token: '',
        setUserAuth: ( user) =>
          set({ user,  isAuthenticated: true }, false, 'setUserAuth'),
        logout: () =>
          (set({ user: null, isAuthenticated: false  }, false, 'logout'),
          localStorage.removeItem('auth-storage')),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      }
    ),
    { name: 'AuthStore' }
  )
);