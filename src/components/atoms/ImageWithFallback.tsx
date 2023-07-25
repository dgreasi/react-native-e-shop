import React, { useMemo, useState } from 'react';
import { Image, ImageResizeMode, ImageStyle, ImageURISource, StyleProp } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultPhoto = require('../../../assets/default.png');

interface Props {
  styles: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  source: ImageURISource;
  fallbackImg?: any;
  fallbackStyle?: StyleProp<ImageStyle>;
  testID?: string;
}

const ImageWithFallback = ({ styles, source, resizeMode, fallbackImg, fallbackStyle, testID }: Props) => {
  const fallback = fallbackImg || defaultPhoto;
  const [imgExists, setImgExists] = useState<boolean>(true);

  const getImage = useMemo(() => {
    if (source?.uri && imgExists) {
      return {
        source,
        style: styles,
      };
    }

    return {
      source: fallback,
      style: fallbackStyle || styles,
    };
  }, [source, fallback, fallbackStyle, styles, imgExists]);

  const onImgError = () => {
    setImgExists(false);
  };

  return (
    <Image
      testID={testID}
      source={getImage.source}
      onError={onImgError}
      style={getImage.style}
      resizeMode={resizeMode}
    />
  );
};

export default ImageWithFallback;
