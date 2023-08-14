import { LANGUAGES } from '~translations/common';

export interface ICoreState {
  alertIsOpen: boolean;
  loading: boolean;
}

export interface ICoreSlice {
  core: ICoreState;
}

export interface ILanguage {
  label: string;
  value: LANGUAGES;
}
