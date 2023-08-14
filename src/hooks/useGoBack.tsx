import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type IArrowFunction = () => any;

export const useGoBack = (isDeepLink?: boolean): IArrowFunction => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  /**
   * Handle hardware back button action
   */
  useEffect(() => {
    const backAction = (): boolean => {
      const canGoBack = navigation.canGoBack();

      if (canGoBack && !isDeepLink) return false;

      resetStackNavigator();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetStackNavigator = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: MAIN_ROUTES.TABS }],
    });
  };

  return useCallback(() => {
    return isDeepLink || !navigation.canGoBack() ? resetStackNavigator() : navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeepLink]);
};
