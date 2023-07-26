import React, { memo, useEffect, useState } from 'react';
import { CARD_WIDTH_FULL, IMAGE_IN_LIST } from '~config/constants';
import theme from '~theme/theme';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Animated as RNAnimated, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, FavouriteButton, Icon, ImageWithFallback, Text } from '~components';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { IEntity } from '~interfaces/entity.interface';
import { useDispatch } from 'react-redux';
import { QuantityPicker } from '~screens/Tabs/CartTab/Cart/components/QuantityPicker';
import { changeQuantityOfProductAsync, removeProductFromCartAsync } from '~store/cart/cartSlice';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import AnimatedInterpolation = RNAnimated.AnimatedInterpolation;

interface Props {
  entity: IEntity;
  index: number;
  quantity: number;
}

const EntityInCart = ({ entity, index, quantity }: Props) => {
  let swipeableRow: Swipeable;
  const dispatch = useDispatch();
  const updateRef = (ref: Swipeable) => (swipeableRow = ref);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [price, setPrice] = useState<number>(entity.price);

  useEffect(() => {
    setPrice(entity.price * quantity);
  }, [entity.price, quantity]);

  const onPressCard = () => {
    navigation.navigate(MAIN_ROUTES.ENTITY, { id: entity.id });
  };

  const minus = () => {
    dispatch(changeQuantityOfProductAsync(entity, 'sub'));
  };

  const add = () => {
    dispatch(changeQuantityOfProductAsync(entity, 'add'));
  };

  const rightSwipeAction = (
    progress: AnimatedInterpolation<number>,
    x: number,
    backgroundColor: any,
    icon: string,
    onPress: () => void,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    return (
      <RNAnimated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor }]} onPress={onPress}>
          <Box alignItems="center" justifyContent="center">
            <Icon name={icon} size={20} color="white" />
          </Box>
        </RectButton>
      </RNAnimated.View>
    );
  };

  const deleteProduct = () => {
    swipeableRow?.close();
    dispatch(removeProductFromCartAsync(entity.id));
  };

  const rightSwipeActions = (progress: AnimatedInterpolation<number>) => {
    return (
      <Box width={120} flexDirection="row" paddingLeft="m">
        {rightSwipeAction(progress, 120, theme.colors.error400, 'ic_24_delete', deleteProduct)}
      </Box>
    );
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={1}
      renderRightActions={rightSwipeActions}
      overshootRight={false}
      childrenContainerStyle={styles.swipeable}>
      <TouchableOpacity onPress={onPressCard} activeOpacity={0.5} style={styles.touchable}>
        <Animated.View entering={FadeIn.delay(100 * index)} layout={Layout}>
          <Box style={styles.container}>
            <ImageWithFallback source={{ uri: entity?.image }} styles={styles.imageContainers} />
            <Box paddingLeft="m" style={styles.detailsContainer} height={IMAGE_IN_LIST}>
              <Box width="80%">
                <Text variant="oswald" numberOfLines={2}>
                  {entity?.title}
                </Text>
              </Box>
              <Box style={styles.quantityContainer}>
                <QuantityPicker product={{ entity, quantity }} minus={minus} add={add} />
                <Text variant="body2" color="primary800" fontWeight="700">
                  {price.toFixed(2)} €
                </Text>
              </Box>
            </Box>
          </Box>

          <Box style={styles.favButtonContainer}>
            <FavouriteButton entity={entity} size={20} />
          </Box>
        </Animated.View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: CARD_WIDTH_FULL,
    borderRadius: theme.borderRadii.ml,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.sm,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageContainers: {
    width: IMAGE_IN_LIST,
    height: IMAGE_IN_LIST,
    borderRadius: theme.borderRadii.ml,
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: CARD_WIDTH_FULL - IMAGE_IN_LIST - 2 * theme.spacing.sm - theme.spacing.m,
  },
  authorName: {
    padding: theme.spacing.m,
  },
  favButtonContainer: {
    position: 'absolute',
    top: -16,
    right: -16,
  },
  swipeable: {
    justifyContent: 'center',
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadii.m
  },
});

export default memo(EntityInCart);
