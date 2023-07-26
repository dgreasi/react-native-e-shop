import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PROFILE_ROUTES } from '~navigation/Profile/profileTypes';
import { ProfileScreen } from '~screens';
import ScreenHeader from '../../components/organisms/ScreenHeader';

const ProfileStack = createNativeStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={PROFILE_ROUTES.PROFILE}
        component={ProfileScreen}
        options={() => ({
          title: 'Profile',
          header: (props) => <ScreenHeader {...props} />,
        })}
      />
    </ProfileStack.Navigator>
  );
};
