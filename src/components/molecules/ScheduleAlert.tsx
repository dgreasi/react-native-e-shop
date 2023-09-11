import React from 'react';
import { Box, Button, DynamicBottomSheetModal, Text } from '~components';
import { PALETTE } from '~theme/theme';
import { Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const error = require('../../../assets/img/illustrations/error.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const success = require('../../../assets/img/illustrations/success.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const warning = require('../../../assets/img/illustrations/warning.png');

export enum ALERT_TYPE {
  TRY_AGAIN = 'TRY_AGAIN',
  BOOK = 'BOOK',
  DONE = 'DONE',
}

const ALERT_TYPE_DATA = {
  [ALERT_TYPE.TRY_AGAIN]: {
    height: 320,
    image: error,
  },
  [ALERT_TYPE.BOOK]: {
    height: 380,
    image: warning,
  },
  [ALERT_TYPE.DONE]: {
    height: 320,
    image: success,
  },
};

interface Props {
  modalizeRef: any;
  title: string;
  description: string;
  onPress: () => void;
  successBtnLabel: ALERT_TYPE;
  showCancelBtn?: boolean;
}

const ScheduleAlert = ({ modalizeRef, title, description, onPress, successBtnLabel, showCancelBtn = true }: Props) => {
  const { t } = useTranslation();
  const dismiss = () => {
    modalizeRef.current?.close();
  };

  const submit = () => {
    onPress();
  };

  return (
    <DynamicBottomSheetModal
      modalizeRef={modalizeRef}
      height={ALERT_TYPE_DATA?.[successBtnLabel]?.height}
      disableDismiss={successBtnLabel === ALERT_TYPE.DONE}>
      <Box flexDirection="column" testID="delete-schedule-dialog">
        <Box marginHorizontal="l" paddingBottom="m" alignItems="center" justifyContent="center">
          <Box style={styles.img} marginTop="sm" marginBottom="m">
            <Image source={ALERT_TYPE_DATA?.[successBtnLabel]?.image} style={styles.img} />
          </Box>
          <Text variant="heading5" color="primary900" marginBottom="s" textAlign="center">
            {t(`SCHEDULE.${title}`)}
          </Text>
          <Text variant="body2" color="primary700" marginBottom="ml" textAlign="center">
            {description}
          </Text>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent={showCancelBtn ? 'space-between' : 'center'}
            width="100%">
            {showCancelBtn && (
              <Button
                width="45%"
                variant="outline"
                onPress={dismiss}
                label={t('GENERAL.CANCEL')}
                labelColor={PALETTE.PRIMARY_900}
                outlineColor={PALETTE.PRIMARY_900}
              />
            )}
            <Button
              width="45%"
              variant="filled"
              onPress={submit}
              label={t(`SCHEDULE.${successBtnLabel}`) || 'Book'}
              labelColor={PALETTE.WHITE}
            />
          </Box>
        </Box>
      </Box>
    </DynamicBottomSheetModal>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
  },
});

export default ScheduleAlert;
