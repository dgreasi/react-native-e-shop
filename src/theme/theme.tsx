import { createTheme, ThemeProvider as ReThemeProvider } from '@shopify/restyle';
import React from 'react';

export enum PALETTE {
  WHITE = 'white',
  PRIMARY_900 = 'primary900',
  PRIMARY_800 = 'primary800',
  PRIMARY_700 = 'primary700',
  PRIMARY_500 = 'primary500',
  PRIMARY_600 = 'primary600',
  PRIMARY_300 = 'primary300',
  PRIMARY_100 = 'primary100',
  ERROR_500 = 'error500',
  ERROR_400 = 'error400',
  SECONDARY_600 = 'secondary600',
  SECONDARY_500 = 'secondary500',
  SECONDARY_400 = 'secondary400',
  TRANSPARENT = 'transparent',
  WARNING_400 = 'warning400',
  WARNING_300 = 'warning300',
  WARNING_100 = 'warning100',
  SUCCESS_300 = 'success300',
  BUTTON_SECONDARY = 'buttonSecondary',
  BACKGROUND_DEFAULT = 'background',
}

export const WEIGHT = {
  REGULAR: { fontWeight: '400' },
  MEDIUM: { fontWeight: '600' },
  BOLD: { fontWeight: '700' },
};

const theme = createTheme({
  colors: {
    buttonSecondary: '#5163D6',
    buttonMain: '#04060A',
    primary900: '#04060A',
    primary800: '#272A33',
    primary700: '#494E5A',
    primary600: '#6A7081',
    primary500: '#9AA2B8',
    primary400: '#CDD1DD',
    primary300: '#E4E7EE',
    primary200: '#EEF0F6',
    primary100: '#F5F6FA',
    success400: '#04705B',
    success300: '#12B891',
    secondary600: '#1D2666',
    secondary500: '#2C3B9E',
    secondary400: '#5163D6',
    secondary300: '#8595FF',
    secondary100: '#F5F6FF',
    error500: '#8F0618',
    error400: '#C72434',
    error300: '#F56C6C',
    background: '#f2f2f6',
    warning400: '#E09600',
    warning300: '#F4CC58',
    warning100: '#FFF9E0',
    transparent: 'transparent',
    shadow: '#E6EAF4',
    white: '#FFFFFF',
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    l: 24,
    ml: 32,
    xl: 40,
    xxl: 54,
  },
  borderRadii: {
    s: 4,
    sm: 8,
    m: 10,
    ml: 12,
    l: 25,
    xl: 75,
    xxl: 100,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    button: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    },
    link: {
      fontWeight: '600',
      color: 'secondary400',
      fontSize: 15,
      lineHeight: 20,
    },
    heading1: {
      color: 'primary900',
      fontSize: 48,
      lineHeight: 60,
      ...WEIGHT.BOLD,
    },
    heading2: {
      color: 'primary900',
      fontSize: 40,
      lineHeight: 48,
      ...WEIGHT.BOLD,
    },
    heading3: {
      color: 'primary900',
      fontSize: 34,
      lineHeight: 42,
      ...WEIGHT.BOLD,
    },
    heading4: {
      color: 'primary900',
      fontSize: 28,
      lineHeight: 36,
      ...WEIGHT.MEDIUM,
    },
    heading5: {
      color: 'primary900',
      fontSize: 22,
      lineHeight: 28,
      ...WEIGHT.BOLD,
    },
    heading6: {
      color: 'primary900',
      fontSize: 20,
      lineHeight: 28,
      ...WEIGHT.MEDIUM,
    },
    headline: {
      color: 'primary900',
      fontSize: 17,
      lineHeight: 24,
      ...WEIGHT.MEDIUM,
    },
    body1: {
      color: 'primary900',
      fontSize: 17,
      lineHeight: 24,
      ...WEIGHT.REGULAR,
    },
    oswald: {
      color: 'primary900',
      fontSize: 16,
      lineHeight: 18,
      ...WEIGHT.MEDIUM,
    },
    body2: {
      color: 'primary900',
      fontSize: 15,
      lineHeight: 20,
      ...WEIGHT.REGULAR,
    },
    callout: {
      color: 'primary900',
      fontSize: 14,
      lineHeight: 20,
      ...WEIGHT.MEDIUM,
    },
    footnote: {
      color: 'primary900',
      fontSize: 13,
      lineHeight: 20,
      ...WEIGHT.REGULAR,
    },
    caption1: {
      color: 'primary900',
      fontSize: 12,
      lineHeight: 16,
      ...WEIGHT.MEDIUM,
    },
    caption2: {
      color: 'primary900',
      fontSize: 12,
      lineHeight: 16,
      ...WEIGHT.REGULAR,
    },
    overline: {
      color: 'primary900',
      fontSize: 11,
      lineHeight: 16,
      ...WEIGHT.MEDIUM,
    },
    defaults: {
      color: 'primary900',
      fontSize: 16,
      lineHeight: 18,
      ...WEIGHT.REGULAR,
    },
    cartBadge: {
      color: 'primary900',
      fontSize: 12,
      lineHeight: 14,
      ...WEIGHT.BOLD,
    },
  },
  navigation: {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: '#f8f8fa',
      card: '#f8f8fa',
      text: '#0c1245',
      border: 'rgb(199, 199, 204)',
      notification: 'red',
    },
  },
});

export type Theme = typeof theme;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ReThemeProvider theme={theme}>{children}</ReThemeProvider>
);

export default theme;
