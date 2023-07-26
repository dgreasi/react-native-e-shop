import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryClient } from '~api/APIProvider';
import { getRecentSearchesStorage } from '~services/localstorage.service';

const addRecentSearchesService = async (search: string): Promise<void> => {
  const recentSearches = await getRecentSearchesStorage();
  if (!recentSearches.find((item) => item === search)) recentSearches.unshift(search);
  await AsyncStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 5)));
};

const deleteRecentSearchService = async (searchToDelete: string): Promise<string[]> => {
  const recentSearches = await getRecentSearchesStorage();
  const newSearches = recentSearches.filter((search) => search !== searchToDelete);
  await AsyncStorage.setItem('recentSearches', JSON.stringify(newSearches));
  return newSearches;
};

const deleteAllRecentSearchesService = async (): Promise<string[]> => {
  await AsyncStorage.setItem('recentSearches', JSON.stringify([]));
  return [];
};

const deleteRecentSearchMutate = (recentToDelete: string) => {
  queryClient.setQueriesData<string[]>(['recentSearches'], (oldData) => {
    if (!oldData) return [];
    return oldData.filter((recent: string) => recent !== recentToDelete);
  });
};

const deleteAllRecentSearchesMutate = () => {
  queryClient.setQueriesData<string[]>(['recentSearches'], () => {
    return [];
  });
};

export const useAddRecentSearch = () => {
  return useMutation(addRecentSearchesService);
};

export const useDeleteRecentSearch = () => {
  return useMutation(deleteRecentSearchService, {
    onMutate: deleteRecentSearchMutate,
  });
};

export const useDeleteAllRecentSearches = () => {
  return useMutation(deleteAllRecentSearchesService, {
    onMutate: deleteAllRecentSearchesMutate,
  });
};
