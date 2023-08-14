export enum MAIN_ROUTES {
  TABS = 'Tabs',
  ENTITY = 'Entity',
  CHECKOUT = 'Checkout',
  SCHEDULE = 'Schedule',
}

export type MainRoutes = {
  Tabs: undefined;
  Entity: { id: string };
  Checkout: undefined;
  Schedule: undefined;
};
