import React from 'react';
import theme from '~theme/theme';
import { Icon, Text } from '~components';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  height?: number;
}

const SearchButton = ({ onPress, height }: Props) => {
  return (
    <TouchableOpacity style={[styles.search, { height: height || 40 }]} onPress={onPress}>
      <Icon name="ic_24_search" color={theme.colors.primary500} size={20} />
      <Text color="primary500" paddingLeft="s" variant="body1">
        Search
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  search: {
    width: '100%',
    paddingHorizontal: theme.spacing.m,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.primary100,
    borderRadius: theme.borderRadii.ml,
  },
});

export default SearchButton;
