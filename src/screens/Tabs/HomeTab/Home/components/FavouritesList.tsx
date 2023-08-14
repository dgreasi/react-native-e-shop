import React, { useCallback, useEffect, useMemo, useState } from 'react';
import theme from '~theme/theme';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { Box, EntityCard, Text } from '~components';
import { selectFavourites } from '~store/favourites/favouritesSlice';
import { FULL_HEIGHT } from '~config/constants';
import { IEntity } from '~interfaces/entity.interface';

interface IRender {
  item: IEntity;
  index: number;
}

const FavouritesList = () => {
  const favourites = useSelector(selectFavourites);
  const [favouritesArray, setFavouritesArray] = useState<IEntity[]>([]);

  useEffect(() => {
    const favArray = Object.values(favourites);
    setFavouritesArray(favArray);
  }, [favourites]);

  const Separator = () => useMemo(() => <Box style={styles.separator} />, []);

  const keyExtractor = useCallback((item: IEntity) => String(item.id), []);

  const renderFavourites = useCallback(({ item, index }: IRender) => {
    return <EntityCard entity={item} index={index} />;
  }, []);

  return (
    <FlatList
      ListEmptyComponent={
        <Box style={styles.noContent}>
          <Text variant="oswald">No favourites</Text>
        </Box>
      }
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={Separator}
      data={favouritesArray}
      renderItem={renderFavourites}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      columnWrapperStyle={undefined}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: theme.spacing.m + 4,
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
  noContent: {
    height: FULL_HEIGHT - 160,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    zIndex: 1000,
  },
});

export default FavouritesList;
