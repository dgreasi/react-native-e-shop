export interface ICoreState {
  alertIsOpen: boolean;
  loading: boolean;
}

export interface ICoreSlice {
  core: ICoreState;
}
