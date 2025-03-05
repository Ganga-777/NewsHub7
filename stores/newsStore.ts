import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsState, NewsCategory, NewsItem } from '@/types/news';
import { fetchNewsByCategory, searchNews } from '@/services/newsService';
import { generateMockNews } from '@/mocks/newsData';

// Helper to check if we need to refresh data
const shouldRefresh = (lastFetched: number | null): boolean => {
  if (!lastFetched) return true;
  
  // Refresh if data is older than 30 minutes
  const thirtyMinutesInMs = 30 * 60 * 1000;
  return Date.now() - lastFetched > thirtyMinutesInMs;
};

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      items: {
        top: [],
        politics: [],
        business: [],
        technology: [],
        entertainment: [],
        sports: [],
        health: [],
        science: []
      },
      currentCategory: 'top',
      isLoading: false,
      error: null,
      savedArticles: [],
      lastFetched: {
        top: null,
        politics: null,
        business: null,
        technology: null,
        entertainment: null,
        sports: null,
        health: null,
        science: null
      },

      fetchNews: async (category: NewsCategory, forceRefresh = false) => {
        const { lastFetched, items } = get();
        
        // Skip fetch if we have recent data and not forcing refresh
        if (!forceRefresh && !shouldRefresh(lastFetched[category]) && items[category].length > 0) {
          return;
        }
        
        set({ isLoading: true, error: null });
        
        try {
          const newsItems = await fetchNewsByCategory(category);
          
          set(state => ({
            items: {
              ...state.items,
              [category]: newsItems
            },
            lastFetched: {
              ...state.lastFetched,
              [category]: Date.now()
            },
            isLoading: false,
            error: null // Clear any previous errors
          }));
        } catch (error) {
          console.error('Error in fetchNews:', error);
          
          // Use mock data as fallback
          const mockNews = generateMockNews(category);
          
          set(state => ({
            items: {
              ...state.items,
              [category]: mockNews
            },
            lastFetched: {
              ...state.lastFetched,
              [category]: Date.now()
            },
            isLoading: false,
            error: null // Don't show error to user since we're using fallback data
          }));
        }
      },

      setCurrentCategory: (category: NewsCategory) => {
        set({ currentCategory: category });
        // Fetch news for this category if we don't have it yet
        const state = get();
        if (state.items[category].length === 0 || shouldRefresh(state.lastFetched[category])) {
          state.fetchNews(category);
        }
      },

      saveArticle: (article: NewsItem) => {
        set(state => {
          // Check if article is already saved
          const isAlreadySaved = state.savedArticles.some(item => item.id === article.id);
          if (isAlreadySaved) return state;
          
          return {
            savedArticles: [...state.savedArticles, article]
          };
        });
      },

      removeSavedArticle: (articleId: string) => {
        set(state => ({
          savedArticles: state.savedArticles.filter(article => article.id !== articleId)
        }));
      },

      searchNews: async (query: string) => {
        if (!query.trim()) return [];
        
        set({ isLoading: true, error: null });
        
        try {
          const results = await searchNews(query);
          set({ isLoading: false });
          return results;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: null // Don't show error to user
          });
          return [];
        }
      }
    }),
    {
      name: 'news-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist saved articles and last fetched times
      partialize: (state) => ({ 
        savedArticles: state.savedArticles,
        lastFetched: state.lastFetched
      }),
    }
  )
);