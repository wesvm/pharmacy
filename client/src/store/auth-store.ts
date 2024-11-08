import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  removeUser(): void;
}

export const useAuthStore = create(persist(immer<AuthStore>((set) => ({
  user: null,
  setUser: (acc) => set((s) => {
    s.user = acc;
  }),
  removeUser: () => set((s) => { s.user = null }),
})),
  {
    name: 'user-info'
  }
));