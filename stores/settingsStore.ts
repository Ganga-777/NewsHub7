import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  isDarkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: 'telugu' | 'english';
  
  // Actions
  toggleDarkMode: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setLanguage: (lang: 'telugu' | 'english') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      fontSize: 'medium',
      language: 'telugu',
      
      toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
      setFontSize: (size) => set({ fontSize: size }),
      setLanguage: (lang) => set({ language: lang })
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);