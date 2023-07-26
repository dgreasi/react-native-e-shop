import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '~components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import theme from '~theme/theme';
import { StyleSheet, TouchableOpacity } from 'react-native';
import debounce from 'lodash.debounce';
import { IEntity } from '~interfaces/entity.interface';
import { addFavouriteAsync, deleteFavouriteAsync, selectFavourites } from '~store/favourites/favouritesSlice';

interface Props {
  entity: IEntity;
  size?: number;
  styles?: any;
}

const FavouriteButton = ({ entity, styles, size }: Props) => {
  const liked = useSharedValue(0);
  const favouriteProducts = useSelector(selectFavourites);
  const dispatch = useDispatch();

  const toggleSpecificEntity = (localFavourites: any) => {
    if (localFavourites[entity.id]) {
      dispatch(deleteFavouriteAsync(entity.id));
    } else {
      dispatch(addFavouriteAsync(entity));
    }
  };

  const toggleDispatch = () => {
    toggleSpecificEntity(favouriteProducts);
  };

  const debounceHandler = debounce(toggleDispatch, 300);

  const toggleFavourite = () => {
    liked.value = withSpring(liked.value ? 0 : 1);

    debounceHandler();
  };

  useEffect(() => {
    liked.value = withSpring(favouriteProducts[entity.id] ? 1 : 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favouriteProducts]);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
      width: '100%',
      height: '100%',
    };
  });

  return (
    <TouchableOpacity
      delayPressIn={0}
      activeOpacity={1}
      onPress={toggleFavourite}
      style={[localStyles.container, styles]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle, localStyles.imgContainer]}>
        <Icon name={'ic_24_heart'} size={size || 20} color={theme.colors.primary500} />
      </Animated.View>

      <Animated.View style={[fillStyle, localStyles.imgContainer]}>
        <Icon name="ic_24_heart-filled" size={size || 20} color={theme.colors.secondary300} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const ROUND_BUTTON_SIZE = 42;
const localStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ROUND_BUTTON_SIZE,
    width: ROUND_BUTTON_SIZE,
    borderRadius: ROUND_BUTTON_SIZE / 2,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(FavouriteButton);
