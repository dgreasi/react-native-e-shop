import { IUser } from '~interfaces/auth.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IShop {}

export interface IScheduledCall {
  appointmentDate: string;
  appointmentTime: string;
  shop: IShop;
  shopID: number;
  customer: IUser;
  customerID: number;
  employee: IUser;
  employeeID: number;
  roomID: string;
  invited: { roomID: string; customerID: number; customer: IUser }[];
}

export interface IDayScheduleCalls {
  scheduledDate: string;
  schedule: IScheduledCall[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFriend {}
