import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Box, Text } from '~components';
import { ActivityIndicator, DimensionValue, StyleSheet } from 'react-native';
import theme, { PALETTE } from '~theme/theme';

interface Props {
  onPress: () => void;
  label?: string;
  testID?: string;
  backgroundColor?: PALETTE;
  outlineColor?: PALETTE;
  labelColor?: PALETTE;
  underlayColorType?: 'white';
  children?: React.ReactNode;
  variant?: 'outline' | 'filled';
  disabled?: boolean;
  loading?: boolean;
  width?: DimensionValue | undefined;
}

export const Button = ({
  onPress,
  label,
  testID,
  backgroundColor,
  outlineColor,
  labelColor,
  underlayColorType,
  variant,
  children,
  disabled,
  loading,
  width,
}: Props) => {
  let borderWidth = 0;

  if (variant === 'outline') {
    backgroundColor = PALETTE.TRANSPARENT;
    borderWidth = 1;
  }

  return (
    <RectButton
      onPress={onPress}
      enabled={!disabled && !loading}
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor ? theme.colors[backgroundColor] : theme.colors.buttonMain,
          width: width || '100%',
        },
      ]}
      underlayColor={underlayColorType === 'white' ? underlayColorType : undefined}
      testID={testID}>
      <Box
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%"
        borderWidth={borderWidth}
        borderRadius="ml"
        borderColor={outlineColor}>
        {!children && label && (
          <Box flexDirection="row" alignItems="center" justifyContent="center">
            <Text variant="button" color={labelColor || 'white'}>
              {label}
            </Text>
            {loading && <ActivityIndicator color={theme.colors.white} size="small" style={styles.loading} />}
          </Box>
        )}
        {children && children}
      </Box>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
  },
  loading: {
    position: 'absolute',
    right: -38,
  },
});
