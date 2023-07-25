import { Platform } from 'react-native';
import DeviceInfo, { getBuildNumber, getVersion } from 'react-native-device-info';

export const isIOS = Platform.OS === 'ios';
export const hasNotch = DeviceInfo.hasNotch();

export const isAndroid = !isIOS;

export const isAndroidWithNotch = hasNotch && isAndroid;

export const appVersionString = `${getVersion()} (${getBuildNumber()})`;
