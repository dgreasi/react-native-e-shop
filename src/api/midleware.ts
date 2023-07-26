import axios, { AxiosRequestConfig } from 'axios';
import { appVersionString } from '~utils/deviceInfo';
import { Platform } from 'react-native';
import { getVersion } from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import en from '~translations/en.json';
import { ShowAlert } from '~utils/alert';

export const onFulfilled = async (config: AxiosRequestConfig): Promise<any> => {
  // TODO: get user
  const userData = { jwtToken: '' };
  const deviceData = {
    appVersion: appVersionString,
    platform: `${Platform.OS} ${Platform.Version}`,
    userId: null,
    userType: 'customer',
  };

  if (config.method !== 'OPTIONS' && config.headers) {
    if (userData) {
      // If token is found add it to the header
      config.headers['X-Authorization'] = userData?.jwtToken || '';
    }
    config.headers.logInfo = JSON.stringify(deviceData);
    config.headers['app-version'] = getVersion();
  }
  return config;
};

export const netCheck = async (config: AxiosRequestConfig): Promise<any> => {
  const state = await NetInfo.fetch();
  if (!state?.isConnected) {
    ShowAlert({
      message: en.ERRORS.SOMETHING_WENT_WRONG,
      description: en.ERRORS.NO_INTERNET,
      type: 'danger',
    });
    throw new axios.Cancel(en.ERRORS.NO_INTERNET);
  }
  return config;
};

export const onRejected = (error: Error) => {
  return Promise.reject(error);
};
