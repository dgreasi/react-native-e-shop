import React, { useCallback, useRef } from 'react';
import { Box, Text } from '~components';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import theme from '~theme/theme';
import { monthNames } from '~data/data';
import { useTranslation } from 'react-i18next';
import { IAvailableDates, IGetScheduleCallResponse } from '~interfaces/dto/schedule.dto';
import ScheduleDateElement from './ScheduleDateElement';

interface Props {
  availableDates: IAvailableDates[];
  selectedDate: IAvailableDates | undefined;
  setSelectedDate: (date: IAvailableDates) => void;
  setSelectedTime: (time: string) => void;
  scheduledAppointment: IGetScheduleCallResponse | undefined;
}

const ScheduleDatePicker = ({
  availableDates,
  selectedDate,
  setSelectedDate,
  setSelectedTime,
  scheduledAppointment,
}: Props) => {
  const today = new Date();
  const scrollRef = useRef<any>();
  const { t } = useTranslation();
  const currentDay = today.getDate();
  const currentMonth = monthNames[today.getMonth()];

  const onDatePress = (date: IAvailableDates) => {
    setSelectedDate(date);
    setSelectedTime(date?.slotTimes?.[0]);
  };

  const getAppointmentDay: () => number = useCallback(() => {
    if (scheduledAppointment?.appointmentDate) {
      return new Date(scheduledAppointment?.appointmentDate).getDate();
    }

    return -1;
  }, [scheduledAppointment?.appointmentDate]);

  const dateContainer = (date: IAvailableDates, index: number) => {
    return (
      <Box key={index}>
        <ScheduleDateElement
          date={date}
          selectedDate={selectedDate}
          onPress={() => {
            onDatePress(date);
          }}
          currentDay={currentDay}
          appointmentDay={getAppointmentDay()}
        />
      </Box>
    );
  };

  const getDates = () => {
    return availableDates.map((data, index) => {
      return dateContainer(data, index);
    });
  };

  return (
    <Box backgroundColor="white">
      <Box paddingHorizontal="m" marginBottom="m">
        <Text variant="heading5" color="primary900">
          {t(currentMonth)} {currentDay}
        </Text>
      </Box>
      <ScrollView
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}>
        {getDates()}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: theme.spacing.m,
  },
});

export default ScheduleDatePicker;
