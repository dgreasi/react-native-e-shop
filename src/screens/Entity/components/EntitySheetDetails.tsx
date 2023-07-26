import React from 'react';
import { Box } from '~components';
import EntityTitle from '~screens/Entity/components/EntityTitle';
import EntityDescription from '~screens/Entity/components/EntityDescription';
import { IEntity } from '~interfaces/entity.interface';
import { FULL_WIDTH } from '~config/constants';
import EntityRating from '~screens/Entity/components/EntityRating';
import { EntityPriceSection } from '~screens/Entity/components/EntityPriceSection';

interface Props {
  entity: IEntity;
}

const EntitySheetDetails = ({ entity }: Props) => {
  return (
    <Box paddingHorizontal="m" paddingBottom="m" width={FULL_WIDTH}>
      <EntityTitle entity={entity} />
      {entity?.rating.rate && <EntityRating rating={entity.rating.rate} votes={entity.rating.count} />}
      <Box height={1} backgroundColor="primary300" />
      <EntityPriceSection entity={entity} />
      <Box height={1} backgroundColor="primary300" marginBottom="s" />
      <EntityDescription description={entity?.description || ''} />
    </Box>
  );
};

export default EntitySheetDetails;
