import React from 'react';
import { ThemeProvider } from '~theme/theme';
import APIProvider from '~api/APIProvider';
import RootNavigator from '~navigation/RootNavigator';
import { Provider } from '~store/store';
import { OverlayLoader } from '~components';

const App = () => {
  return (
    <APIProvider>
      <ThemeProvider>
        <Provider>
          <RootNavigator />
          <OverlayLoader />
        </Provider>
      </ThemeProvider>
    </APIProvider>
  );
};

export default App;
