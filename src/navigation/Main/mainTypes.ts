export enum MAIN_ROUTES {
  TABS = 'Tabs',
  ENTITY = 'Entity',
  CHECKOUT = 'Checkout',
  TIME_SLOT_PICKER_MODAL = 'TimeSlotPickerModal',
  TIME_SLOT_PICKER = 'TimeSlotPicker',
}

export type MainRoutes = {
  Tabs: undefined;
  Entity: { id: string };
  Checkout: undefined;
  TimeSlotPickerModal: undefined;
  TimeSlotPicker: undefined;
};
