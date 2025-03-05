import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNewsStore } from '@/stores/newsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { NewsItem } from '@/types/news';
import NewsCard from '@/components/NewsCard';
import CategorySelector from '@/components/CategorySelector';
import EmptyState from '@/components/EmptyState';
import LoadingIndicator from '@/components/LoadingIndicator';
import { colors } from '@/constants/colors';

export default function HomeScreen() {
  const { 
    items, 
    currentCategory, 
    isLoading, 
    error, 
    fetchNews 
  } = useNewsStore();
  const { isDarkMode } = useSettingsStore();
  const [refreshing, setRefreshing] = useState(false);
  
  // Get news for the current category
  const newsItems = items[currentCategory] || [];
  
  useEffect(() => {
    // Fetch news on initial load
    fetchNews(currentCategory);
  }, []);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNews(currentCategory, true);
    setRefreshing(false);
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
      <CategorySelector />
      
      <FlatList
        data={newsItems}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <LoadingIndicator fullScreen />
          ) : (
            <EmptyState type="news" />
          )
        }
        ListFooterComponent={
          isLoading && newsItems.length > 0 ? <LoadingIndicator /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});