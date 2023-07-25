import React from 'react';
import { Provider } from '~store/store';
import { ThemeProvider } from '~theme/theme';
import { OverlayLoader } from '~components';
import APIProvider from '~api/APIProvider';
import RootNavigator from '~navigation/RootNavigator';

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
