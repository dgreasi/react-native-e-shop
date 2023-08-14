import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import theme from '~theme/theme';

interface Props {
  children: any;
  modalizeRef: any;
  viewStyle?: any;
  handleComponent?: any;
  style?: any;
  detached?: boolean;
  bottomInset?: number;
  onBackdropPress?: () => void;
  dismissModalFromConfirm?: boolean;
  dismissModalFromConfirmReset?: () => void;
  onDismissFunction?: () => void;
  height?: number;
  disableDismiss?: boolean;
}

/**
 * @deprecated Check for redesign
 */
const DynamicBottomSheetModal = ({
  children,
  modalizeRef,
  viewStyle,
  handleComponent,
  dismissModalFromConfirm,
  dismissModalFromConfirmReset,
  onDismissFunction,
  height,
  disableDismiss,
  ...props
}: Props) => {
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...backdropProps}
        pressBehavior={disableDismiss ? 'none' : 'close'}
      />
    ),
    [disableDismiss],
  );

  /**
   * Update local state of confirmation dialog to differentiate between confirm and cancel action
   * Call dismiss function if provided and dialog is dismissed from cancel button or backdrop
   */
  const onDismiss = () => {
    if (dismissModalFromConfirm && dismissModalFromConfirmReset) {
      // Dismiss without calling cancel action
      dismissModalFromConfirmReset();
    } else {
      if (onDismissFunction) onDismissFunction();
    }
  };

  return (
    <BottomSheetModal
      ref={modalizeRef}
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      snapPoints={height ? [height] : animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
      handleComponent={handleComponent || null}
      onDismiss={onDismiss}
      {...props}>
      <BottomSheetView onLayout={handleContentLayout} style={viewStyle || styles.contentContainerStyle}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.l,
  },
});

export default DynamicBottomSheetModal;
