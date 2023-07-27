import React, { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { Box, SearchInput } from '~components';
import debounce from 'lodash.debounce';
import { useAddRecentSearch } from '~api/recentSearches/useUpdateRecentSearches';

interface Props {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSearchFocused: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  hideShadow?: boolean;
}

const SearchPageHeader = ({ hideShadow, setSearchQuery, searchQuery, setSearchFocused }: Props) => {
  const { mutate: addMutation } = useAddRecentSearch();

  const clearText = () => {
    setSearchQuery('');
    onChangeText('');
  };

  const onChangeText = (value: string) => {
    setSearchQuery(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeTextDelayed: (event: any) => void = useCallback(debounce(onChangeText, 250), []);

  const onChange = (value: string) => {
    setSearchQuery(value);
    onChangeTextDelayed(value);
  };

  const onFocus = () => setSearchFocused(true);
  const onBlur = () => setSearchFocused(false);

  const onSubmit = (event: any) => {
    const value = event?.nativeEvent?.text;
    addMutation(value);
  };

  return (
    <Box
      paddingHorizontal="m"
      paddingBottom="s"
      flexDirection="row"
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor={hideShadow ? 'background' : 'shadow'}>
      <Box width="100%">
        <SearchInput
          placeholder="Search"
          autoFocus
          onChangeText={onChange}
          value={searchQuery}
          clearText={clearText}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmit}
        />
      </Box>
    </Box>
  );
};

export default memo(SearchPageHeader);
