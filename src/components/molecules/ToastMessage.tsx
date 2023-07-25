import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { isAndroidWithNotch } from '~utils/deviceInfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ToastMessage = () => {
  const insets = useSafeAreaInsets();

  return (
    <FlashMessage
      position="top"
      testID="error-interceptor-view"
      style={{ paddingTop: isAndroidWithNotch ? insets?.top || 0 : 0 }}
    />
  );
};

export default ToastMessage;
