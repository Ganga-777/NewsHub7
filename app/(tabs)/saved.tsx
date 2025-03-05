import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNewsStore } from '@/stores/newsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { NewsItem } from '@/types/news';
import NewsCard from '@/components/NewsCard';
import EmptyState from '@/components/EmptyState';
import { colors } from '@/constants/colors';

export default function SavedScreen() {
  const { savedArticles } = useNewsStore();
  const { isDarkMode } = useSettingsStore();
  
  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <NewsCard item={item} isSaved={true} />
  );
  
  return (
    <SafeAreaView 
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkBackground : colors.background }
      ]}
    >
      <FlatList
        data={savedArticles}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState 
            type="saved" 
            message="Bookmark articles to read them later. They'll appear here." 
          />
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
    flexGrow: 1,
  },
});