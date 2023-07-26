import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getRecentSearchesService = async (): Promise<string[]> => {
  return JSON.parse((await AsyncStorage.getItem('recentSearches')) || '[]');
};

export const useRecentSearches = () => {
  return useQuery<string[], Error>(['recentSearches'], getRecentSearchesService, { initialData: () => [] });
};
