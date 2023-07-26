import React, { memo } from 'react';
import { CARD_WIDTH_FULL, IMAGE_IN_LIST } from '~config/constants';
import theme from '~theme/theme';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, FavouriteButton, ImageWithFallback, Text } from '~components';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { IEntity } from '~interfaces/entity.interface';
import { addToCartAsync } from '~store/cart/cartSlice';
import { useDispatch } from 'react-redux';

interface Props {
  entity: IEntity;
  index: number;
}

const EntityCard = ({ entity, index }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onPressCard = () => {
    navigation.navigate(MAIN_ROUTES.ENTITY, { id: entity.id });
  };

  const onPressAddToCart = () => {
    dispatch(addToCartAsync(entity));
  };

  return (
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
              <TouchableOpacity onPress={onPressAddToCart} activeOpacity={0.5} style={styles.addToCartContainer}>
                <Text color="buttonSecondary" variant="oswald" fontWeight="700">
                  Add to cart
                </Text>
              </TouchableOpacity>
              <Text variant="body2" color="primary800" fontWeight="700">
                {entity.price.toFixed(2)} €
              </Text>
            </Box>
          </Box>
        </Box>

        <Box style={styles.favButtonContainer}>
          <FavouriteButton entity={entity} size={20} />
        </Box>
      </Animated.View>
    </TouchableOpacity>
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
  authorName: {
    padding: theme.spacing.m,
  },
  price: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadii.l,
    backgroundColor: theme.colors.background,
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
  addToCartContainer: {
    backgroundColor: theme.colors.white,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 1,
  },
  favButtonContainer: {
    position: 'absolute',
    top: -16,
    right: -16,
  },
});

export default memo(EntityCard);
