import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDefaultHeaderHeight } from '@react-navigation/elements';

/**
 * Get default header height and insets top.
 */
export const useHeaderHeight = (): { height: number; top: number } => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return {
    height: getDefaultHeaderHeight(frame, false, insets.top),
    top: insets.top,
  };
};
