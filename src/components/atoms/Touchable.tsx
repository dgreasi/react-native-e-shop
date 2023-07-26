import React from 'react';
import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  inModal?: boolean;
  haptic?: boolean;
}

const Touchable = ({ inModal, haptic, onPress, ...props }: Props) => {
  const onPressWrapped = (evt: GestureResponderEvent) => {
    if (onPress === undefined) return;
    // TODO: add react-native-haptic-feedback
    // if (haptic) {}

    onPress(evt);
  };

  // TODO: add bottom-sheet implementation
  // if (inModal) {
  // }

  return (
    <TouchableOpacity {...props} onPress={onPressWrapped} activeOpacity={props.activeOpacity || 0.4}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Touchable;
