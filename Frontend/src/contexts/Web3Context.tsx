import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletInfo, ProviderType, CardanoWallet, CardanoApi } from '@/types';
import { toast } from '@/hooks/use-toast';

interface Web3ContextType {
  wallet: CardanoWallet | null;
  walletInfo: WalletInfo | null;
  provider: ProviderType;
  connecting: boolean;
  connectWallet: (providerType: ProviderType) => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
}

const defaultWalletInfo: WalletInfo = {
  address: '',
  balance: '0',
  connected: false,
  network: ''
};

const Web3Context = createContext<Web3ContextType>({
  wallet: null,
  walletInfo: defaultWalletInfo,
  provider: null,
  connecting: false,
  connectWallet: async () => { },
  disconnectWallet: () => { },
  isConnected: false
});

export const useWeb3 = () => useContext(Web3Context);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<CardanoWallet | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [provider, setProvider] = useState<ProviderType>(null);
  const [connecting, setConnecting] = useState(false);

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const savedProvider = localStorage.getItem('walletProvider') as ProviderType;
      if (savedProvider) {
        try {
          await connectWallet(savedProvider);
        } catch (error) {
          console.error('Failed to reconnect wallet:', error);
        }
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async (providerType: ProviderType) => {
    if (!providerType) return;

    setConnecting(true);

    try {
      let walletApi: CardanoApi;

      switch (providerType) {
        case 'nami':
          if (!(window as any).cardano?.nami) {
            throw new Error('Nami wallet not installed');
          }
          walletApi = (window as any).cardano.nami;
          break;

        case 'eternl':
          if (!(window as any).cardano?.eternl) {
            throw new Error('Eternl wallet not installed');
          }
          walletApi = (window as any).cardano.eternl;
          break;

        default:
          throw new Error('Unsupported wallet provider');
      }

      const wallet = await walletApi.enable();

      // Get wallet address
      const addresses = await wallet.getUsedAddresses();
      const address = addresses[0];

      // Get balance in Lovelace (1 ADA = 1,000,000 Lovelace)
      const balance = await wallet.getBalance();
      const balanceInAda = parseFloat(balance) / 1000000;

      // Get network info
      const networkId = await wallet.getNetworkId();
      const network = networkId === 1 ? 'Mainnet' : 'Testnet';

      setWallet(wallet);
      setWalletInfo({
        address,
        balance: balanceInAda.toString(),
        connected: true,
        network
      });
      setProvider(providerType);

      // Save provider type for reconnection
      localStorage.setItem('walletProvider', providerType);

      toast({
        title: 'Wallet Connected',
        description: `Connected to ${providerType} wallet`,
      });
    } catch (error) {
      console.error('Connection error:', error);

      // For demo purposes, create mock connection if wallet is not available
      if (process.env.NODE_ENV === 'development') {
        const mockAddress = 'addr1' + Array(58).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        setWalletInfo({
          address: mockAddress,
          balance: '100.00',
          connected: true,
          network: 'Testnet'
        });
        setProvider(providerType);

        toast({
          title: 'Wallet Connected',
          description: `Connected to ${providerType} wallet (Demo Mode)`,
        });
      } else {
        toast({
          title: 'Connection Error',
          description: error instanceof Error ? error.message : 'Failed to connect wallet',
          variant: 'destructive'
        });
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setWalletInfo(null);
    setProvider(null);
    localStorage.removeItem('walletProvider');

    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.'
    });
  };

  return (
    <Web3Context.Provider
      value={{
        wallet,
        walletInfo,
        provider,
        connecting,
        connectWallet,
        disconnectWallet,
        isConnected: !!walletInfo?.connected
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};