import React, { useCallback } from 'react';
import { Box, Text } from '~components';
import TimeSlot from './TimeSlot';

interface Props {
  slotTimes: string[];
  selectedTime: string;
  setSelectedTime: (value: string) => void;
}

const TimeSlots = ({ slotTimes, selectedTime, setSelectedTime }: Props) => {
  const onPress = (value: string) => {
    setSelectedTime(value);
  };

  const getTimeSlots = useCallback(() => {
    return slotTimes.map((time) => {
      return (
        <Box marginRight="s" marginBottom="sm" key={time}>
          <TimeSlot onPress={() => onPress(time)} value={time} selectedTime={selectedTime} />
        </Box>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotTimes, selectedTime]);

  return (
    <Box marginTop="l" paddingLeft="m">
      <Text variant="callout" color="primary600" marginBottom="m">
        Select time
      </Text>
      <Box flexDirection="row" flexWrap="wrap">
        {getTimeSlots()}
      </Box>
    </Box>
  );
};

export default TimeSlots;
