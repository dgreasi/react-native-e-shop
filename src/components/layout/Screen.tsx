import React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { Box } from '~components';

interface Props {
  children: React.ReactNode;
  full?: boolean;
  testID?: string;
  paddingTop?: number;
  barStyle?: StatusBarStyle;
}

export const Screen = ({ children, full, testID, paddingTop, barStyle }: Props) => {
  return (
    <Box
      flex={1}
      bg="background"
      testID={testID}
      flexDirection="column"
      paddingHorizontal={full ? undefined : 'm'}
      style={{ paddingTop: paddingTop || undefined }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={barStyle || 'dark-content'} />
      {children}
    </Box>
  );
};
