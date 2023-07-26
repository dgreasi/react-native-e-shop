import { ICoreSlice, ICoreState } from '~store/core/coreSlice.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetBooleanPayload } from '~interfaces/store.interface';

const initialState: ICoreState = {
  loading: false,
  alertIsOpen: false,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setCoreLoading: (state: ICoreState, action: PayloadAction<SetBooleanPayload>): void => {
      state.loading = action.payload.value;
    },
    setAlertIsOpen: (state: ICoreState, action: PayloadAction<SetBooleanPayload>): void => {
      state.alertIsOpen = action.payload.value;
    },
    resetCore: (): ICoreState => initialState,
  },
});

//////////////////////////////// ACTIONS ////////////////////////////////
export const { setAlertIsOpen, setCoreLoading, resetCore } = coreSlice.actions;

//////////////////////////////// SELECTORS ////////////////////////////////
export const selectCoreLoading = (state: ICoreSlice): boolean => state.core.loading;
export const selectAlertIsOpen = (state: ICoreSlice): boolean => state.core.alertIsOpen;

export default coreSlice.reducer;
