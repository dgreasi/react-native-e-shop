import React from 'react';
import { Text } from '~/components';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  testID?: string;
}
const RightHeaderButton = ({ onPress, title, testID }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn} testID={testID}>
      <Text variant="link" numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    height: 40,
  },
});
export default RightHeaderButton;
