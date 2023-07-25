import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import theme from '~theme/theme';
import { selectCoreLoading } from '~store/core/coreSlice';

interface Props {
  byPassState?: boolean;
}

export const OverlayLoader = ({ byPassState }: Props) => {
  const loading = useSelector(selectCoreLoading);

  if (byPassState || loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color={theme.colors.primary900} />
      </View>
    );
  }

  return null;
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.2)',
    elevation: 1,
    zIndex: 1000,
  },
});
