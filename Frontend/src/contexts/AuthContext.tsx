import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { useWeb3 } from './Web3Context';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isVerifier: boolean;
  loading: boolean;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isVerifier: false,
  loading: true,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { walletInfo, disconnectWallet } = useWeb3();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!walletInfo?.address) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // In a real app, we would fetch user data from an API
        // For this demo, we'll mock user data based on the wallet address
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser: User = {
          id: '1',
          walletAddress: walletInfo.address,
          name: walletInfo.address.substring(0, 8),
          email: `user_${walletInfo.address.substring(2, 8)}@example.com`,
          role: walletInfo.address.endsWith('0') ? 'admin' : 
                walletInfo.address.endsWith('1') ? 'verifier' : 'user',
          createdAt: new Date().toISOString()
        };
        
        setUser(mockUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [walletInfo?.address]);

  const logout = () => {
    setUser(null);
    disconnectWallet();
  };

  const isAdmin = true;//user?.role === 'admin';
  const isVerifier = true;//user?.role === 'verifier';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isVerifier,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};