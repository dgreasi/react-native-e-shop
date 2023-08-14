import React from 'react';
import { Box, Icon, Text } from '~components';
import theme from '~theme/theme';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useHeaderHeight } from '~hooks';

const { width } = Dimensions.get('screen');

interface Props extends NativeStackHeaderProps {
  noShadow?: boolean;
  largeHeaderRight?: boolean;
}

const NavHeader = ({ noShadow, navigation, options, largeHeaderRight }: Props) => {
  const { height } = useHeaderHeight();
  const rightButton = options.headerRight && options.headerRight({ canGoBack: false });

  return (
    <Box
      borderBottomColor={noShadow ? 'background' : 'shadow'}
      style={[styles.container, { height: height + 5 }]}
      testID="nav-header-container">
      <Box flexDirection="row" alignItems="center" width="100%">
        <Box width={largeHeaderRight ? width * 0.3 : width * 0.2}>
          <TouchableOpacity onPress={navigation.goBack} style={[styles.btnContainer]}>
            <Icon name="ic_24_arrow-left" color={theme.colors.primary900} size={24} />
          </TouchableOpacity>
        </Box>
        <Box alignItems="center" justifyContent="center" width={largeHeaderRight ? width * 0.4 : width * 0.6}>
          <Text variant="headline" numberOfLines={2} textAlign="center">
            {options.title}
          </Text>
        </Box>
        <Box
          width={largeHeaderRight ? width * 0.3 : width * 0.2}
          justifyContent="center"
          paddingRight="m"
          alignItems="flex-end">
          {rightButton}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: theme.spacing.m,
  },
  container: {
    paddingBottom: theme.spacing.s,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
  },
});

export default NavHeader;
