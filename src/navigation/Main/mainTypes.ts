export enum MAIN_ROUTES {
  HOME = 'Home',
  ENTITY = 'Entity',
  SEARCH = 'Search',
  TABS = 'Tabs',
  CART = 'Cart',
}

export type MainRoutes = {
  Home: undefined;
  Entity: { id: string };
  Search: undefined;
  Product: { productID: string, product?: any };
};
