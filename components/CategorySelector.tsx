import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNewsStore } from '@/stores/newsStore';
import { NewsCategory } from '@/types/news';
import { useSettingsStore } from '@/stores/settingsStore';
import { colors } from '@/constants/colors';

export default function CategorySelector() {
  const { currentCategory, setCurrentCategory } = useNewsStore();
  const { isDarkMode } = useSettingsStore();
  
  const categories: { id: NewsCategory; label: string }[] = [
    { id: 'top', label: 'Top' },
    { id: 'politics', label: 'Politics' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Tech' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
    { id: 'health', label: 'Health' },
    { id: 'science', label: 'Science' },
  ];
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? colors.darkBackground : colors.background }
    ]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isActive = currentCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                isActive && styles.activeButton,
                isActive && { backgroundColor: colors.primary },
                { borderColor: isDarkMode ? colors.darkBorder : colors.border }
              ]}
              onPress={() => setCurrentCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.activeText,
                  { color: isActive 
                    ? '#FFFFFF' 
                    : (isDarkMode ? colors.darkText : colors.text) 
                  }
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  activeButton: {
    borderWidth: 0,
  },
  categoryText: {
    fontWeight: '500',
  },
  activeText: {
    fontWeight: '600',
  },
});