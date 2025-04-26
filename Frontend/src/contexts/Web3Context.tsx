import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Web3 from 'web3';
import { WalletInfo, ProviderType } from '@/types';
import { toast } from '@/hooks/use-toast';

interface Web3ContextType {
  web3: Web3 | null;
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
  web3: null,
  walletInfo: defaultWalletInfo,
  provider: null,
  connecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnected: false
});

export const useWeb3 = () => useContext(Web3Context);

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [provider, setProvider] = useState<ProviderType>(null);
  const [connecting, setConnecting] = useState(false);

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      // For demo purposes, we'll check if window.ethereum is available
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const accounts = await web3Instance.eth.getAccounts();
          
          if (accounts.length > 0) {
            const address = accounts[0];
            const balance = await web3Instance.eth.getBalance(address);
            const balanceInEth = web3Instance.utils.fromWei(balance, 'ether');
            
            // Mock provider detection
            const detectedProvider = localStorage.getItem('walletProvider') as ProviderType || 'nami';
            
            setWeb3(web3Instance);
            setWalletInfo({
              address,
              balance: balanceInEth,
              connected: true,
              network: 'Testnet' // Mock network
            });
            setProvider(detectedProvider);
          }
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
      // Mock different wallet providers
      // In a real app, this would use the specific wallet's API
      
      // For demo, we'll use Web3 with window.ethereum if available
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          
          if (accounts.length === 0) {
            throw new Error('No accounts found');
          }
          
          const address = accounts[0];
          const balance = await web3Instance.eth.getBalance(address);
          const balanceInEth = web3Instance.utils.fromWei(balance, 'ether');
          
          // Save provider type for reconnection
          localStorage.setItem('walletProvider', providerType);
          
          setWeb3(web3Instance);
          setWalletInfo({
            address,
            balance: balanceInEth,
            connected: true,
            network: 'Testnet' // Mock network
          });
          setProvider(providerType);
          
          toast({
            title: 'Wallet Connected',
            description: `Connected to ${providerType} wallet`,
          });
        } catch (error) {
          console.error('User rejected connection:', error);
          toast({
            title: 'Connection Failed',
            description: 'Failed to connect wallet. Please try again.',
            variant: 'destructive'
          });
        }
      } else {
        // If no ethereum provider is available (like in our environment)
        // Mock a successful connection for demo purposes
        setTimeout(() => {
          const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          setWalletInfo({
            address: mockAddress,
            balance: '100.00',
            connected: true,
            network: 'Testnet' // Mock network
          });
          setProvider(providerType);
          
          // Mock web3 instance
          const mockWeb3 = new Web3('https://rpc-testnet.example.com');
          setWeb3(mockWeb3);
          
          toast({
            title: 'Wallet Connected',
            description: `Connected to ${providerType} wallet (Demo Mode)`,
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: 'Connection Error',
        description: 'An error occurred while connecting to the wallet.',
        variant: 'destructive'
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
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
        web3,
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