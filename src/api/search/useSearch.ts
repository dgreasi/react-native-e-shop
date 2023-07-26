import { useQuery } from 'react-query';
import { getEntitiesService } from '~services/entity.service';
import { IEntity } from '~interfaces/entity.interface';

const getEntitiesSearchScreenService = async (search: string): Promise<IEntity[]> => {
  if (!search) return [];
  return await getEntitiesService(search);
};

export const useSearch = (search: string) => {
  return useQuery<IEntity[], Error>(['entitiesSearch', search], () => getEntitiesSearchScreenService(search), {
    cacheTime: 2000,
  });
};
