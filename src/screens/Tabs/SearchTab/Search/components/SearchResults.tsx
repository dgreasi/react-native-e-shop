import React from 'react';
import { Box, EntityList } from '~components';
import { useHeaderHeight } from '~hooks';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

interface Props {
  searchQuery: string;
}

const SearchResults = ({ searchQuery }: Props) => {
  const { height: headerHeight } = useHeaderHeight();
  const LIST_HEIGHT = height - headerHeight;

  return (
    <Box flex={1}>
      <Box height={LIST_HEIGHT} width="100%">
        <EntityList search={searchQuery} />
      </Box>
    </Box>
  );
};

export default SearchResults;
