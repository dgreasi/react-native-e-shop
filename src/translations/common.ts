import en from './en.json';
import el from './el.json';
import { ILanguage } from '~store/core/coreSlice.interface';

export const translations = {
  en: {
    translation: en,
  },
  el: {
    translation: el,
  },
};

export enum LANGUAGES {
  EN = 'en',
  EL = 'el',
}

export const availableLanguages: ILanguage[] = [
  { label: 'English', value: LANGUAGES.EN },
  { label: 'Ελληνικά', value: LANGUAGES.EL },
];
