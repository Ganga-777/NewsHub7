import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Type, Languages, Info, Heart } from 'lucide-react-native';
import { useSettingsStore } from '@/stores/settingsStore';
import { colors } from '@/constants/colors';

export default function SettingsScreen() {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    fontSize, 
    setFontSize,
    language,
    setLanguage
  } = useSettingsStore();
  
  const textColor = isDarkMode ? colors.darkText : colors.text;
  const secondaryTextColor = isDarkMode ? colors.darkTextSecondary : colors.textSecondary;
  const backgroundColor = isDarkMode ? colors.darkBackground : colors.background;
  const cardColor = isDarkMode ? colors.darkCard : colors.card;
  const borderColor = isDarkMode ? colors.darkBorder : colors.border;
  
  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: secondaryTextColor }]}>{title}</Text>
      <View style={[styles.sectionContent, { backgroundColor: cardColor, borderColor }]}>
        {children}
      </View>
    </View>
  );
  
  const SettingRow = ({ 
    icon, 
    title, 
    description,
    rightElement 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    description?: React.ReactNode;
    rightElement: React.ReactNode;
  }) => (
    <View style={[styles.settingRow, { borderBottomColor: borderColor }]}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
        {description && (
          <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.settingControl}>
        {rightElement}
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SettingSection title="APPEARANCE">
          <SettingRow
            icon={isDarkMode ? <Moon size={22} color={colors.primary} /> : <Sun size={22} color={colors.primary} />}
            title="Dark Mode"
            description="Switch between light and dark themes"
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#767577', true: `${colors.primary}80` }}
                thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
              />
            }
          />
          
          <SettingRow
            icon={<Type size={22} color={colors.primary} />}
            title="Font Size"
            description="Adjust the text size for better readability"
            rightElement={
              <View style={styles.fontSizeControls}>
                <TouchableOpacity
                  style={[
                    styles.fontSizeButton,
                    fontSize === 'small' && { backgroundColor: colors.primary },
                    { borderColor }
                  ]}
                  onPress={() => setFontSize('small')}
                >
                  <Text style={[
                    styles.fontSizeButtonText,
                    fontSize === 'small' && { color: 'white' },
                    { color: fontSize === 'small' ? 'white' : textColor }
                  ]}>
                    S
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.fontSizeButton,
                    fontSize === 'medium' && { backgroundColor: colors.primary },
                    { borderColor }
                  ]}
                  onPress={() => setFontSize('medium')}
                >
                  <Text style={[
                    styles.fontSizeButtonText,
                    fontSize === 'medium' && { color: 'white' },
                    { color: fontSize === 'medium' ? 'white' : textColor }
                  ]}>
                    M
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.fontSizeButton,
                    fontSize === 'large' && { backgroundColor: colors.primary },
                    { borderColor }
                  ]}
                  onPress={() => setFontSize('large')}
                >
                  <Text style={[
                    styles.fontSizeButtonText,
                    fontSize === 'large' && { color: 'white' },
                    { color: fontSize === 'large' ? 'white' : textColor }
                  ]}>
                    L
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </SettingSection>
        
        <SettingSection title="LANGUAGE">
          <SettingRow
            icon={<Languages size={22} color={colors.primary} />}
            title="Display Language"
            description="Choose your preferred language"
            rightElement={
              <View style={styles.languageControls}>
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    language === 'telugu' && { backgroundColor: colors.primary },
                    { borderColor }
                  ]}
                  onPress={() => setLanguage('telugu')}
                >
                  <Text style={[
                    styles.languageButtonText,
                    language === 'telugu' && { color: 'white' },
                    { color: language === 'telugu' ? 'white' : textColor }
                  ]}>
                    తెలుగు
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    language === 'english' && { backgroundColor: colors.primary },
                    { borderColor }
                  ]}
                  onPress={() => setLanguage('english')}
                >
                  <Text style={[
                    styles.languageButtonText,
                    language === 'english' && { color: 'white' },
                    { color: language === 'english' ? 'white' : textColor }
                  ]}>
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </SettingSection>
        
        <SettingSection title="ABOUT">
          <SettingRow
            icon={<Info size={22} color={colors.primary} />}
            title="Version"
            description="1.0.0"
            rightElement={<View />}
          />
          
          <SettingRow
            icon={<Heart size={22} color={colors.primary} />}
            title="Developed by"
            description={
              <View style={styles.developerLinks}>
                <TouchableOpacity onPress={() => Linking.openURL('https://my-portfolio-ashen-two.vercel.app/')}>
                  <Text style={[styles.linkText, { color: colors.primary }]}>Kandrathi Ganga Vara Prasad</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/kandrathi-ganga-vara-prasad-026b40229/')}>
                  <Text style={[styles.linkText, { color: colors.primary }]}>LinkedIn Profile</Text>
                </TouchableOpacity>
              </View>
            }
            rightElement={<View />}
          />
        </SettingSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 8,
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  settingControl: {
    marginLeft: 8,
  },
  fontSizeControls: {
    flexDirection: 'row',
  },
  fontSizeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
  },
  fontSizeButtonText: {
    fontWeight: '600',
  },
  languageControls: {
    flexDirection: 'row',
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
  },
  languageButtonText: {
    fontWeight: '500',
    fontSize: 14,
  },
  developerLinks: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 13,
    fontWeight: '500',
    marginVertical: 2,
  },
});