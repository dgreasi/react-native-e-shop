import * as React from 'react';
import { QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';

const config: QueryClientConfig = { defaultOptions: { queries: { cacheTime: 2000, retry: 0 } } };

export const queryClient = new QueryClient(config);

export default function APIProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
