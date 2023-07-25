import React from 'react';
import { Box, Icon } from '~components';
import theme from '~theme/theme';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  icon: string;
  iconColor?: string;
  iconSize?: number;
}

const RoundButton = ({ icon, iconColor, iconSize, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <Box alignItems="center" justifyContent="center" style={styles.touchable}>
        <Icon name={icon} color={iconColor || theme.colors.primary900} size={iconSize || 24} />
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: 'rgba(255, 255, 255,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default RoundButton;
