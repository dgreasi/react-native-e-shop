import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '~theme/theme';

const NavigationContainer = ({ children }: { children: React.ReactNode }) => {
  const { navigation } = useTheme<Theme>();

  return (
    <SafeAreaProvider>
      <RNNavigationContainer theme={navigation}>{children}</RNNavigationContainer>
    </SafeAreaProvider>
  );
};
export default NavigationContainer;
