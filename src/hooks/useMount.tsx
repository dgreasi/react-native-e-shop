import { useEffect, useState } from 'react';

/**
 * Custom hook to check when the screen is ready after navigation transition.
 * @param navigation
 */
export const useMount = (navigation: any) => {
  const [ready, setIsReady] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', (e: any) => {
      if (!e.closing) {
        setIsReady(true);
      }
    });

    return unsubscribe;
  });
  return ready;
};
