import React from 'react';
import { Box, Icon, Text } from '~/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '~theme/theme';
import { useDeleteRecentSearch } from '~api/recentSearches/useUpdateRecentSearches';

interface Props {
  recent: string;
  onSubmit: (value: string) => void;
}

const SearchRecentItem = ({ recent, onSubmit }: Props) => {
  const { mutate: deleteMutation } = useDeleteRecentSearch();

  const onPress = () => {
    onSubmit(recent);
  };

  const onDelete = () => {
    deleteMutation(recent);
  };

  return (
    <Box style={styles.container}>
      <TouchableOpacity style={styles.recentButton} onPress={onPress}>
        <Icon name="ic_24_clock" size={20} color={theme.colors.primary500} />
        <Text variant="body1" paddingLeft="s">
          {recent}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={onDelete}>
        <Icon name="ic_24_close" size={20} color={theme.colors.primary500} />
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    width: '13%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing.s,
    width: '87%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SearchRecentItem;
