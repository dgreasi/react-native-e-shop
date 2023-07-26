import React from 'react';
import { Box } from '~components';
import { ActivityIndicator } from 'react-native';
import theme from '~theme/theme';

const BasicLoader = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <ActivityIndicator color={theme.colors.primary900} size="large" />
    </Box>
  );
};

export default BasicLoader;
