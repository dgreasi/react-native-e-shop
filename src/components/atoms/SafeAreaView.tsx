import { createBox } from '@shopify/restyle';
import { SafeAreaView as NSafeAreaView } from 'react-native-safe-area-context';

import React from 'react';
import { Theme } from '~theme/theme';

export const SafeAreaView = createBox<
  Theme,
  React.ComponentProps<typeof NSafeAreaView> & { children?: React.ReactNode }
>(NSafeAreaView);
