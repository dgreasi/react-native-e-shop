import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavigationContainer from '~navigation/NavigationContainer';
import { MainNavigator } from '~navigation/Main/MainNavigator';
import { ToastMessage } from '~components';
import NetInfo from '@react-native-community/netinfo';
import { ShowAlert } from '~utils/alert';
import en from '~translations/en.json';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      // Add init actions e.g:
      // 1) Load user
      // 2) Setup language
      // 3) Check for update

      setIsChecked(true);
    };

    bootstrapAsync();
  }, [dispatch]);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if (isOffline) {
      ShowAlert({
        message: en.ERRORS.SOMETHING_WENT_WRONG,
        description: en.ERRORS.NO_INTERNET,
        type: 'danger',
      });
    }
  }, [isOffline]);

  if (!isChecked) return null;

  // Add toast message
  return (
    <NavigationContainer>
      <MainNavigator />
      <ToastMessage />
    </NavigationContainer>
  );
};

export default RootNavigator;
