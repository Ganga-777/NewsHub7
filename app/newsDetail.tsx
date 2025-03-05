import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Share, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ArrowLeft, Share2, Bookmark, ExternalLink } from 'lucide-react-native';
import { useNewsStore } from '@/stores/newsStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { NewsItem } from '@/types/news';
import { colors } from '@/constants/colors';
import EmptyState from '@/components/EmptyState';

const blurhash =
  'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { items, currentCategory, savedArticles, saveArticle, removeSavedArticle } = useNewsStore();
  const { isDarkMode, fontSize } = useSettingsStore();
  const [article, setArticle] = useState<NewsItem | null>(null);
  
  useEffect(() => {
    // Find the article in all categories and saved articles
    if (typeof id !== 'string') return;
    
    let foundArticle: NewsItem | undefined;
    
    // Check in current category first
    foundArticle = items[currentCategory].find(item => item.id === id);
    
    // If not found, check in all categories
    if (!foundArticle) {
      for (const category of Object.keys(items) as Array<keyof typeof items>) {
        foundArticle = items[category].find(item => item.id === id);
        if (foundArticle) break;
      }
    }
    
    // If still not found, check in saved articles
    if (!foundArticle) {
      foundArticle = savedArticles.find(item => item.id === id);
    }
    
    if (foundArticle) {
      setArticle(foundArticle);
    }
  }, [id, items, currentCategory, savedArticles]);
  
  const isArticleSaved = article ? savedArticles.some(item => item.id === article.id) : false;
  
  const handleSaveToggle = () => {
    if (!article) return;
    
    if (isArticleSaved) {
      removeSavedArticle(article.id);
    } else {
      saveArticle(article);
    }
  };
  
  const handleOpenLink = async () => {
    if (!article?.link) return;
    
    const canOpen = await Linking.canOpenURL(article.link);
    if (canOpen) {
      await Linking.openURL(article.link);
    }
  };
  
  const handleShare = async () => {
    if (!article) return;
    
    try {
      await Share.share({
        message: Platform.OS === 'ios' ? undefined : `${article.title}\n\n${article.link}`,
        url: Platform.OS === 'ios' ? article.link : undefined,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };
  
  // Font size multipliers based on user settings
  const fontSizeMultiplier = {
    small: 0.9,
    medium: 1,
    large: 1.2
  }[fontSize];
  
  // Theme-based styles
  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? colors.darkBackground : colors.background,
    },
    title: {
      color: isDarkMode ? colors.darkText : colors.text,
    },
    source: {
      color: isDarkMode ? colors.darkTextSecondary : colors.textSecondary,
    },
    content: {
      color: isDarkMode ? colors.darkText : colors.text,
    },
    card: {
      backgroundColor: isDarkMode ? colors.darkCard : colors.card,
      borderColor: isDarkMode ? colors.darkBorder : colors.border,
    },
  };
  
  if (!article) {
    return (
      <View style={[styles.container, themeStyles.container]}>
        <Stack.Screen 
          options={{
            headerShown: false,
          }}
        />
        <EmptyState type="error" message="Article not found" />
      </View>
    );
  }
  
  return (
    <View style={[styles.container, themeStyles.container]}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {article.imageUrl ? (
          <Image
            source={{ uri: article.imageUrl }}
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
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)' }]} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={isDarkMode ? colors.darkText : colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={[styles.headerButton, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)' }]} 
              onPress={handleSaveToggle}
            >
              <Bookmark 
                size={20} 
                color={isArticleSaved ? colors.primary : (isDarkMode ? colors.darkText : colors.text)} 
                fill={isArticleSaved ? colors.primary : 'none'}
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.headerButton, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)' }]} 
              onPress={handleShare}
            >
              <Share2 size={20} color={isDarkMode ? colors.darkText : colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={[styles.contentContainer, themeStyles.card]}>
          <Text 
            style={[
              styles.title, 
              themeStyles.title,
              { fontSize: 22 * fontSizeMultiplier }
            ]}
          >
            {article.title}
          </Text>
          
          <Text 
            style={[
              styles.source, 
              themeStyles.source,
              { fontSize: 14 * fontSizeMultiplier }
            ]}
          >
            {article.source} • {article.publishedDate}
          </Text>
          
          <Text 
            style={[
              styles.content, 
              themeStyles.content,
              { fontSize: 16 * fontSizeMultiplier }
            ]}
          >
            {article.snippet}
          </Text>
          
          <TouchableOpacity 
            style={[styles.readMoreButton, { backgroundColor: colors.primary }]} 
            onPress={handleOpenLink}
          >
            <Text style={styles.readMoreText}>Read Full Article</Text>
            <ExternalLink size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontWeight: '700',
    marginBottom: 12,
  },
  source: {
    marginBottom: 20,
  },
  content: {
    lineHeight: 24,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  readMoreText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
});