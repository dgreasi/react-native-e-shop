import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '~theme/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const NavigationContainer = ({ children }: { children: React.ReactNode }) => {
  const { navigation } = useTheme<Theme>();

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <RNNavigationContainer theme={navigation}>{children}</RNNavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NavigationContainer;
