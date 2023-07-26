export enum MAIN_ROUTES {
  TABS = 'Tabs',
  ENTITY = 'Entity',
  CHECKOUT = 'Checkout',
}

export type MainRoutes = {
  Tabs: undefined;
  Entity: { id: string };
  Checkout: undefined;
};
