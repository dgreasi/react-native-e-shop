import { PLATFORM, PROVIDERS } from '~interfaces/enumerables';
import { LANGUAGES } from '~translations/common';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  countryCode?: string;
  telephone?: string;
  provider?: PROVIDERS;
  providerUserID?: string;
  newsletter: boolean;
  os: PLATFORM;
  notifications: INotificationToken[];
  id: number;
  registrationCompleted: boolean;
  hasPassword: boolean;
  lang: LANGUAGES;
}

export interface INotificationToken {
  os: PLATFORM;
  token: string;
}
