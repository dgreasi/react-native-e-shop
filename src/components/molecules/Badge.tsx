import React from 'react';
import { Box, Text } from '~/components';

interface Props {
  style?: any;
  number?: number;
}
const Badge = ({ style, number }: Props) => {
  const getBadge = () => {
    if (number) {
      return (
        <Box
          width={20}
          height={20}
          alignItems="center"
          justifyContent="center"
          backgroundColor="primary900"
          style={{ borderRadius: 25 }}>
          <Text variant="cartBadge" color="primary100">
            {number}
          </Text>
        </Box>
      );
    }

    return <Box width={10} height={10} backgroundColor="secondary400" style={{ borderRadius: 5 }} />;
  };

  return (
    <Box
      zIndex={2}
      width={20}
      height={20}
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
      borderRadius="sm"
      style={style}>
      {getBadge()}
    </Box>
  );
};

export default Badge;
