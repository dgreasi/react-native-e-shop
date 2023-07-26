import React from 'react';
import { Box, Text } from '~components';

interface Props {
  rating: number;
  votes: number;
}

const EntityRating = ({ rating, votes }: Props) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginTop="s" marginBottom="s">
      <Text>Rating: {rating}</Text>
      {votes > 0 && <Text>Votes: {votes}</Text>}
    </Box>
  );
};

export default EntityRating;
