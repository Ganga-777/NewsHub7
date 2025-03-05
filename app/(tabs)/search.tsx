import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';
import { useNewsStore } from '@/stores/newsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { NewsItem } from '@/types/news';
import NewsCard from '@/components/NewsCard';
import EmptyState from '@/components/EmptyState';
import LoadingIndicator from '@/components/LoadingIndicator';
import { colors } from '@/constants/colors';

export default function SearchScreen() {
  const { searchNews, isLoading } = useNewsStore();
  const { isDarkMode } = useSettingsStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NewsItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setHasSearched(true);
    const searchResults = await searchNews(query);
    setResults(searchResults);
  };
  
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };
  
  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <NewsCard item={item} />
  );
  
  return (
    <SafeAreaView 
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkBackground : colors.background }
      ]}
    >
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchBar,
          { 
            backgroundColor: isDarkMode ? colors.darkCard : colors.card,
            borderColor: isDarkMode ? colors.darkBorder : colors.border
          }
        ]}>
          <Search 
            size={20} 
            color={isDarkMode ? colors.darkTextSecondary : colors.textSecondary} 
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.input,
              { color: isDarkMode ? colors.darkText : colors.text }
            ]}
            placeholder="Search Telugu news..."
            placeholderTextColor={isDarkMode ? colors.darkTextSecondary : colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X 
                size={18} 
                color={isDarkMode ? colors.darkTextSecondary : colors.textSecondary} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <FlatList
        data={results}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <LoadingIndicator fullScreen />
          ) : (
            hasSearched ? (
              <EmptyState type="search" />
            ) : (
              <View style={styles.initialState}>
                <Search 
                  size={48} 
                  color={isDarkMode ? colors.darkTextSecondary : colors.textSecondary} 
                  style={{ opacity: 0.5 }}
                />
                <Text style={[
                  styles.initialStateText,
                  { color: isDarkMode ? colors.darkTextSecondary : colors.textSecondary }
                ]}>
                  Search for Telugu news articles
                </Text>
              </View>
            )
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearButton: {
    padding: 6,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
    flexGrow: 1,
  },
  initialState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 80,
  },
  initialStateText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});