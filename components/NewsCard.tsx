import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Bookmark, ExternalLink } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import { NewsItem } from '@/types/news';
import { useNewsStore } from '@/stores/newsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { colors } from '@/constants/colors';

interface NewsCardProps {
  item: NewsItem;
  isSaved?: boolean;
}

const blurhash =
  'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export default function NewsCard({ item, isSaved = false }: NewsCardProps) {
  const navigation = useNavigation();
  const { saveArticle, removeSavedArticle, savedArticles } = useNewsStore();
  const { isDarkMode, fontSize } = useSettingsStore();
  
  const isArticleSaved = isSaved || savedArticles.some(article => article.id === item.id);
  
  const handleSaveToggle = () => {
    if (isArticleSaved) {
      removeSavedArticle(item.id);
    } else {
      saveArticle(item);
    }
  };
  
  const handlePress = () => {
    // @ts-ignore - We know this route exists
    navigation.navigate('newsDetail', { id: item.id });
  };
  
  // Font size multipliers based on user settings
  const fontSizeMultiplier = {
    small: 0.9,
    medium: 1,
    large: 1.2
  }[fontSize];
  
  // Theme-based styles
  const themeStyles = {
    card: {
      backgroundColor: isDarkMode ? colors.darkCard : colors.card,
      borderColor: isDarkMode ? colors.darkBorder : colors.border,
    },
    title: {
      color: isDarkMode ? colors.darkText : colors.text,
    },
    source: {
      color: isDarkMode ? colors.darkTextSecondary : colors.textSecondary,
    },
    snippet: {
      color: isDarkMode ? colors.darkTextSecondary : colors.textSecondary,
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.card, themeStyles.card]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          contentFit="cover"
          placeholder={blurhash}
          transition={300}
        />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: isDarkMode ? '#2D3748' : '#E2E8F0' }]}>
          <Text style={{ color: isDarkMode ? '#A0AEC0' : '#718096' }}>No Image</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text 
          style={[
            styles.title, 
            themeStyles.title,
            { fontSize: 16 * fontSizeMultiplier }
          ]} 
          numberOfLines={2}
        >
          {item.title}
        </Text>
        
        <Text 
          style={[
            styles.source, 
            themeStyles.source,
            { fontSize: 12 * fontSizeMultiplier }
          ]}
        >
          {item.source} • {item.publishedDate}
        </Text>
        
        <Text 
          style={[
            styles.snippet, 
            themeStyles.snippet,
            { fontSize: 14 * fontSizeMultiplier }
          ]} 
          numberOfLines={3}
        >
          {item.snippet}
        </Text>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleSaveToggle}
          >
            <Bookmark 
              size={20} 
              color={isArticleSaved ? colors.primary : (isDarkMode ? colors.darkTextSecondary : colors.textSecondary)} 
              fill={isArticleSaved ? colors.primary : 'none'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <ExternalLink 
              size={20} 
              color={isDarkMode ? colors.darkTextSecondary : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: '700',
    marginBottom: 6,
  },
  source: {
    marginBottom: 8,
  },
  snippet: {
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});