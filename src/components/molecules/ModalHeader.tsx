import React, { memo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Icon, RightHeaderButton, Text } from '~components';
import theme from '~theme/theme';
import { isIOS } from '~utils/deviceInfo';
import { useGoBack, useHeaderHeight } from '~hooks';

const { width } = Dimensions.get('screen');

interface Props {
  title: string;
  rightActionLabel?: string;
  rightActionOnPress?: () => void;
  showBack?: boolean;
  noShadow?: boolean;
}

const HEADER_IOS = 91;

const ModalHeader = ({ title, rightActionLabel, rightActionOnPress, showBack, noShadow }: Props) => {
  const goBack = useGoBack();
  const { height: headerHeight } = useHeaderHeight();
  const height = isIOS ? HEADER_IOS * 0.6 : headerHeight;

  return (
    <Box style={[styles.header, { height }]} borderBottomWidth={noShadow ? 0 : 1}>
      <Box paddingLeft="sm" width="30%" height="100%" justifyContent="center">
        <TouchableOpacity onPress={goBack} style={styles.backTouchable} testID="modal-header-back-btn">
          <Icon name={showBack ? 'ic_24_arrow-left' : 'ic_24_close'} color={theme.colors.primary700} size={24} />
        </TouchableOpacity>
      </Box>
      <Box alignItems="center" justifyContent="center">
        <Text variant="headline" numberOfLines={2}>
          {title}
        </Text>
      </Box>
      <Box paddingRight="m" width="30%" justifyContent="center" alignItems="flex-end">
        {!!rightActionLabel && !!rightActionOnPress && (
          <RightHeaderButton onPress={rightActionOnPress} title={rightActionLabel} testID="modal-header-right-btn" />
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  backTouchable: {
    height: '100%',
    justifyContent: 'center',
    width: '50%',
  },
  header: {
    backgroundColor: theme.colors.white,
    width,
    paddingTop: isIOS ? 0 : theme.spacing.ml,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#E6EAF4',
  },
});

export default memo(ModalHeader);
