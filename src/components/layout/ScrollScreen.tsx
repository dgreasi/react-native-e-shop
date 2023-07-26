import React from 'react';
import { ScrollView, ScrollViewProps, StatusBar, StyleSheet } from 'react-native';
import theme from '~theme/theme';

const ScrollScreen = ({ ...props }: ScrollViewProps) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.container, props.contentContainerStyle]}
      style={[styles.scroll, props.style]}
      {...props}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { backgroundColor: theme.colors.background },
  container: { backgroundColor: theme.colors.background },
});

export default ScrollScreen;
