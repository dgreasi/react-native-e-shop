export enum MAIN_ROUTES {
  TABS = 'Tabs',
  ENTITY = 'Entity',
  CHECKOUT = 'Checkout',
  TIME_SLOT_PICKER_MODAL = 'TimeSlotPickerModal',
  TIME_SLOT_PICKER_EXAMPLE = 'TimeSlotPickerExample',
  TIME_SLOT_PICKER_COMPONENT_ONLY = 'TimeSlotPickerComponentOnly',
}

export type MainRoutes = {
  Tabs: undefined;
  Entity: { id: string };
  Checkout: undefined;
  TimeSlotPickerModal: undefined;
  TimeSlotPickerExample: undefined;
  TimeSlotPickerComponentOnly: undefined;
};
