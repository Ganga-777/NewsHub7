import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FileSearch, Newspaper, AlertCircle } from 'lucide-react-native';
import { useSettingsStore } from '@/stores/settingsStore';
import { colors } from '@/constants/colors';

type EmptyStateType = 'search' | 'news' | 'saved' | 'error';

interface EmptyStateProps {
  type: EmptyStateType;
  message?: string;
}

export default function EmptyState({ type, message }: EmptyStateProps) {
  const { isDarkMode } = useSettingsStore();
  
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <FileSearch size={48} color={isDarkMode ? colors.darkTextSecondary : colors.textSecondary} />;
      case 'news':
        return <Newspaper size={48} color={isDarkMode ? colors.darkTextSecondary : colors.textSecondary} />;
      case 'saved':
        return <Newspaper size={48} color={isDarkMode ? colors.darkTextSecondary : colors.textSecondary} />;
      case 'error':
        return <AlertCircle size={48} color={colors.error} />;
    }
  };
  
  const getDefaultMessage = () => {
    switch (type) {
      case 'search':
        return 'No results found. Try a different search term.';
      case 'news':
        return 'No news articles available at the moment.';
      case 'saved':
        return 'You haven\'t saved any articles yet.';
      case 'error':
        return 'Something went wrong. Please try again.';
    }
  };
  
  return (
    <View style={styles.container}>
      {getIcon()}
      <Text style={[
        styles.message,
        { color: isDarkMode ? colors.darkText : colors.text }
      ]}>
        {message || getDefaultMessage()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
});