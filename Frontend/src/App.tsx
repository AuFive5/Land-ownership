import { Web3Provider } from '@/contexts/Web3Context';
import { AuthProvider } from '@/contexts/AuthContext';
import { LandRegistryProvider } from '@/contexts/LandRegistryContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ThemeProvider';
import Routes from '@/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="landchain-theme">
        <Web3Provider>
          <AuthProvider>
            <LandRegistryProvider>
              <Routes />
            </LandRegistryProvider>
          </AuthProvider>
        </Web3Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;