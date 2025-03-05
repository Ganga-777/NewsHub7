import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';

interface LoadingIndicatorProps {
  fullScreen?: boolean;
}

export default function LoadingIndicator({ fullScreen = false }: LoadingIndicatorProps) {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});