export enum MAIN_ROUTES {
  TABS = 'Tabs',
  ENTITY = 'Entity',
}

export type MainRoutes = {
  Tabs: undefined;
  Entity: { id: string };
};
