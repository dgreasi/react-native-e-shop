import { IUseEntity } from '~api/entity/entityResponses';
import { useQuery } from 'react-query';
import { getEntityService } from '~services/entity.service';

const getEntityScreenService = async (id: string): Promise<IUseEntity> => {
  const entity = await getEntityService(id);

  return { entity };
};

export const useEntity = (id: string) => {
  return useQuery<IUseEntity, Error>(['entity', id], () => getEntityScreenService(id), {
    cacheTime: 2000,
  });
};
