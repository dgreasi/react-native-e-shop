import React from 'react';
import { Box, Text } from '~components';
import { StyleSheet } from 'react-native';
import theme from '~theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useHeaderHeight } from '~hooks';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack/src/types';

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase>;
  options: NativeStackNavigationOptions;
  noShadow?: boolean;
}

export const ScreenHeader = ({ noShadow, options }: Props) => {
  const { height } = useHeaderHeight();

  if (!options.title) {
    return <Box height={(height+5) / 2}></Box>;
  }

  return (
    <Box borderBottomColor={noShadow ? 'background' : 'shadow'} style={[styles.container, { height: height + 5 }]}>
      {options?.title && (
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" width="100%" height={40}>
          <Box alignItems="center" justifyContent="center" width="100%">
            <Text variant="headline">{options?.title}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  btnCalendar: {
    alignItems: 'flex-end',
  },
  btnNotifications: {
    alignItems: 'flex-start',
  },
  container: {
    paddingBottom: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 14,
  },
});

export default ScreenHeader;
