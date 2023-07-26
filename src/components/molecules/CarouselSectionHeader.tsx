import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '~components';
import theme from '~theme/theme';

interface Props {
  title: string;
  btnLabel?: string;
  onPress?: () => void;
  isLoading?: boolean;
  noPaddingBot?: boolean;
}

const CarouselSectionHeader = ({ title, btnLabel, onPress, isLoading, noPaddingBot }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { paddingBottom: noPaddingBot ? undefined : theme.spacing.m }]}
      disabled={!btnLabel || isLoading}>
      <Text variant="headline">{title}</Text>
      {btnLabel && (
        <Text variant="callout" color="primary600">
          {btnLabel}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CarouselSectionHeader;
