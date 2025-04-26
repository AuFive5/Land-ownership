import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Land, Transaction, Document } from '@/types';
import { useWeb3 } from './Web3Context';
import { toast } from '@/hooks/use-toast';
import { mockLands } from '@/data/mockData';

interface LandRegistryContextType {
  lands: Land[];
  userLands: Land[];
  transactions: Transaction[];
  isLoading: boolean;
  registerLand: (data: Omit<Land, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<boolean>;
  transferLand: (landId: string, toAddress: string, amount: number) => Promise<boolean>;
  uploadDocument: (landId: string, document: Omit<Document, 'id' | 'uploadedAt'>) => Promise<boolean>;
  fetchLandDetails: (landId: string) => Promise<Land | null>;
}

const LandRegistryContext = createContext<LandRegistryContextType>({
  lands: [],
  userLands: [],
  transactions: [],
  isLoading: false,
  registerLand: async () => false,
  transferLand: async () => false,
  uploadDocument: async () => false,
  fetchLandDetails: async () => null
});

export const useLandRegistry = () => useContext(LandRegistryContext);

interface LandRegistryProviderProps {
  children: ReactNode;
}

export const LandRegistryProvider: React.FC<LandRegistryProviderProps> = ({ children }) => {
  const [lands, setLands] = useState<Land[]>(mockLands);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { walletInfo } = useWeb3();

  // Filter lands owned by the current user
  const userLands = lands.filter(land => 
    walletInfo?.address && land.owner.toLowerCase() === walletInfo.address.toLowerCase()
  );

  const registerLand = async (data: Omit<Land, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<boolean> => {
    if (!walletInfo?.address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to register land.',
        variant: 'destructive'
      });
      return false;
    }

    setIsLoading(true);

    try {
      // In a real application, this would involve a blockchain transaction
      // For this demo, we'll simulate the process
      
      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newLand: Land = {
        ...data,
        id: `land_${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setLands(prev => [...prev, newLand]);
      
      toast({
        title: 'Land Registration Submitted',
        description: 'Your land registration request has been submitted for verification.',
      });
      
      return true;
    } catch (error) {
      console.error('Error registering land:', error);
      toast({
        title: 'Registration Failed',
        description: 'Failed to register land. Please try again.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const transferLand = async (landId: string, toAddress: string, amount: number): Promise<boolean> => {
    if (!walletInfo?.address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to transfer land.',
        variant: 'destructive'
      });
      return false;
    }

    const land = lands.find(l => l.id === landId);
    if (!land) {
      toast({
        title: 'Land Not Found',
        description: 'The specified land property could not be found.',
        variant: 'destructive'
      });
      return false;
    }

    if (land.owner.toLowerCase() !== walletInfo.address.toLowerCase()) {
      toast({
        title: 'Not Authorized',
        description: 'You are not the owner of this land.',
        variant: 'destructive'
      });
      return false;
    }

    setIsLoading(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Create transaction record
      const newTransaction: Transaction = {
        id: `tx_${Date.now()}`,
        landId,
        fromAddress: walletInfo.address,
        toAddress,
        amount,
        status: 'completed',
        txHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        timestamp: new Date().toISOString()
      };
      
      // Update land ownership
      setLands(prev => prev.map(l => 
        l.id === landId ? { ...l, owner: toAddress, updatedAt: new Date().toISOString() } : l
      ));
      
      setTransactions(prev => [...prev, newTransaction]);
      
      toast({
        title: 'Transfer Successful',
        description: 'Land has been successfully transferred to the new owner.',
      });
      
      return true;
    } catch (error) {
      console.error('Error transferring land:', error);
      
      // Record failed transaction
      const failedTransaction: Transaction = {
        id: `tx_${Date.now()}`,
        landId,
        fromAddress: walletInfo.address,
        toAddress,
        amount,
        status: 'failed',
        timestamp: new Date().toISOString()
      };
      
      setTransactions(prev => [...prev, failedTransaction]);
      
      toast({
        title: 'Transfer Failed',
        description: 'Failed to transfer land ownership. Please try again.',
        variant: 'destructive'
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (
    landId: string, 
    document: Omit<Document, 'id' | 'uploadedAt'>
  ): Promise<boolean> => {
    const land = lands.find(l => l.id === landId);
    if (!land) {
      toast({
        title: 'Land Not Found',
        description: 'The specified land property could not be found.',
        variant: 'destructive'
      });
      return false;
    }

    setIsLoading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newDocument: Document = {
        ...document,
        id: `doc_${Date.now()}`,
        uploadedAt: new Date().toISOString()
      };
      
      // Update land with new document
      setLands(prev => prev.map(l => 
        l.id === landId 
          ? { 
              ...l, 
              documents: [...l.documents, newDocument],
              updatedAt: new Date().toISOString() 
            } 
          : l
      ));
      
      toast({
        title: 'Document Uploaded',
        description: 'Your document has been successfully uploaded.',
      });
      
      return true;
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload document. Please try again.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLandDetails = async (landId: string): Promise<Land | null> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const land = lands.find(l => l.id === landId) || null;
      return land;
    } catch (error) {
      console.error('Error fetching land details:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LandRegistryContext.Provider
      value={{
        lands,
        userLands,
        transactions,
        isLoading,
        registerLand,
        transferLand,
        uploadDocument,
        fetchLandDetails
      }}
    >
      {children}
    </LandRegistryContext.Provider>
  );
};