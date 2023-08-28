import React from 'react';
import { Box, Text } from '~components';
import { StyleSheet } from 'react-native';
import theme from '~theme/theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

interface Props {
  value: string;
  onPress: () => void;
  selectedTime: string;
}

const TimeSlot = ({ value, onPress, selectedTime }: Props) => {
  const isSelected = selectedTime === value;

  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={[styles.container, isSelected ? styles.selected : styles.unSelected]}>
        <Text
          variant={isSelected ? 'callout' : 'body2'}
          style={[isSelected ? styles.selectedText : styles.unSelectedText]}>
          {value}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadii.ml,
  },
  selected: {
    backgroundColor: theme.colors.secondary400,
  },
  unSelected: {
    backgroundColor: theme.colors.primary200,
  },
  selectedText: {
    color: theme.colors.white,
  },
  unSelectedText: {
    color: theme.colors.primary900,
  },
});

export default TimeSlot;
