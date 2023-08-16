import React, { useEffect, useState } from 'react';
import { Box } from '~components';
import { IAddScheduleAppointmentBody, IAvailableDates, IGetScheduleCallResponse } from '~interfaces/dto/schedule.dto';
import ScheduleDatePicker from './ScheduleDatePicker';
import TimeSlots from './TimeSlots';

interface Props {
  availableDates: IAvailableDates[];
  setDateOfAppointment: (data: IAddScheduleAppointmentBody | null) => void;
  scheduledAppointment: IGetScheduleCallResponse | undefined;
}

const CalendarSchedule = ({ availableDates, setDateOfAppointment, scheduledAppointment }: Props) => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<IAvailableDates | undefined>(availableDates[0]);

  useEffect(() => {
    // Get first day with available appointments
    const firstAvailableDay = availableDates.findIndex((date) => date.slotTimes.length > 0) || 0;
    setSelectedDate(availableDates?.[firstAvailableDay]);
    setSelectedTime(availableDates?.[firstAvailableDay]?.slotTimes?.[0]);
  }, [availableDates]);

  // If any changes on date and time selected update data of appointment
  useEffect(() => {
    if (selectedDate && selectedTime) {
      setDateOfAppointment({ appointmentDate: selectedDate.slotDate, appointmentTime: selectedTime });
    } else {
      setDateOfAppointment(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedTime]);

  return (
    <Box marginTop="l">
      <Box>
        <ScheduleDatePicker
          availableDates={availableDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setSelectedTime={setSelectedTime}
          scheduledAppointment={scheduledAppointment}
        />
      </Box>
      {selectedDate && (
        <TimeSlots slotTimes={selectedDate.slotTimes} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      )}
    </Box>
  );
};

export default CalendarSchedule;
