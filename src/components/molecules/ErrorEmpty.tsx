import React from 'react';
import { Box, Text } from '~components';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import en from '~translations/en.json';

interface Props {
  btnLabel?: string;
  img?: any;
  title?: string;
  subtitle?: string;
  imgStyles?: any;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultImg = require('../../../assets/sth_went_wrong.png');
const ErrorEmpty = ({ title, subtitle, btnLabel, img, imgStyles }: Props) => {
  const navigation = useNavigation();
  const titleToShow = title || 'Ooops';
  const subtitleToShow = subtitle || en.ERRORS.SOMETHING_WENT_WRONG;

  return (
    <Box flex={1} alignItems="center" paddingTop="ml" backgroundColor="background">
      <Box paddingBottom="ml">
        <Image source={img || defaultImg} style={imgStyles || styles.defaultImgStyles} testID="error-empty-img" />
      </Box>

      <Box paddingHorizontal="xl">
        <Text variant="heading4" paddingBottom="s" textAlign="center">
          {titleToShow}
        </Text>
        <Text variant="body2" color="primary700" textAlign="center">
          {subtitleToShow}
        </Text>
      </Box>
      <Box marginTop="xl">
        <TouchableOpacity onPress={navigation.goBack}>
          <Text variant="link">{btnLabel || 'Go back'}</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  defaultImgStyles: {
    width: 264,
    height: 240,
  },
});

export default ErrorEmpty;
