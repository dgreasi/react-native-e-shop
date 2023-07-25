import axios, { AxiosError, AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { netCheck, onFulfilled, onRejected } from '~api/midleware';
import { ShowAlert } from '~utils/alert';
import en from '~translations/en.json';

export const api = axios.create({
  baseURL: Config.API_URL,
});

export const apiRQ = axios.create({
  baseURL: Config.API_URL,
});

api.interceptors.request.use(onFulfilled, onRejected);

apiRQ.interceptors.request.use(onFulfilled, onRejected);

// Cancel request if there is no internet
api.interceptors.request.use(netCheck, onRejected);
apiRQ.interceptors.request.use(netCheck, onRejected);

// Add a response interceptor for errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err: AxiosError) => {
    if (err?.response?.status === 401) {
      ShowAlert({
        message: en.ERRORS.SOMETHING_WENT_WRONG,
        description: en.ERRORS.UNAUTHORIZED,
        type: 'danger',
      });
      return { data: { thrownError: true } };
    }

    if (err?.response?.status === 404) {
      ShowAlert({
        message: en.ERRORS.SOMETHING_WENT_WRONG,
        description: '',
        type: 'danger',
      });
      return { data: { thrownError: true } };
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (err?.response?.data?.error) {
      ShowAlert({
        message: en.ERRORS.SOMETHING_WENT_WRONG,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description: err?.response?.data?.error || '',
        type: 'danger',
      });
      return { data: { thrownError: true } };
    }

    // Request cancelled by code (Case 1: NO_INTERNET)
    if (err?.message && !err?.response?.data) {
      ShowAlert({
        message: en.ERRORS.SOMETHING_WENT_WRONG,
        description: err?.message,
        type: 'danger',
      });
      return { data: { thrownError: true } };
    }

    ShowAlert({
      message: en.ERRORS.SOMETHING_WENT_WRONG_CONTACT_ADMIN,
      type: 'danger',
    });
    return { data: { thrownError: true } };
  },
);
