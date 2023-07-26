import React from 'react';
import { Box, Icon } from '~/components';
import { Badge, Touchable } from '~components';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import theme from '~theme/theme';
import { StyleSheet } from 'react-native';

interface ITabRoute {
  item: any;
}

interface Props extends BottomTabBarButtonProps, ITabRoute {}

const BottomTabButton = ({ onPress, style, testID, item, accessibilityState }: Props) => {
  const selected = accessibilityState?.selected;

  return (
    <Touchable
      haptic
      onPress={onPress}
      style={[style, { alignItems: 'center', justifyContent: 'center' }]}
      testID={testID}>
      <Box>
        {!!item.badge && <Badge style={styles.badgeStyles} number={item.badge} />}
        <Icon name={item.icon} size={25} color={selected ? theme.colors.primary900 : theme.colors.primary600} />
      </Box>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  badgeStyles: {
    position: 'absolute',
    right: -8,
    top: -7,
  },
});

export default BottomTabButton;
