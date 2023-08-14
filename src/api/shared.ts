import { IShop } from '~interfaces/app.interface';
import { IGetScheduleCallResponse } from '~interfaces/dto/schedule.dto';

export interface IUseShop {
  shop: IShop;
  products: any[] | undefined;
  schedule: IGetScheduleCallResponse;
}
