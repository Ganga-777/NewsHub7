import { NewsItem, NewsCategory } from '@/types/news';
import { generateMockNews } from '@/mocks/newsData';

const API_KEY = '96c050719eba8f5ca0b8a45831c34f656cda5be0bbf36b55354ee2049c727d07';
const BASE_URL = 'https://serpapi.com/search.json';

// Maximum number of retries for API calls
const MAX_RETRIES = 2;

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch with retry logic
async function fetchWithRetry(url: string, options = {}, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    // Wait before retrying (exponential backoff)
    await delay(1000 * (MAX_RETRIES - retries + 1));
    return fetchWithRetry(url, options, retries - 1);
  }
}

export async function fetchNewsByCategory(category: NewsCategory): Promise<NewsItem[]> {
  try {
    let query = 'తెలుగు వార్తలు'; // Telugu news
    
    if (category !== 'top') {
      // Add category to query in Telugu
      const categoryMap: Record<NewsCategory, string> = {
        top: '',
        politics: 'రాజకీయాలు',
        business: 'వ్యాపారం',
        technology: 'టెక్నాలజీ',
        entertainment: 'వినోదం',
        sports: 'క్రీడలు',
        health: 'ఆరోగ్యం',
        science: 'సైన్స్'
      };
      
      query += ` ${categoryMap[category]}`;
    }

    const params = new URLSearchParams({
      q: query,
      tbm: 'nws', // News search
      api_key: API_KEY,
      hl: 'te', // Telugu language
      gl: 'in', // India region
      num: '20' // Number of results
    });

    try {
      const response = await fetchWithRetry(`${BASE_URL}?${params.toString()}`);
      const data = await response.json();
      
      if (!data.news_results || data.news_results.length === 0) {
        console.log('No results from API, using fallback data');
        return generateMockNews(category);
      }

      return data.news_results.map((item: any, index: number) => ({
        id: `${category}-${index}-${Date.now()}`,
        title: item.title || 'No title',
        link: item.link || '',
        source: item.source || 'Unknown source',
        publishedDate: item.date || 'Unknown date',
        snippet: item.snippet || 'No description available',
        imageUrl: item.thumbnail || undefined,
        category
      }));
    } catch (error) {
      console.error('Error fetching from API, using fallback data:', error);
      return generateMockNews(category);
    }
  } catch (error) {
    console.error('Error in fetchNewsByCategory:', error);
    return generateMockNews(category);
  }
}

export async function searchNews(query: string): Promise<NewsItem[]> {
  try {
    // Combine Telugu news with the search query
    const searchQuery = `తెలుగు వార్తలు ${query}`;
    
    const params = new URLSearchParams({
      q: searchQuery,
      tbm: 'nws',
      api_key: API_KEY,
      hl: 'te',
      gl: 'in',
      num: '20'
    });

    try {
      const response = await fetchWithRetry(`${BASE_URL}?${params.toString()}`);
      const data = await response.json();
      
      if (!data.news_results || data.news_results.length === 0) {
        // For search, return empty array if no results
        return [];
      }

      return data.news_results.map((item: any, index: number) => ({
        id: `search-${index}-${Date.now()}`,
        title: item.title || 'No title',
        link: item.link || '',
        source: item.source || 'Unknown source',
        publishedDate: item.date || 'Unknown date',
        snippet: item.snippet || 'No description available',
        imageUrl: item.thumbnail || undefined,
        category: 'search'
      }));
    } catch (error) {
      console.error('Error searching news, returning empty results:', error);
      return [];
    }
  } catch (error) {
    console.error('Error in searchNews:', error);
    return [];
  }
}