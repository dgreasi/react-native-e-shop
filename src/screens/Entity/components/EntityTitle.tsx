import React from 'react';
import { Box, FavouriteButton, Text } from '~components';
import { IEntity } from '~interfaces/entity.interface';

interface Props {
  entity: IEntity;
}

const EntityTitle = ({ entity }: Props) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginTop="s">
      <Box width="84%">
        <Text variant="heading6" color="primary900" numberOfLines={2}>
          {entity.title}
        </Text>
      </Box>
      <FavouriteButton entity={entity} size={28} />
    </Box>
  );
};

export default EntityTitle;
