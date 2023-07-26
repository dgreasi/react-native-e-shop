import React from 'react';
import { Box } from '~/components';
import { CarouselSectionHeader } from '~components';
import { useRecentSearches } from '~api/recentSearches/useRecentSearches';
import { useDeleteAllRecentSearches } from '~api/recentSearches/useUpdateRecentSearches';
import SearchRecentItem from '~screens/Tabs/SearchTab/Search/components/SearchRecentItem';

interface Props {
  onSubmit: (value: string) => void;
}

const SearchRecents = ({ onSubmit }: Props) => {
  const { data: items = [] } = useRecentSearches();
  const { mutate: deleteMutation } = useDeleteAllRecentSearches();

  const onPress = () => {
    deleteMutation();
  };

  return (
    <Box paddingHorizontal="m">
      <CarouselSectionHeader title="Recent searches" onPress={onPress} btnLabel="Clear all" />
      {items.map((recent, index) => {
        return <SearchRecentItem recent={recent} key={index} onSubmit={onSubmit} />;
      })}
    </Box>
  );
};

export default SearchRecents;
