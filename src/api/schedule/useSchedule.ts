import { useMutation, useQuery } from 'react-query';
import { queryClient } from '~api/APIProvider';
import { IAddScheduleCallDTO, IGetScheduleCallResponse } from '~interfaces/dto/schedule.dto';
import { IUseSchedule } from '~api/schedule/scheduleResponses';
import { IUseShop } from '~api/shared';
import { sleep } from '~utils/general';
import { availableDates } from '~data/data';

const getScheduleAvailableDatesService = async (shopID: number): Promise<IUseSchedule> => {
  await sleep(2000);
  return { availableDates };
  // const resp = await apiRQ.get<IUseSchedule>(`/schedule/shop/${shopID}/available-dates`);
  //
  // const { availableDates } = resp.data;
  // return { availableDates };
};

/**
 * Book schedule call for shop
 * If old schedule exists, send roomID to server to cancel it
 * @param isMine
 * @param shopID
 * @param roomID
 * @param data
 */
const bookScheduleCallService = async (data: {
  isMine: boolean;
  shopID: number;
  roomID: string;
  data: IAddScheduleCallDTO;
}): Promise<IGetScheduleCallResponse> => {
  console.log('== Will create appointment with the following data: ', data);
  await sleep(2000);
  return {
    appointmentDate: '',
    appointmentTime: '',
    roomID: '',
    shopID: data.shopID,
    isMine: true,
  };

  // RoomID: used to cancel previous scheduled call
  // if (roomID && isMine) data.cancelScheduledCall = roomID;
  // const resp = await apiRQ.post<IAddScheduleCallResponse>(`/schedule/shop/${shopID}`, data);
  //
  // const { appointment } = resp.data;
  //
  // return {
  //   appointmentDate: appointment?.appointmentDate || '',
  //   appointmentTime: appointment?.appointmentTime || '',
  //   roomID: appointment?.roomID || '',
  //   shopID: appointment?.shopID || 0,
  //   isMine: true,
  // };
};

// Get scheduled call for shop
export const getBookedScheduleCallService = async (
  shopID: number,
  customerID: number,
): Promise<IGetScheduleCallResponse> => {
  await sleep(2000);
  return {
    appointmentDate: '',
    appointmentTime: '',
    roomID: '',
    shopID: shopID,
    isMine: true,
  };

  // const resp = await apiRQ.get<IGetScheduledCalendar>(`/schedule/shop/${shopID}`);
  // const appointmentData = resp?.data?.scheduledCalendar?.[0]?.schedule || [];
  // const appointmentIndex = appointmentData.findIndex((appointment) => appointment?.customerID === customerID);
  //
  // if (appointmentIndex > -1) {
  //   return {
  //     appointmentDate: appointmentData[appointmentIndex]?.appointmentDate || '',
  //     appointmentTime: appointmentData[appointmentIndex]?.appointmentTime || '',
  //     roomID: appointmentData[appointmentIndex]?.roomID || '',
  //     shopID: appointmentData[appointmentIndex]?.shopID || 0,
  //     isMine: true,
  //   };
  // }
  //
  // return {
  //   appointmentDate: appointmentData[0]?.appointmentDate || '',
  //   appointmentTime: appointmentData[0]?.appointmentTime || '',
  //   roomID: appointmentData[0]?.roomID || '',
  //   shopID: appointmentData[0]?.shopID || 0,
  //   isMine: false,
  // };
};

/**
 * Reschedule a scheduled call for this shop
 * @param isMine
 * @param shopID
 * @param roomID
 * @param data
 */
const reschedule = async ({
  isMine,
  shopID,
  roomID,
  data,
}: {
  isMine: boolean;
  shopID: number;
  roomID: string;
  data: IAddScheduleCallDTO;
}): Promise<IGetScheduleCallResponse> => {
  return await bookScheduleCallService({ isMine, shopID, data, roomID });
};

/**
 * Update schedule in shop state
 * @param data
 * @param variables
 */
const updateScheduleInShop = async (
  data: IGetScheduleCallResponse | void,
  variables: { isMine: boolean; shopID: number; roomID: string; data: IAddScheduleCallDTO; onSuccess: () => void },
) => {
  queryClient.setQueriesData(['shop', variables.shopID], (oldData) => {
    const useShopState = oldData as IUseShop;

    if (data) {
      return {
        ...useShopState,
        schedule: data,
      };
    }

    return {
      ...useShopState,
      schedule: {
        appointmentDate: '',
        appointmentTime: '',
        roomID: '',
        isMine: true,
      },
    };
  });

  variables.onSuccess();
};

//////////////////////////////////////////----------HOOKS----------/////////////////////////////////////////////////////
export const useSchedule = (shopID: number) => {
  return useQuery<IUseSchedule | undefined, Error>(['availableScheduleShop', shopID], () =>
    getScheduleAvailableDatesService(shopID),
  );
};

export const useBookedSchedule = (shopID: number, customerID: number) => {
  return useQuery<IGetScheduleCallResponse, Error>(
    ['bookedScheduleShop', shopID],
    () => getBookedScheduleCallService(shopID, customerID),
    {
      initialData: () => {
        return {
          appointmentDate: '',
          appointmentTime: '',
          roomID: '',
          shopID: 0,
          isMine: true,
        };
      },
    },
  );
};

export const useRescheduleBookedSchedule = () => {
  return useMutation(reschedule, { onSuccess: updateScheduleInShop });
};
