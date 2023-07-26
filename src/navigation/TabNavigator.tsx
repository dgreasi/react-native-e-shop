import theme from '~theme/theme';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from '~navigation/Home/HomeNavigator';
import { CartNavigator } from '~navigation/Cart/CartNavigator';
import { FavouritesNavigator } from '~navigation/Favourites/FavouritesNavigator';
import { ProfileNavigator } from '~navigation/Profile/ProfileNavigator';
import { BottomTabButton } from '~components';

const Tab = createBottomTabNavigator();

interface ITabRoute {
  name: string;
  component: React.ComponentType<any>;
  options: any;
  icon: string;
  badge?: number;
}

let TabRoutes: ITabRoute[] = [
  { name: 'HomeTab', component: HomeNavigator, options: { tabBarTestID: 'tab-home-btn' }, icon: 'ic_24_home' },
  {
    name: 'CartTab',
    component: CartNavigator,
    options: { tabBarTestID: 'tab-cart-btn' },
    icon: 'ic_24_shopping-bag',
    badge: 0,
  },
  {
    name: 'FavouritesTab',
    component: FavouritesNavigator,
    options: { tabBarTestID: 'tab-favourites-btn' },
    icon: 'ic_24_heart',
  },
  {
    name: 'ProfileTab',
    component: ProfileNavigator,
    options: { tabBarTestID: 'tab-profile-btn' },
    icon: 'ic_24_user',
  },
];

export const TabNavigator = () => {
  // TODO: create and use selector to get number of items in cart

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.background, ...Platform.select({ android: { height: 62 } }) },
      }}>
      {TabRoutes.map((item, index) => {
        return (
          <Tab.Screen
            name={item.name}
            component={item.component}
            options={{
              tabBarButton: (props) => <BottomTabButton {...props} item={item} />,
              tabBarTestID: item.options.tabBarTestID,
            }}
            key={`tab-screen-${index}`}
          />
        );
      })}
    </Tab.Navigator>
  );
};
