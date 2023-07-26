import { Platform, StyleSheet, TextInput as RNTextInput, TextInputProps, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Box, Icon } from '~components';
import theme from '~theme/theme';

interface Props extends TextInputProps {
  clearText?: () => void;
}

const SearchInput = ({ ...props }: Props) => {
  const inputRef = useRef<RNTextInput>(null);

  return (
    <Box
      paddingLeft="m"
      paddingRight="s"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      backgroundColor="primary100"
      borderRadius="ml"
      height={40}>
      <Box height="100%" alignItems="center" justifyContent="center" width="10%">
        <Icon name="ic_16_magnifying-glass" color={theme.colors.primary500} size={16} />
      </Box>
      <RNTextInput
        ref={inputRef}
        placeholder="Search"
        style={[styles.searchInput, { width: props?.value && props?.value.length > 0 ? '80%' : '90%' }]}
        placeholderTextColor={theme.colors.primary500}
        {...props}
      />
      {!!props?.value && props?.value?.length && props?.clearText && (
        <Box width="10%" alignItems="center" justifyContent="flex-start" height="100%">
          <TouchableOpacity onPress={props.clearText} style={styles.delete}>
            <Icon name="ic_16_clear" color={theme.colors.primary600} size={16} />
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 17,
    color: theme.colors.primary700,
    height: '100%',
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
      android: {
        fontFamily: 'Roboto-Regular',
      },
    }),
  },
  delete: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default SearchInput;
