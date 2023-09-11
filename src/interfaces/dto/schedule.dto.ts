import { IThrowError } from '~interfaces/dto/shared.dto';
import { IDayScheduleCalls, IScheduledCall } from '~interfaces/app.interface';

export interface IAddScheduleAppointmentBody {
  appointmentDate: string;
  appointmentTime: string;
}

export interface IAvailableDates {
  date: string; // new Date().toISOString()
  slotTimes: string[];
}

export interface IGetAvailableDatesResponse extends IThrowError {
  success: boolean;
  availableDates?: IAvailableDates[];
}

// TODO: change response body in server. Not needed in new design
export interface IAddScheduleCallResponse {
  appointmentsForDay?: IScheduledCall[]; // Not using in schedule
  appointment?: IScheduledCall;
}

export interface IGetScheduledCalendar {
  scheduledCalendar: IDayScheduleCalls[];
}

export interface IGetScheduleCallResponse {
  appointmentDate: string;
  appointmentTime: string;
}

export interface IAddScheduleAppointmentBody {
  appointmentDate: string;
  appointmentTime: string;
}

export interface IAddScheduleCallDTO {
  appointment: IAddScheduleAppointmentBody;
  invitedPhoneNumbers: string[];
  cancelScheduledCall?: string;
}
