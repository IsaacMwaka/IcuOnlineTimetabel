import { create } from 'zustand';

type ThemeStore = {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
