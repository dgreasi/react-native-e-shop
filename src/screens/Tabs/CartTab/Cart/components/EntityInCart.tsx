import React, { memo, useEffect, useState } from 'react';
import { CARD_WIDTH_FULL, IMAGE_IN_LIST } from '~config/constants';
import theme from '~theme/theme';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, FavouriteButton, ImageWithFallback, Text } from '~components';
import { MAIN_ROUTES } from '~navigation/Main/mainTypes';
import { IEntity } from '~interfaces/entity.interface';
import { useDispatch } from 'react-redux';
import { QuantityPicker } from '~screens/Tabs/CartTab/Cart/components/QuantityPicker';
import { changeQuantityOfProductAsync } from '~store/cart/cartSlice';

interface Props {
  entity: IEntity;
  index: number;
  quantity: number;
}

const EntityInCart = ({ entity, index, quantity }: Props) => {
  const dispatch = useDispatch();
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
});

export default memo(EntityInCart);
