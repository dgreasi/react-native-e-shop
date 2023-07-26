import { IEntity } from '~interfaces/entity.interface';
import { apiRQ } from '~api';

export const getEntityService = async (id: string): Promise<IEntity> => {
  const resp = await apiRQ.get<IEntity>(`/products/${id}`);
  return resp.data;
};

export const getEntitiesService = async (search: string): Promise<IEntity[]> => {
  // TODO: use search term, API is not available for search
  const resp = await apiRQ.get<IEntity[]>('/products');
  const results = resp.data;

  // if (resp?.data?.errorMessage) {
  //   ShowAlert({
  //     message: en.ERRORS.SOMETHING_WENT_WRONG,
  //     description: resp?.data?.errorMessage,
  //     type: 'danger',
  //   });
  // }

  return results || [];
};
