import React, { useCallback } from 'react';
import { Box, Text, Touchable } from '~components';
import { StyleSheet } from 'react-native';
import theme from '~theme/theme';
import { dateNames } from '~data/data';
import { useTranslation } from 'react-i18next';

interface Props {
  disabled: boolean;
  onPress: () => void;
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  hasAppointments: boolean;
}

const CalendarDay = ({ disabled, onPress, date, isSelected, isToday, hasAppointments }: Props) => {
  const { t } = useTranslation();
  const day = date.getDate();

  const getDate = (dateInput: Date) => {
    return t(dateNames[dateInput?.getDay()]).charAt(0);
  };

  const getColorOfDay = useCallback(() => {
    if (isSelected) return 'white';
    if (isToday) return 'secondary400';
    return 'primary900';
  }, [isSelected, isToday]);

  return (
    <Touchable disabled={disabled} onPress={onPress} style={styles.dateContainer}>
      <Text variant="callout" color="primary600">
        {getDate(date)}
      </Text>
      <Box
        style={[
          styles.day,
          isToday ? styles.todayBackground : styles.defaultBackground,
          isSelected ? styles.selectedDay : styles.day,
        ]}>
        <Text variant="headline" style={{ opacity: disabled ? 0.5 : 1 }} color={getColorOfDay()}>
          {day}
        </Text>
        {hasAppointments && <Box style={[styles.todayDot, isSelected ? styles.todayBackground : styles.selectedDay]} />}
      </Box>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 48,
    paddingVertical: theme.spacing.s,
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadii.xl,
    width: 48,
    height: 48,
    marginTop: theme.spacing.sm,
  },
  defaultBackground: {
    backgroundColor: theme.colors.white,
  },
  todayBackground: {
    backgroundColor: theme.colors.primary200,
  },
  selectedDay: {
    backgroundColor: theme.colors.secondary400,
  },
  todayDot: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: theme.borderRadii.l,
  },
});

export default CalendarDay;
