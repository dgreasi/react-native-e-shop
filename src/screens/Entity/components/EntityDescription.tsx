import React, { useState } from 'react';
import { Box, Text } from '~components';
import { TouchableOpacity } from 'react-native';

const TEXT_FITS_HEIGHT = 96;

interface Props {
  description: string;
}

const EntityDescription = ({ description }: Props) => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [viewMoreIsValid, setViewMoreIsValid] = useState<boolean>(false);

  const toggleViewMore = () => {
    setViewMore((view) => !view);
  };

  const checkViewMoreActionIsNeeded = (e: any) => {
    if (viewMoreIsValid) return;

    // Description needs more than 4 lines to render
    const intHeight = parseInt(e.nativeEvent.layout.height || 0, 10);
    if (intHeight > TEXT_FITS_HEIGHT) {
      setViewMoreIsValid(true);
      setViewMore(true);
      return;
    }

    setViewMoreIsValid(false);
  };

  return (
    <Box>
      {description?.length > 0 && (
        <>
          <Box onLayout={checkViewMoreActionIsNeeded}>
            <Text variant="body1" color="primary600" numberOfLines={viewMore ? 4 : 0}>
              {description}
            </Text>
          </Box>
          {viewMoreIsValid && (
            <Box marginTop="sm">
              <TouchableOpacity onPress={toggleViewMore}>
                <Text variant="callout" color="secondary400">
                  {viewMore ? 'More' : 'Less'}
                </Text>
              </TouchableOpacity>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default EntityDescription;
