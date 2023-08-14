import React, { useCallback } from 'react';
import { BasicLoader, Box, EntityCard, ErrorEmpty, Text } from '~components';
import { useSearch } from '~api/search/useSearch';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import theme from '~theme/theme';
import { IEntity } from '~interfaces/entity.interface';

interface IRender {
  item: IEntity;
  index: number;
}

interface Props {
  search: string;
}

const EntityList = ({ search }: Props) => {
  const { data, isLoading, isError, refetch, isRefetching } = useSearch(search);

  const keyExtractor = useCallback((item: IEntity) => String(item.id), []);

  const renderEntities = useCallback(({ item, index }: IRender) => {
    return (
      <Box marginBottom="m">
        <EntityCard entity={item} index={index} />
      </Box>
    );
  }, []);

  if (isLoading) return <BasicLoader />;

  if (isError) {
    return (
      <Box flex={1} marginTop="xl">
        <ErrorEmpty btnLabel={'Refresh'} onPress={refetch} />
      </Box>
    );
  }

  return (
    <FlatList
      ListEmptyComponent={
        <Box alignItems="center" justifyContent="center" height="100%">
          <Text>No results</Text>
        </Box>
      }
      onEndReachedThreshold={0.5}
      data={data}
      renderItem={renderEntities}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={theme.colors.primary900} />
      }
      columnWrapperStyle={undefined}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xxl + 24,
  },
  separator: {
    height: theme.spacing.m,
  },
  footerLoading: {
    marginTop: theme.spacing.l,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EntityList;
