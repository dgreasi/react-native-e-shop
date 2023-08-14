import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useBookedSchedule, useRescheduleBookedSchedule, useSchedule } from '~api/schedule/useSchedule';
import { IAddScheduleAppointmentBody, IAddScheduleCallDTO } from '~interfaces/dto/schedule.dto';
import { ALERT_TYPE } from '~components/molecules/ScheduleAlert';
import ErrorEmpty from '~components/molecules/ErrorEmpty';
import { Screen } from '~components/layout/Screen';
import theme, { PALETTE } from '~theme/theme';
import { Box, Button, OverlayLoader, Text } from '~components';
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import CalendarSchedule from '~screens/Schedule/components/CalendarSchedule';
import { useRefreshByUser } from '~hooks/useRefetchByUser';

const userID = 1;
const shopID = 1;
const friends: any[] = [];

/**
 * To be used in screen
 * @constructor
 */
export const CalendarMain = () => {
  const { t } = useTranslation();
  const scheduleModal = useRef<BottomSheetModal>(null);

  const { data: bookedData } = useBookedSchedule(shopID, userID);

  // Reschedule/Schedule an appointment
  const {
    mutate: rescheduleBookedSchedule,
    isLoading: isLoadingReschedule,
    error: errorReschedule,
    reset: resetReschedule,
  } = useRescheduleBookedSchedule();

  // Get available dates of schedule of shop
  const { data, isLoading, isError, refetch, error } = useSchedule(shopID);
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const availableDates = data?.availableDates || [];
  const [dateOfAppointment, setDateOfAppointment] = useState<IAddScheduleAppointmentBody | null>(null);

  // Schedule Alert data
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [action, setAction] = useState<any>(() => {});
  const [showCancelBtn, setShowCancelBtn] = useState<boolean>(true);
  const [successBtnLabel, setSuccessBtnLabel] = useState<ALERT_TYPE>(ALERT_TYPE.BOOK);

  const dismissScheduleAlert = () => {
    scheduleModal?.current?.dismiss();
  };

  const appointmentIsValid = useCallback(() => {
    return dateOfAppointment?.appointmentDate && dateOfAppointment.appointmentTime;
  }, [dateOfAppointment]);

  // Set data for schedule alert on error of schedule
  useEffect(() => {
    if (errorReschedule) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const errorMessage = `${errorReschedule?.response?.data?.error}` || 'FAIL_TO_NOTIFY';
        setTitle('OOOPS');
        setDescription(t(`ERRORS.${errorMessage}`));
        setAction(() => dismissScheduleAlert);
        setShowCancelBtn(false);
        setSuccessBtnLabel(ALERT_TYPE.TRY_AGAIN);
        scheduleModal?.current?.present();
      }, 50);
    }
  }, [errorReschedule, t]);

  const refreshOnError = () => {
    resetReschedule();
    refetch();
  };

  const getAppointmentPostData = (): IAddScheduleCallDTO => {
    const numbers = friends.map((friend) => {
      return friend.phoneNumbers[0].number;
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return { appointment: dateOfAppointment, invitedPhoneNumbers: numbers };
  };

  // Set schedule alert data for reschedule
  const setRescheduleAlertData = () => {
    setTitle('WARNING');
    const localDate = new Date(bookedData?.appointmentDate || '').toLocaleDateString();
    const appointmentDateString = `${bookedData?.appointmentTime}, ${localDate}`;
    setDescription(t('SCHEDULE.SCHEDULE_WARNING', { appointmentDateString }));
    setAction(() => rescheduleAppointment);
    setSuccessBtnLabel(ALERT_TYPE.BOOK);
  };

  const navigateShop = () => {
    // TODO: navigate to shop
    // navigation.navigate(MAIN_ROUTES.SHOP, { shopID });
    scheduleModal?.current?.dismiss();
  };

  // Set schedule alert data for success
  const setSuccessAlertData = () => {
    scheduleModal?.current?.dismiss();
    setTitle('SUCCESS');
    setDescription(t('SCHEDULE.SCHEDULE_SUCCESS'));
    setAction(() => navigateShop);
    setShowCancelBtn(false);
    setSuccessBtnLabel(ALERT_TYPE.DONE);
    scheduleModal?.current?.present();
  };

  const createAppointment = () => {
    if (appointmentIsValid()) {
      // Already owned scheduled calendar - Cancel old one to continue
      if (bookedData?.appointmentDate?.length && bookedData?.isMine) {
        setRescheduleAlertData();
        scheduleModal?.current?.present();
        return;
      }

      const postData = getAppointmentPostData();
      rescheduleBookedSchedule({
        isMine: true,
        shopID,
        roomID: '',
        data: postData,
        onSuccess: setSuccessAlertData,
      });
    }
  };

  // Reschedule/Schedule appointment
  const rescheduleAppointment = () => {
    const roomID = bookedData?.roomID;
    if (roomID && appointmentIsValid()) {
      scheduleModal?.current?.dismiss();
      rescheduleBookedSchedule({
        isMine: !!bookedData?.isMine,
        shopID,
        roomID,
        data: getAppointmentPostData(),
        onSuccess: setSuccessAlertData,
      });
    }
  };

  // Show error from get schedule of store
  if (isError) {
    let errorMessage = 'SOMETHING_WENT_WRONG_CONTACT_ADMIN';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error) errorMessage = `${error?.response?.data?.error}`;
    return (
      <ErrorEmpty
        onPress={refreshOnError}
        title="Oops"
        subtitle={t(`ERRORS.${errorMessage}`)}
        btnLabel={t('ERRORS.RETURN')}
      />
    );
  }

  return (
    <BottomSheetModalProvider>
      <Screen full background={PALETTE.WHITE}>
        {isLoading ? (
          <Box flex={1} alignItems="center" justifyContent="center">
            <ActivityIndicator color={theme.colors.primary900} size="large" />
          </Box>
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: theme.spacing.m,
            }}
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingByUser}
                onRefresh={refetchByUser}
                tintColor={theme.colors.primary900}
              />
            }>
            <CalendarSchedule
              availableDates={availableDates}
              setDateOfAppointment={setDateOfAppointment}
              scheduledAppointment={bookedData}
            />
            <Box alignItems="center" justifyContent="center" marginTop="l">
              <Button onPress={createAppointment} width="50%">
                <Text variant="headline" color="white">
                  {t('SCHEDULE.BOOK')}
                </Text>
              </Button>
            </Box>
          </ScrollView>
        )}
      </Screen>
      {isLoadingReschedule && <OverlayLoader byPassState />}
    </BottomSheetModalProvider>
  );
};
