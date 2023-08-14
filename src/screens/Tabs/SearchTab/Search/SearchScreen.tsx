import React, { useEffect, useState } from 'react';
import { StackNavigationProps } from '~navigation/navigation.interface';
import { useMount } from '~hooks';
import SearchPageHeader from '~screens/Tabs/SearchTab/Search/components/SearchPageHeader';
import SearchResults from '~screens/Tabs/SearchTab/Search/components/SearchResults';
import { Keyboard } from 'react-native';
import SearchRecents from '~screens/Tabs/SearchTab/Search/components/SearchRecents';
import { SearchRoutes } from '~navigation/Search/searchTypes';
import { Screen } from '~components';

const SearchScreen = ({ navigation }: StackNavigationProps<SearchRoutes, 'Search'>) => {
  const ready = useMount(navigation);
  const [renderSection, setRenderSection] = useState<'recents' | 'results'>('recents');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  useEffect(() => {
    if (!ready) return;
    else if (searchQuery && !searchFocused) setRenderSection('results');
    else return setRenderSection('recents');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchFocused]);

  const onSubmit = (value: string) => {
    setSearchQuery(value);
    Keyboard.dismiss();
  };

  return (
    <Screen full>
      <SearchPageHeader
        hideShadow={renderSection === 'results'}
        setSearchQuery={setSearchQuery}
        setSearchFocused={setSearchFocused}
        searchQuery={searchQuery}
      />
      {ready && (
        <>
          {renderSection === 'recents' && <SearchRecents onSubmit={onSubmit} />}
          {renderSection === 'results' && (
            <>
              <SearchResults searchQuery={searchQuery} />
            </>
          )}
        </>
      )}
    </Screen>
  );
};

export default SearchScreen;
