import { useQuery } from 'react-query';
import { IEntity } from '~interfaces/entity.interface';
import { getEntitiesService } from '~api/entity/entity.service';

const getEntitiesSearchScreenService = async (search: string): Promise<IEntity[]> => {
  if (!search) return [];
  return await getEntitiesService(search);
};

export const useSearch = (search: string) => {
  return useQuery<IEntity[], Error>(['entitiesSearch', search], () => getEntitiesSearchScreenService(search), {
    cacheTime: 2000,
  });
};
