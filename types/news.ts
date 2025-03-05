export interface NewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedDate: string;
  snippet: string;
  imageUrl?: string;
  category: string;
}

export type NewsCategory = 
  | 'top' 
  | 'politics' 
  | 'business' 
  | 'technology' 
  | 'entertainment' 
  | 'sports' 
  | 'health' 
  | 'science';

export interface NewsState {
  items: Record<NewsCategory, NewsItem[]>;
  currentCategory: NewsCategory;
  isLoading: boolean;
  error: string | null;
  savedArticles: NewsItem[];
  lastFetched: Record<NewsCategory, number | null>;
  
  // Actions
  fetchNews: (category: NewsCategory, forceRefresh?: boolean) => Promise<void>;
  setCurrentCategory: (category: NewsCategory) => void;
  saveArticle: (article: NewsItem) => void;
  removeSavedArticle: (articleId: string) => void;
  searchNews: (query: string) => Promise<NewsItem[]>;
}