import { Platform } from 'react-native';
import { MessageOptions, showMessage } from 'react-native-flash-message';
import theme from '~theme/theme';

const getBackgroundColor = (type: any) => {
  if (type === 'info') return theme.colors.secondary400;
};

export const ShowAlert = (options: MessageOptions) => {
  const { message, description, type, position } = options;
  const backgroundColor = getBackgroundColor(type);

  const messageOptions: MessageOptions = {
    message,
    description,
    type,
    titleStyle: {
      fontSize: 15,
      lineHeight: 20,
      ...Platform.select({
        ios: {
          fontWeight: '600',
        },
        android: {
          fontFamily: 'Roboto-Medium',
        },
      }),
    },
    textStyle: {
      fontSize: 13,
      lineHeight: 20,
      ...Platform.select({
        ios: {
          fontWeight: '400',
        },
        android: {
          fontFamily: 'Roboto-Regular',
        },
      }),
    },
    position,
    backgroundColor,
  };

  const style = position === 'bottom' ? { paddingTop: theme.spacing.m } : null;
  if (style) messageOptions.style = style;
  showMessage(messageOptions);
};
