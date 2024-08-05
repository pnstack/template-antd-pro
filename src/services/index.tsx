import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface ApiProviderProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      placeholderData: (previousData: any, previousQuery: any) => previousData, // keep previous data while loading
    },
  },
});
const ApiProvider = ({ children }: ApiProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
export default ApiProvider;
